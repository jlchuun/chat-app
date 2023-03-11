const express = require("express");
const { WebSocketServer } = require("ws");
const authRouter = require("./routers/authRouter");

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

app.use(express.json());
app.use("/auth", authRouter);

server.listen(4000, () => {
    console.log("Server listening on port 4000");
});