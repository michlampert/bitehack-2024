CREATE DATABASE IF NOT EXISTS challenge_db;

USE challenge_db;

CREATE TABLE IF NOT EXISTS challenges(
    id int AUTO_INCREMENT PRIMARY KEY,
    title varchar(255) NOT NULL,
    description text NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
    id int AUTO_INCREMENT PRIMARY KEY,
    username varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS challenge_participants(
    challenge_id int,
    user_id int,
    PRIMARY KEY (challenge_id, user_id),
    FOREIGN KEY (challenge_id) REFERENCES challenges(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);