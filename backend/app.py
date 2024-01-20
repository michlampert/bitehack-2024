import time
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
    return conn


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/create-challenge", methods=["POST"])
def create_challenge():
    data = request.json
    conn = db_connection()
    cursor = conn.cursor()
    if "title" in data and "description" in data:
        cursor.execute(
            "INSERT INTO challenges (title, description) VALUES (%s, %s)",
            (data["title"], data["description"]),
        )
        conn.commit()
        return jsonify({"message": "Challenge created successfully"}), 201
    else:
        return jsonify({"error": "Missing required fields"}), 400


@app.route("/add-participant", methods=["POST"])
def add_participant():
    data = request.json
    conn = db_connection()
    cursor = conn.cursor()
    if "challenge_id" in data and "user_id" in data:
        cursor.execute(
            "INSERT INTO challenge_participants (challenge_id, user_id) VALUES (%s, %s)",
            (data["challenge_id"], data["user_id"]),
        )
        conn.commit()
        return jsonify({"message": "Participant added successfully"}), 201
    else:
        return jsonify({"error": "Missing required fields"}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
