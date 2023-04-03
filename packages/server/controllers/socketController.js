const authorizeUser = require("./socket.io/authorizeUser");
const initializeUser = require("./socket.io/initializeUser");
const addFriend = require("./socket.io/addFriend");
const onDisconnect = require("./socket.io/onDisconnect");

module.exports = {
    authorizeUser,
    initializeUser,
    addFriend,
    onDisconnect
};