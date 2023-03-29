const redisClient = require("../redis");

const authorizeUser = (socket, next) => {
    if (!socket.request.session || !socket.request.session.user) {
        next(new Error("Not authorized user"));
    } else {
        next();
    }
}

const initializeUser = async (socket) => {
    const user = { ...socket.request.session.user };
    redisClient.hset(
        `userid:${user.username}`,
        "userid",
        user.userid
    );

    const friendsList = await redisClient.lrange(`friends:${user.username}`, 0, -1);
    console.log(friendsList);
    socket.emit("friends", friendsList);
};

const addFriend = async (socket, friendName, cb) => {
    const friendid = await redisClient.hget(
        `userid:${friendName}`,
        "userid",
    );

    const user = { ...socket.request.session.user };

    // invalid friend username
    if (!friendid) {
        cb({
            status: "error",
            message: "Not valid username"
        });
        return;
    }
    // prevent adding self
    if (friendid === user.userid) {
        cb({
            status: "error",
            message: "Can't add self"
        });
        return;
    }

    const friendList = await redisClient.lrange(
        `friends:${user.username}`,
        0, -1
    );

    if (friendList.indexOf(friendName) !== -1) {
        cb({
            status: "error",
            message: "Friend already added"
        });
        return;
    }
    await redisClient.lpush(`friends:${user.username}`, friendName);
    cb({ status: "success" });
}

module.exports = {
    authorizeUser,
    initializeUser,
    addFriend
};