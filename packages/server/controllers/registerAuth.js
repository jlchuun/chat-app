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
            "INSERT INTO users(email, username, passwordHash) values ($1, $2, $3) RETURNING id, username",
            [req.body.email, req.body.username, passHash]
        );
        console.log(req.body.password);

        
        const userToken = {
            username: newUser.rows[0].username,
            id: newUser.rows[0].id
        };

        jwt.sign(
            userToken, process.env.SECRET,
            { expiresIn: "1min" },
            (err, token) => {
                if (err) {
                    res.json({
                        loggedIn: false,
                        status: "Error occurred, try again later",
                    });
                    return;
                }
                res.json({ loggedIn: true, token });
            }); 
    } else {
        res.json({ loggedIn: false, status: "Username taken" });
    }
}

module.exports = registerAuth;