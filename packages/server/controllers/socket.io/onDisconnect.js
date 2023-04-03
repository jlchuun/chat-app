const redisClient = require("../../redis");
const getFriendListParse = require("./getFriendListParse");

const onDisconnect = async (socket) => {
    await redisClient.hset(
        `userid:${socket.user.username}`,
        "connected",
        false
    );

    const friendsList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);
    const friendIds = await getFriendListParse(friendsList).then(
        friends => friends.map(friend => friend.userid)
    );
    socket.to(friendIds).emit("connected", false, socket.user.username);
}

module.exports = onDisconnect;