const redisClient = require("../../redis");

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
};

module.exports = initializeUser;