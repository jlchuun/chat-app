const redisClient = require("../../redis");

const directMessage = async (socket, message) => {
    message.from = socket.user.userid;

    const msgStr = [
        message.to,
        message.from,
        message.body
    ].join(",");

    await redisClient.lpush(`chat:${message.to}`, msgStr);
    await redisClient.lpush(`chat:${message.from}`, msgStr);
    
    console.log(message);
    socket.to(message.to).emit("directMessage", message);
}

module.exports = directMessage;