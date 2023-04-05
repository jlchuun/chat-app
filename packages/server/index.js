const express = require("express");
const authRouter = require("./routers/authRouter");
const redisClient = require("./redis");
const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const { Server } = require("socket.io");
const { 
    initializeUser, 
    addFriend, 
    authorizeUser, 
    onDisconnect,
    directMessage,
    friendRequest,
    removeFriend
}  = require("./controllers/socketController");

require("dotenv").config();

redisClient.on("error", (err) => {
    console.log("Error establishing redis connection" + err);
});

redisClient.on("connect", (err) => {
    console.log("Redis Connection established");
});

const app = express();
const server = require("http").createServer(app);

const sessionParser = session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SECRET,
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 60000,    // 1 min * 5
    },
});

const corsOptions = {
    credentials: true,
    origin: process.env.CLIENT_URL
}

const io = new Server(server, {
    cors: corsOptions
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(sessionParser);
app.use("/auth", authRouter);
app.set("trust proxy", 1);

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionParser));
io.use(authorizeUser);

io.on("connect", socket => {
    initializeUser(socket);

    socket.on("friendRequest", (friendName, cb) => {
        friendRequest(socket, friendName, cb);
    });

    socket.on("addFriend", (data) => {
        addFriend(socket, data);
    });

    socket.on("removeFriend", (friend) => {
        removeFriend(socket, friend);
    })

    socket.on("directMessage", (message) => {
        directMessage(socket, message);
    });

    socket.on("disconnecting", () => {
        onDisconnect(socket);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});