from flask import Flask, request, jsonify
import mysql.connector
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

    cursor.execute(
        "INSERT INTO challenges (title, description) VALUES (%s, %s)",
        (data["title"], data["description"]),
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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
