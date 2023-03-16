const pool = require("../models/db.js");
const bcrypt = require("bcrypt");

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

    req.session.user = {
        username: req.body.username,
        id: logAttempt.rows[0].id
    };
    
    res.json({ loggedIn: true, username: req.body.username });
}

module.exports = loginAuth;