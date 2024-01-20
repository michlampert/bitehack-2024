CREATE DATABASE IF NOT EXISTS events;

USE events;

CREATE TABLE IF NOT EXISTS event(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    description text NOT NULL,
    start timestamp NOT NULL,
    end timestamp NOT NULL,
    free_time int NOT NULL,
);


CREATE TABLE IF NOT EXISTS blacklist(
    id int AUTO_INCREMENT PRIMARY KEY,
    event_id int,
    website varchar(255) NOT NULL,
    FOREIGN KEY (event_id) REFERENCES event(id)
);

CREATE TABLE IF NOT EXISTS users(
    id int AUTO_INCREMENT PRIMARY KEY,
    username varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS status(
    id int AUTO_INCREMENT PRIMARY KEY,
    user_id int,
    event_id int,
    reason text NOT NULL default (''),
    last_started timestamp,
    total_time int default (0),
    count int default (0),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

