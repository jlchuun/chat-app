const redisClient = require("../../redis");

const addFriend = async (socket, friendName, cb) => {
    const friend = await redisClient.hgetall(
        `userid:${friendName}`
    );

    const friendsList = await redisClient.lrange(
        `friends:${socket.user.username}`,
        0, -1
    );

    if (!friend.userid) {
        cb({
            status: "error",
            message: "User doesn't exist"
        });
        return;
    }

    if (friend.userid === socket.user.userid) {
        cb({
            status: "error",
            message: "Can't add self"
        });
        return;
    }

    if (friendsList.indexOf(`${friendName},${friend.userid}`) !== -1) {
        cb({
            status: "error",
            message: "Friend already added"
        });
        return;
    }

    await redisClient.lpush(`friends:${socket.user.username}`, 
        [friendName, friend.userid].join(",")
    );

    // send new friend info back to user
    const newFriend = {
        username: friendName,
        userid: friend.userid,
        connected: friend.connected
    };

    cb({ status: "success", newFriend });
}

module.exports = addFriend;