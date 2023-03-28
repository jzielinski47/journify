const http = require("http");
const express = require("express");
const path = require("path");

const app = express();
const server = http.createServer(app);
const WebSocket = require("ws");


const port = 8000;

const webSocketServer = new WebSocket.Server({ server: server });
webSocketServer.on('connection', (socket, req) => {

    socket.id = getUniqueID()
    socket.send('server connected')

    webSocketServer.clients.forEach(client => {
        console.log('Client ID: ' + client.id);
    })

    socket.on('message', message => {
        console.log(`[recieved]: %s`, message)
        socket.send('[server recieved]')
        listenForTraffic(socket, message)
    })

    socket.on('close', () => console.log('client disconnected'))
});

const listenForTraffic = (socket, message) => {

}

const getUniqueID = () => {
    const s4 = () => { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }
    return s4() + s4() + s4() + '-' + s4() + s4() + s4()
}

server.listen(port, () => console.log(`app listening on port ${port}`))