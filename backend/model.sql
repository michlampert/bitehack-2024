CREATE DATABASE IF NOT EXISTS challenge_db;

USE challenge_db;

CREATE TABLE IF NOT EXISTS challenges(
    id int AUTO_INCREMENT PRIMARY KEY,
    title varchar(255) NOT NULL,
    description text NOT NULL,
    start timestamp NOT NULL,
    end timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
    id int AUTO_INCREMENT PRIMARY KEY,
    username varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS constraints(
    id int AUTO_INCREMENT PRIMARY KEY,
    challenge_id int,
    time_limit int,
    website varchar(255),
    FOREIGN KEY (challenge_id) REFERENCES challenges(id)
);

CREATE TABLE IF NOT EXISTS status(
    id int AUTO_INCREMENT PRIMARY KEY,
    user_id int,
    constraint_id int,
    reason text NOT NULL default (''),
    last_started timestamp,
    total_time int default (0),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (constraint_id) REFERENCES constraints(id)
);

