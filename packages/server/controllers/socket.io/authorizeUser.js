const authorizeUser = (socket, next) => {
    if (!socket.request.session || !socket.request.session.user) {
        next(new Error("Not authorized user"));
    } else {
        next();
    }
}

module.exports = authorizeUser;