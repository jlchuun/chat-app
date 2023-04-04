const authorizeUser = require("./socket.io/authorizeUser");
const initializeUser = require("./socket.io/initializeUser");
const addFriend = require("./socket.io/addFriend");
const onDisconnect = require("./socket.io/onDisconnect");
const directMessage = require("./socket.io/directMessage");
const friendRequest = require("./socket.io/friendRequest");

module.exports = {
    authorizeUser,
    initializeUser,
    addFriend,
    onDisconnect,
    directMessage,
    friendRequest
};