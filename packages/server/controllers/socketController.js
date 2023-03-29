const redisClient = require("../redis");

const initializeUser = async (req) => {
    redisClient.hset(
        `userid:${req.session.user.username}`,
        "userid",
        req.session.user.userid
    );
};

const addFriend = async (friendName) => {
    console.log(friendName);
}

module.exports = {
    initializeUser,
    addFriend
};