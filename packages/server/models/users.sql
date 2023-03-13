CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    passwordHash VARCHAR(20) NOT NULL
);

INSERT INTO users(username, passwordHash) values ($1, $2);