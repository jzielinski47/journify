const http = require("http");
const express = require("express");
const path = require("path");

const app = express();
const server = http.createServer(app);
const WebSocket = require("ws");

const port = 8000;

let login;
let password;

const users = []
const usernames = []
const sessions = []

const webSocketServer = new WebSocket.Server({ server: server });
webSocketServer.on('connection', (socket, req) => {

    socket.id = getUniqueID()
    socket.send('server connected')

    webSocketServer.clients.forEach(client => {
        console.log('Client ID: ' + client.id);
    })

    socket.on('message', message => {
        console.log(`[recieved]: %s`, message)
        listenForTraffic(socket, message)
    })

    socket.on('close', () => {
        console.log('client disconnected')
    })
});

const listenForTraffic = (socket, message) => {

    const msg = message.toString().split('&');
    const command = msg[0];
    const login = msg[1].split('=')[1].toString();
    const password = msg[2].split('=')[1].toString();

    switch (command) {
        case '%login':

            const user = users.find(user => user.name === login);

            if (user) {
                if (user.password === password) {
                    socket.send('%authorized=' + socket.id);
                } else {
                    socket.send('Password is not correct');
                }
            } else {
                socket.send('Username is not correct');
            }

            break;

        case '%register':

            if (login.length === 0 || password.length === 0) {
                socket.send('Your login or password is too short');
            } else if (usernames.includes(login)) {
                socket.send(`User ${login} already exists`);
            } else if (sessions.includes(socket.id)) {
                socket.send(`You can't create another account in the same session`);
            } else {
                const data = { id: socket.id, name: login, password: password };

                users.push(data);
                usernames.push(login);
                sessions.push(socket.id);
                socket.send(`User ${login} created`);
            }
            console.log(users);
            break;
    }
};


const getUniqueID = () => {
    const randomHex = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${randomHex()}${randomHex()}${randomHex()}-${randomHex()}${randomHex()}${randomHex()}`;
};


server.listen(port, () => console.log(`app listening on port ${port}`))