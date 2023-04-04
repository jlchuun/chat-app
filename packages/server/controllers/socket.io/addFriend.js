const redisClient = require("../../redis");
const getFriendListParse = require("./getFriendListParse");

const addFriend = async (socket, data) => {
    const user = data.user;
    const accept = data.accept;

    const requestStr = [user.username, user.userid].join(",");
    // update friend requests
    await redisClient.lrem(`friendRequests:${socket.user.username}`, 1, requestStr);
    if (accept) {
        // update senders friends list
        await redisClient.lpush(`friends:${user.username}`,
            [socket.user.username, socket.user.userid].join(",")
        );

        // update receivers friends list
        await redisClient.lpush(`friends:${socket.user.username}`, 
            [user.username, user.userid].join(",")
        );
    }

    // update senders friendlist with socket
    const friendsList = await redisClient.lrange(`friends:${user.username}`, 0, -1);
    const friendListParse = await getFriendListParse(friendsList);

    // send friends list to user
    socket.to(user.userid).emit("friends", friendListParse);
}

module.exports = addFriend;