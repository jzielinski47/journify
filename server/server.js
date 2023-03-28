const http = require("http");
const express = require("express");
const path = require("path");

const app = express();
const server = http.createServer(app);
const WebSocket = require("ws");
const { getUniqueID } = require("./utils");

const port = 8000;

const webSocketServer = new WebSocket.Server({ server: server });
webSocketServer.on('connection', (socket, req) => {

    socket.id = getUniqueID()
    socket.send('server connected')

    webSocketServer.clients.forEach(client => {
        console.log('Client ID: ' + client.id);
    })

    socket.on('message', message => {
        console.log('recieved %s', message)
        listenForTraffic(socket, message)
    })

    socket.on('close', () => console.log('client disconnected'))
});

const listenForTraffic = (socket, message) => {

}

server.listen(port, () => console.log(`app listening on port ${port}`))