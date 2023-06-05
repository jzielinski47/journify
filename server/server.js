const http = require("http");
const express = require("express");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

const port = 8000;

const users = [];
const usernames = [];
const sessions = [];

const garage = []

const webSocketServer = new WebSocket.Server({ server });
webSocketServer.on('connection', (socket) => {
    socket.id = getUniqueID();
    socket.send('server connected');

    webSocketServer.clients.forEach(client => {
        console.log('Client ID: ' + client.id);
    });

    socket.on('message', message => {
        listenForTraffic(socket, message);
    });

    socket.on('close', () => {
        console.log('client disconnected');
    });
});

const listenForTraffic = (socket, message) => {

    const msg = message.toString().split('&');
    console.log(msg)
    const command = msg[0];
    const login = msg[1].split('=')[1];
    const password = msg[2].split('=')[1];

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

                const data = {
                    id: socket.id,
                    name: login,
                    password: password
                };

                users.push(data);
                usernames.push(login);
                sessions.push(socket.id);
                socket.send(`User ${login} created`);
            }

            break;
    }
};

const getUniqueID = () => {
    const randomHex = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${randomHex()}${randomHex()}${randomHex()}-${randomHex()}${randomHex()}${randomHex()}`;
};

server.listen(port, () => console.log(`App listening on port ${port}`));
