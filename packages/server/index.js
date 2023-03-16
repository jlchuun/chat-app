const express = require("express");
const { WebSocketServer } = require("ws");
const authRouter = require("./routers/authRouter");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
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
        secret: process.env.SECRET,
        credentials: true,
        name: "sid",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.ENVIRONMENT === "production" ? "true" : "false",
            httpOnly: true,
            sameSite: process.env.ENVIRONMENT === "production" ? "none": "lax",
            maxAge: 60000,    // 1 min
        },
    })
);
app.use("/auth", authRouter);

server.listen(4000, () => {
    console.log("Server listening on port 4000");
});