const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST']
    }
});
const bodyParser = require('body-parser');
app.use(express.static('dist'));
app.use(bodyParser.json());

const nocache = (_, res, next) => {
    res.header('Cache-Control', "private, no-cache, no-store, must-revalidate");
    res.header('Expires', "-1");
    res.header('Pragma', "no-cache");
};

// SocketData
io.sockets.on('connection', function (socket) {
    console.log(`Phani - Client connected to server with socketId: ${socket.id}`);
    socket.userData = {
        x: 0,
        y: 0,
        z: 0,
        heading: 0,
        pb: 0,
        animationState: 'idle'
    };

    console.log(`Phani - Sending setSocketId emit for client with socketId: ${socket.id}`);

    socket.emit('setSocketId', { socketId: socket.id });

    socket.on('intializeSocket', (data) => {
        console.log(
            `Phani - Recieved initializeSocket emit for socketId: ${socket.id} with data ${JSON.stringify(data)}`
        );
    });
    socket.data.userName = data.userName;
    socket.modelUrl = data.modelUrl;
    socket.userData.x = data.x;
    socket.userData.y = data.y;
    socket.userData.z = data.z;
    socket.userData.heading = data.heading;
    socket.userData.pb = data.pb;
    socket.userData.animationState = "idle";

    socket.on('updateSocket', (data) => {
        console.log(`Phani - updating socket emit for socketId: ${socket.id} with data ${JSON.stringify(data)}`);
        socket.userData.x = data.x;
        socket.userData.y = data.y;
        socket.userData.z = data.z;
        socket.userData.heading = data.heading;
        socket.userData.pb = data.pb;
        socket.userData.animationState = data.animationState;
    });

    socket.on('disconnet', () => {
        socket.emit('user disconnected');
        console.log(`Phani - Sent userDisconnected Event for cclient with socketId: ${socket.id}`);
        socket.broadcast.emit('deleteUser', { socketId: socket.id });
    });
});

const fpsRate = 60;
const intervalDuration = 1000 / fpsRate;

let remoteUsersDataInterval = setInterval(() => {
    const nsp = io.of("/");
    let remoteUsersData = [];
    io.sockets.sockets.forEach((socket) => {
        if (socket.userData.userName != undefined && socket.userData) {
            remoteUsersData.push({
                socketId: socket.id,
                userName: socket.userData.userName,
                modelUrl: socket.modelUrl,
                x: socket.userData.x,
                y: socket.userData.y,
                z: socket.userData.z,
                heading: socket.userData.heading,
                pb: socket.userData.pb,
                animationState: socket.userData.animationState,
            })
        }
        if (remoteUsersData.length > 0) {
            io.emit("remoteUsersData", remoteUsersData);
        }
    });
}, intervalDuration);

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

httpServer.listen(PORT, function () {
    console.log(`Listening for Metaverse App on http://localhost:${PORT}`);
});