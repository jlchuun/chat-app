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
    onDisconnect 
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
    origin: "http://localhost:3000"
}

const io = new Server(server, {
    cors: corsOptions
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(sessionParser);
app.use("/auth", authRouter);

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionParser));
io.use(authorizeUser);

io.on("connect", socket => {
    initializeUser(socket);

    socket.on("addFriend", (friendName, cb) => {
        addFriend(socket, friendName, cb);
    });

    socket.on("disconnecting", () => {
        onDisconnect(socket);
    });
});

server.listen(4000, () => {
    console.log("Server listening on port 4000");
});