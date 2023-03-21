-- DROP TABLE IF EXISTS users;
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(20) NOT NULL UNIQUE,
--     email VARCHAR(319) NOT NULL UNIQUE,
--     password_hash VARCHAR(60) NOT NULL
-- );

SELECT username, email FROM users WHERE email='asdfasdf@test.com' OR username='testUser';