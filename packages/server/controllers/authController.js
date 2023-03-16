require("dotenv").config();
const pool = require("../models/db");
const bcrypt = require("bcrypt");

const handleLogin = (req, res) => {
    if (req.session.user && req.session.user.username) {
        res.json({ loggedIn: true, username: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
};

const loginAuth = async (req, res, next) => {
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
};

module.exports = {
    loginAuth,
    registerAuth,
    handleLogin
};