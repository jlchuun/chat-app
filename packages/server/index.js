const express = require("express");
const { WebSocketServer } = require("ws");
const authRouter = require("./routers/authRouter");
const Redis = require("./redis");
const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
require("dotenv").config();

const redisClient = Redis;
// store userid for each socket
const userMap = new Map();

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

app.use(cors(corsOptions));
app.use(express.json());
app.use(sessionParser);
app.use("/auth", authRouter);

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

server.on("upgrade", (req, socket, head) => {
    console.log("Parsing session");
    sessionParser(req, {}, () => {
        if (!req.session.user) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
        });
    });
});

wss.on("connection", (ws, req) => {
    const userid = req.session.userid;
    userMap.set(userid, ws);

    ws.on("message", (message) => {
        console.log(message + " from " + req.session.user);
    }) 

    ws.on("close", () => {
        userMap.delete(userid);
    })

})


server.listen(4000, () => {
    console.log("Server listening on port 4000");
});