const redisClient = require("../../redis");

const friendRequest = async (socket, friendName, cb) => {
    const friend = await redisClient.hgetall(
        `userid:${friendName}`
    );

    const friendsList = await redisClient.lrange(
        `friends:${socket.user.username}`,
        0, -1
    );

    // get pending friend requests of user to be added
    const friendRequests = await redisClient.lrange(
        `friendRequests:${friendName}`,
        0, -1
    )

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

    if (friendRequests.indexOf(`${socket.user.username},${socket.user.userid}`) !== -1) {
        cb({
            status: "error",
            message: "Already have pending friend request"
        });
        return;
    }

    await redisClient.lpush(`friendRequests:${friendName}`, 
        [socket.user.username, socket.user.userid].join(",")
    );

    // get self info to send to target request
    const user = {
        username: socket.user.username,
        userid: socket.user.userid,
        connected: "true"
    };
    
    socket.to(friend.userid).emit("newFriendRequest", user);
    cb({ status: "success" });
}

module.exports = friendRequest;