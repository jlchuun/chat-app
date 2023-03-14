const pool = require("../models/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerAuth = async (req, res) => {
    const existingUser = await pool.query(
        "SELECT username from users WHERE username=$1", 
        [req.body.username]
    );

    if (existingUser.rowCount === 0) {
        // register if username not taken
        const passHash = await bcrypt.hash(req.body.password, 10);
        const newUser = await pool.query(
            "INSERT INTO users(username, passwordHash) values ($1, $2) RETURNING id, username",
            [req.body.username, passHash]
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