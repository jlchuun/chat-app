require("dotenv").config();
const pool = require("../models/db");
const bcrypt = require("bcrypt");
const {v4: uuidv4 } = require("uuid");

const handleLogin = (req, res) => {
    if (req.session.user && req.session.user.username) {
        res.json({ loggedIn: true, username: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
};

const loginAuth = async (req, res) => {
    const logAttempt = await pool.query(
        "SELECT id, userid, username, password_hash FROM users a WHERE a.username=$1", 
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
        id: logAttempt.rows[0].id,
        userid: logAttempt.rows[0].userid
    };

    res.json({ loggedIn: true, username: req.body.username });
}


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

module.exports = {
    loginAuth,
    registerAuth,
    handleLogin
};