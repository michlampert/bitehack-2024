from flask import Flask, request, jsonify
import mysql.connector
import datetime
from mysql.connector import Error

from flask import Flask

app = Flask(__name__)

db_config = {
    "host": "mysql",
    "user": "user",
    "password": "password",
    "database": "challenge_db",
}


def db_connection():
    conn = None
    try:
        conn = mysql.connector.connect(**db_config)
    except Error as e:
        print(e)
        raise e
    return conn


@app.route("/")
def hello_world():
    return "Hello, World!"


def create_constraint(constraint, challenge_id, conn, cursor):
    if "time_limit" not in constraint:
        return jsonify({"error": "Missing time limit field in constraint"}), 400
    if "website" not in constraint:
        return jsonify({"error": "Missing website field in constraint"}), 400

    cursor.execute(
        "INSERT INTO constraints (time_limit, website, challenge_id) VALUES (%s, %s, %s)",
        (constraint["time_limit"], constraint["website"], challenge_id),
    )
    conn.commit()

@app.route("/create-challenge", methods=["POST"])
def create_challenge():
    data = request.json
    conn = db_connection()
    cursor = conn.cursor()

    if "title" not in data:
        return jsonify({"error": "Missing title field"}), 400
    if "description" not in data:
        return jsonify({"error": "Missing description field"}), 400
    if "constraints" not in data:
        return jsonify({"error": "Missing constraints field"}), 400
    if "total_time" not in data:
        return jsonify({"error": "Missing total_time field"}), 400
    if "start" not in data:
        return jsonify({"error": "Missing start field"}), 400

    end = datetime.datetime.fromisoformat(data["start"])
    end += datetime.timedelta(seconds=data["total_time"])

    cursor.execute(
        "INSERT INTO challenges (title, description, start, end) VALUES (%s, %s, %s, %s)",
        (data["title"], data["description"], data["start"], end),
    )
    conn.commit()

    challenge_id = cursor.lastrowid

    for constraint in data["constraints"]:
        create_constraint(constraint, challenge_id, conn, cursor)

    return jsonify({"message": "Challenge created successfully"}), 201


@app.post("/create-user")
def create_user():
    data = request.json
    conn = db_connection()
    cursor = conn.cursor()

    if "name" not in data:
        return jsonify({"error": "Missing name field"}), 400

    cursor.execute(
        "INSERT INTO users (username) VALUES (%s)", (data["name"],)
    )
    conn.commit()

    return jsonify({"message": "User created successfully"}), 201


@app.route("/add-participant", methods=["POST"])
def add_participant():
    data = request.json
    conn = db_connection()
    cursor = conn.cursor()

    if "challenge_id" not in data:
        return jsonify({"error": "Missing challenge_id field"}), 400
    if "user_id" not in data:
        return jsonify({"error": "Missing user_id field"}), 400

    cursor.execute(
        "SELECT id FROM constraints WHERE challenge_id = %s", (data["challenge_id"],)
    )
    challenge_constaints_id = cursor.fetchall()

    for constraint_id in challenge_constaints_id:
        cursor.execute(
            "INSERT INTO status (user_id, constraint_id) VALUES (%s, %s)",
            (data["user_id"], constraint_id[0],)
        )
        conn.commit()

    return jsonify({"message": "Participant added successfully"}), 201


@app.post("/update-status")
def update_status():
    data = request.json
    conn = db_connection()
    cursor = conn.cursor()

    if "user_id" not in data:
        return jsonify({"error": "Missing user_id field"}), 400
    if "website" not in data:
        return jsonify({"error": "Missing website field"}), 400

    cursor.execute(
        "SELECT id, last_started FROM status "
        "INNER JOIN constraints ON status.constraint_id = constraints.id "
        "INNER JOIN challenges ON constraints.challenge_id = challenges.id "
        "WHERE start < NOW() and end > NOW() and user_id = %s AND website = %s",
        (data["user_id"], data["website"],)
    )
    statuses = cursor.fetchall()

    for status in statuses:
        if status[1] is None:
            cursor.execute(
                "UPDATE status SET last_started = NOW(), reason = CONCAT(reason, ' ', %s) WHERE id = %s",
                (data["url"] if "url" in data else data["website"], status[0],)
            )
        elif "url" not in data:
            difference = datetime.datetime.now() - datetime.datetime.fromisoformat(status[1])

            cursor.execute(
                "UPDATE status SET last_started = NULL, total_time = total_time + %s WHERE id = %s",
                (data["website"], difference.total_seconds(), status[0],)
            )
        else:
            cursor.execute(
                "UPDATE status SET reason = CONCAT(reason, ' ', %s) WHERE id = %s",
                (data["url"], status[0],)
            )
    conn.commit()
    return jsonify({"message": "Status updated successfully"}), 201


#@app.get("/website-


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
