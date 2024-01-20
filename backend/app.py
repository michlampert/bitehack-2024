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
    "database": "events_db",
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


@app.route("/create-event", methods=["POST"])
def create_event():
    data = request.json
    conn = db_connection()
    cursor = conn.cursor()

    if "name" not in data:
        return jsonify({"error": "Missing name field"}), 400
    if "description" not in data:
        return jsonify({"error": "Missing description field"}), 400
    if "total_time" not in data:
        return jsonify({"error": "Missing total_time field"}), 400
    if "start" not in data:
        return jsonify({"error": "Missing start field"}), 400
    if "free_time" not in data:
        return jsonify({"error": "Missing free_time field"}), 400
    if "blacklist" not in data:
        return jsonify({"error": "Missing blacklist field"}), 400

    start = datetime.datetime.fromisoformat(data["start"])
    start = start.replace(tzinfo=datetime.timezone(datetime.timedelta(hours=0)))
    end = start + datetime.timedelta(seconds=data["total_time"])

    cursor.execute(
        "INSERT INTO event (name, description, start, end, free_time) VALUES (%s, %s, %s, %s, %s)",
        (data["name"], data["description"], start, end, data["free_time"]),
    )
    conn.commit()
    event_id = cursor.lastrowid

    for page in data["blacklist"]:
        cursor.execute(
            "INSERT INTO blacklist (event_id, website) VALUES (%s, %s)",
            (event_id, page),
        )


    return jsonify({"message": "Event created successfully", "id": event_id}), 201


@app.post("/create-user")
def create_user():
    data = request.json
    conn = db_connection()
    cursor = conn.cursor()

    if "name" not in data:
        return jsonify({"error": "Missing name field"}), 400

    cursor.execute("INSERT INTO users (username) VALUES (%s)", (data["name"],))
    conn.commit()

    return jsonify({"message": "User created successfully"}), 201


@app.route("/add-participant", methods=["POST"])
def add_participant():
    data = request.json
    conn = db_connection()
    cursor = conn.cursor()

    if "event_id" not in data:
        return jsonify({"error": "Missing event_id field"}), 400
    if "user_id" not in data:
        return jsonify({"error": "Missing user_id field"}), 400

    cursor.execute(
        "INSERT INTO status (user_id, event_id) VALUES (%s, %s)",
        (data["user_id"], data["event_id"]),
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
        "SELECT status.id, last_started FROM status "
        "INNER JOIN event ON status.event_id = event.id "
        "INNER JOIN blacklist ON blacklist.event_id = event.id "
        "WHERE start < NOW() and end > NOW() and user_id = %s AND website = %s",
        (
            data["user_id"],
            data["website"],
        ),
    )
    statuses = cursor.fetchall()

    for status in statuses:
        status_id, last_started = status
        if last_started is None:
            cursor.execute(
                "UPDATE status SET last_started = NOW(), reason = CONCAT(reason, ' ', %s) WHERE id = %s",
                (data["url"] if "url" in data else data["website"], status_id,),
            )
        elif "url" not in data:
            difference = datetime.datetime.now() - datetime.datetime.fromisoformat(
                last_started)

            cursor.execute(
                "UPDATE status SET last_started = NULL, total_time = total_time + %s WHERE id = %s",
                (
                    data["website"],
                    difference.total_seconds(),
                    status_id,
                ),
            )
        else:
            cursor.execute(
                "UPDATE status SET reason = CONCAT(reason, ' ', %s) WHERE id = %s",
                (
                    data["url"],
                    status_id
                ),
            )
    conn.commit()
    return jsonify({"message": "Status updated successfully"}), 201


@app.get("/is-forbidden")
def is_forbidden():
    user_id = request.args.get("user_id")
    website = request.args.get("website")
    conn = db_connection()
    cursor = conn.cursor()

    if not user_id:
        return jsonify({"error": "Missing user_id parameter"}), 400
    if not website:
        return jsonify({"error": "Missing website parameter"}), 400

    cursor.execute(
        "SELECT name FROM events "
        "INNER JOIN blacklist ON blacklist.event_id = events.id "
        "WHERE start < NOW() and end > NOW() and website = %s AND user_id = %s",
        (
            website,
            user_id,
        ),
    )
    constraint_ids = cursor.fetchall()

    return jsonify({"is_forbidden": len(constraint_ids) > 0}), 200


@app.get("/get-event-status")
def get_event_status():
    data = request.json
    conn = db_connection()
    cursor = conn.cursor()

    if "event_id" not in data:
        return jsonify({"error": "Missing event_id field"}), 400

    cursor.execute(
        "SELECT username, total_time, last_started FROM status "
        "INNER JOIN users ON status.user_id = users.id "
        "WHERE event_id = %s",
        (data["event_id"],),
    )
    event_status = cursor.fetchall()

    cursor.execute(
        "SELECT name, description, start, end, free_time FROM event WHERE id = %s",
        (data["event_id"],),
    )
    event_info = cursor.fetchone()

    cursor.execute(
        "SELECT website FROM blacklist WHERE event_id = %s", (data["event_id"],)
    )
    blacklist = cursor.fetchall()

    result = {
        "name": event_info[0],
        "description": event_info[1],
        "start": event_info[2],
        "end": event_info[3],
        "free_time": event_info[4],
        "users": [],
        "blacklist": blacklist,
    }

    for status in event_status:
        username, total_time, last_started = status

        if last_started is not None:
            additional_time = (datetime.datetime.now() - datetime.datetime.fromisoformat(
                last_started
            )).total_seconds()
        else:
            additional_time = 0

        result["users"].append(
            {
                "username": username,
                "progress": total_time + additional_time,
                "status": "ok" if event_info[4] < total_time + additional_time else "fail",
            }
        )

    return jsonify(result), 200


@app.get("/get-user-events")
def get_user_events():
    if "user_id" not in request.args:
        return jsonify({"error": "Missing user_id parameter"}), 400

    conn = db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT event_id FROM status WHERE user_id = %s", (request.args["user_id"],)
    )
    event_ids = cursor.fetchall()

    return jsonify(event_ids), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
