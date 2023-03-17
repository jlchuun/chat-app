const express = require("express");
const { WebSocketServer } = require("ws");
const authRouter = require("./routers/authRouter");
const Redis = require("./redis");
const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
require("dotenv").config();

const redisClient = Redis;


redisClient.on("error", (err) => {
    console.log("Error establishing redis connection" + err);
});

redisClient.on("connect", (err) => {
    console.log("Redis Connection established");
});

const app = express();
const server = require("http").createServer(app);

const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log("received: %s", message);
        ws.send(`You sent: ${message}`);
    });

    ws.send("Sent from WebSocket server");
})

const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SECRET,
        credentials: true,
        name: "sid",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 60000,    // 1 min
        },
    })
);
app.use("/auth", authRouter);

server.listen(4000, () => {
    console.log("Server listening on port 4000");
});