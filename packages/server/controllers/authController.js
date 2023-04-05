const loginAuth = require("./express/loginAuth");
const registerAuth = require("./express/registerAuth");
const handleLogin = require("./express/handleLogin");
const handleLogout = require("./express/handleLogout");

module.exports = {
    loginAuth,
    registerAuth,
    handleLogin,
    handleLogout
};