// const {io} = require('socket.io-client');
// import { io } from "../node_modules/socket.io-client/dist/socket.io";
var form = document.querySelector('form');
var input = document.querySelector('input');
const socketClient = io.connect('http://localhost:8081');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socketClient.on('user data', (msg)=>{
            console.log(JSON.stringify(msg));
        })
        socketClient.emit('chat message', input.value);
        input.value = '';
    }
});
socketClient.on('user data', (user)=>{
    console.log(JSON.stringify(user));
})
socketClient.on('chat message', (msg) => {
    console.log(msg);
    var item = document.createElement('li');
    item.textContent = msg;
    document.querySelector('#messages').appendChild(item);
})