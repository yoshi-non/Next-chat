const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        // allowedHeaders: ["my-custom-header"],
        // credentials: true
      }
});
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('クライアントと接続中...');

    // クライアントから受信
    socket.on("send_message", (data) => {
        console.log(data)
        // クライアントへ送信
        io.emit("received_message", (data))
    })

    socket.on('disconnect', () => {
        console.log('クライアントと接続が切れました');
    });
});

server.listen(PORT, () => {
console.log(`server is runnning on ${PORT}`);
});