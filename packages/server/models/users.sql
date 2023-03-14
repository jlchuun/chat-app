DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(319) NOT NULL UNIQUE,
    passwordHash VARCHAR(60) NOT NULL
);