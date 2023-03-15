const jwt = require("jsonwebtoken");
require("dotenv").config();
const pool = require("../models/db");

const handleLogin = (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.SECRET,
            async (err, decoded) => {
            if (err) {
                console.log(err.name);
                res.json({ loggedIn: false });
                return;
            }
            const user = await pool.query(
                "SELECT username FROM users a WHERE a.username=$1",
                [decoded.username]
            );
            if (user.rowCount === 0) {
                res.json({ loggedIn: false, token: null });
                return;
            }
            res.json({ loggedIn: true, token });
        });
};

module.exports = handleLogin;