const redisClient = require("../../redis");

const removeFriend = async (socket, friend) => {
    const friendStr = [friend.username, friend.userid].join(",");
    const userStr = [socket.user.username, socket.user.userid].join(",");

    // remove from both user/friend friends list
    await redisClient.lrem(`friends:${socket.user.username}`, 1, friendStr);
    await redisClient.lrem(`friends:${friend.username}`, 1, userStr);

    // send removed user to friend
    socket.to(friend.userid).emit("removeFriend", socket.user);
}

module.exports = removeFriend;