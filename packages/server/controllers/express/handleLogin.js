const handleLogin = (req, res) => {
    if (req.session.user && req.session.user.username) {
        res.json({ loggedIn: true, username: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
};

module.exports = handleLogin;