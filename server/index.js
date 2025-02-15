const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const socketIO = require("socket.io")(http, {
    cors: {
        origin: "*",
        // origin: "http://localhost:3000",
    },
});

app.use(cors());
let users = [];

app.use(express.static('public'));

socketIO.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("message", (data) => {
        if (data.castStatus == "play") {
            console.log('PLAY Button pressed');
            socketIO.emit("messageResponse", data);
        }
        if (data.castStatus == "stop") {
            console.log('STOP Button pressed');
            socketIO.emit("messageResponse", data);
        }
        if (data.castStatus == "load") {
            console.log('LOAD Button pressed');
            socketIO.emit("messageResponse", data);
        }
    });

    socket.on("newFrame", (data) => {
        socket.broadcast.emit("newFrame", data);
    });

    socket.on("newUser", (data) => {
        console.log("User just connected");
        console.log(data);
        users.push(data);
        socketIO.emit("newUserResponse", users);
    });

    socket.on("disconnect", () => {
        console.log("🔥: A user disconnected");
        const disconnectedUser = users.find((user) => user.socketID === socket.id);
        if (disconnectedUser) {
            console.log(users);
            const index = users.indexOf(disconnectedUser);
            users[index] = { userName: null, socketID: null }; // Replace the disconnected user with null
            socketIO.emit("newUserResponse", users);
        }
        socket.disconnect();
    });
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello" });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});