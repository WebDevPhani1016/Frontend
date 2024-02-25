const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 8081;
const {Server} = require('socket.io');
const app = new express();
app.use(cors());
app.use(express.static(__dirname+'/src'));
app.use(express.static(path.join(__dirname,'/node_modules')));
// app.use(express.static(path.join(__dirname, 'node_modules', 'socket.io-client', 'dist')));

const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors:{
        methods:['GET','POST'],
        origin:'http://localhost:8081'
    }
});

io.sockets.on('connection',(socket)=>{
    console.log(socket.id);
    console.log('user connected');
    socket.on('chat message',(msg)=>{
        console.log('message', + JSON.stringify(msg));
        socket.broadcast.emit('chat message', msg);
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    })
    socket.broadcast.emit('user data', {socketId:socket.id});
})

// app.get('/',(req, res)=>{
//     res.sendFile('index.html', { root: __dirname + '/src' });
// })

httpServer.listen(PORT,()=>{
    console.log('server listening on port number 8081');
})
