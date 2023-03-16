const pool = require("../models/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerAuth = async (req, res) => {
    const existingUser = await pool.query(
        "SELECT email, username from users WHERE email=$1 AND username=$2", 
        [req.body.email, req.body.username]
    );

    if (existingUser.rowCount === 0) {
        // register if new username and email
        const passHash = await bcrypt.hash(req.body.password, 10);
        const newUser = await pool.query(
            "INSERT INTO users(email, username, password_hash) values ($1, $2, $3) RETURNING id, username",
            [req.body.email, req.body.username, passHash]
        );
        console.log(req.body.password);

        req.session.user = {
            username: req.body.username,
            id: newUser.rows[0].id
        };
        
        res.json({ loggedIn: true, username: req.body.username });

    } else {
        res.json({ loggedIn: false, status: "Username taken" });
    }
}

module.exports = registerAuth;