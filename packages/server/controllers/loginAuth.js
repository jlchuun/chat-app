const pool = require("../models/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginAuth = async (req, res) => {
    const logAttempt = await pool.query(
        "SELECT id, username, password_hash FROM users a WHERE a.username=$1", 
        [req.body.username]
    );

    const passCorrect = logAttempt.rowCount > 0
        ? await bcrypt.compare(req.body.password, logAttempt.rows[0].password_hash)
        : false;
    if (!passCorrect) {
        console.log("bad login");
        return res.json({
            loggedIn: false,
            status: "Incorrect username or password"
        })
    }

    const userToken = {
        username: logAttempt.rows[0].username,
        id: logAttempt.rows[0].id
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
            console.log(token);
            res.json({ loggedIn: true, token });
        }); 
}

module.exports = loginAuth;