const redisClient = require("../redis");

const authorizeUser = (socket, next) => {
    if (!socket.request.session || !socket.request.session.user) {
        next(new Error("Not authorized user"));
    } else {
        next();
    }
}

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

// returns friend list parsing username, userid, and connected status
const getFriendListParse = async (friendsList) => {
    const ids = [];

    for (let friend of friendsList) {
        const friendParse = friend.split(",");
        const connected = await redisClient.hget(
            `userid:${friendParse[0]}`,
            "connected"
        );

        ids.push({
            username: friendParse[0],
            userid: friendParse[1],
            connected: connected
        });
    }
    return ids;
}

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

module.exports = {
    authorizeUser,
    initializeUser,
    addFriend,
    onDisconnect
};