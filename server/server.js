const http = require("http");
const express = require("express");
const path = require("path");

const app = express();
const server = http.createServer(app);
const WebSocket = require("ws");
const port = 8000;

const webSocketServer = new WebSocket.Server({ server: server });
webSocketServer.on('connection', (socket, req) => {
    console.log('new client connected');

    socket.on('close', () => {
        console.log('client disconnected')

    })
});

server.listen(port, () => console.log(`app listening on port ${port}`))