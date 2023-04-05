const redisClient = require("../../redis");

const rateLimiter = (secondsLimit, maxLimit) => {
    return async (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const [response] = await redisClient
            .multi()
            .incr(ip)
            .expire(ip, secondsLimit)
            .exec();
        if (response[1] > maxLimit) {
            res.json({ loggedIn: false, status: "Too many requests. Try again later." });
        } else {
            next();
        }
        }
};

module.exports = { rateLimiter };