const redisClient = require("../../redis");

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

module.exports = getFriendListParse;