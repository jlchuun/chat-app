require("dotenv").config();
const pool = require("../../models/db");
const bcrypt = require("bcrypt");
const {v4: uuidv4 } = require("uuid");

const registerAuth = async (req, res) => {
    const existingUser = await pool.query(
        "SELECT email, username from users WHERE email=$1 OR username=$2", 
        [req.body.email, req.body.username]
    );

    if (existingUser.rowCount === 0) {
        // register if new username and email
        const passHash = await bcrypt.hash(req.body.password, 10);
        const newUser = await pool.query(
            "INSERT INTO users(email, username, password_hash, userid) values ($1, $2, $3, $4) RETURNING id, username, userid",
            [req.body.email, req.body.username, passHash, uuidv4()]
        );

        req.session.user = {
            username: req.body.username,
            id: newUser.rows[0].id,
            userid: newUser.rows[0].userid
        };

        res.json({ loggedIn: true, username: req.body.username });

    } else if (existingUser.rows[0].email !== null) {
        res.json({ loggedIn: false, status: "Email already in use" });
    } else {
        res.json({ loggedIn: false, status: "Username is taken" });
    }
};

module.exports = registerAuth;