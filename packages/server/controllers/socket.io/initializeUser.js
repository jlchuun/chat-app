const redisClient = require("../../redis");
const getFriendListParse = require("./getFriendListParse");

const initializeUser = async (socket) => {
    socket.user = { ...socket.request.session.user };
    socket.join(socket.user.userid);
    redisClient.hset(
        `userid:${socket.user.username}`,
        "userid",
        socket.user.userid,
        "connected",
        true
    );

    const friendsList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);
    const friendListParse = await getFriendListParse(friendsList);
    const friendIds = friendListParse.map(friend => friend.userid);

    // emit to all friends of connected status
    if (friendIds.length > 0) {
        socket.to(friendIds).emit("connected", true, socket.user.username);
    }

    // send friends list to user
    socket.emit("friends", friendListParse);

    const msgQuery = await redisClient.lrange(`chat:${socket.user.userid}`, 0, -1);
    const messages = msgQuery.map(msgStr => {
        const msg = msgStr.split(",");
        return {
            to: msg[0],
            from: msg[1],
            body: msg[2]
        };
    });

    if (messages.length > 0) {
        socket.emit("messages", messages);
    }
};

module.exports = initializeUser;