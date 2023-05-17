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
    switch (msg[0]) {
        case '%login':

            login = msg[1].split('=')[1].toString()
            password = msg[2].split('=')[1].toString()

            if (usernames.includes(login)) {
                users.forEach(user => {
                    if (user.name === login && user.password === password) {
                        socket.send('%authorized=' + socket.id)
                    } else {
                        socket.send(`password is not correct`)
                    }
                })
            } else {
                socket.send(`username is not correct`)
            }

            break;

        case '%register':

            login = msg[1].split('=')[1].toString()
            password = msg[2].split('=')[1].toString()

            if (login.length > 0 && password.length > 0) {
                if (!usernames.includes(login) && !sessions.includes(socket.id)) {

                    let data = { id: socket.id, name: login, password: password }

                    users.push(data);
                    usernames.push(login);
                    sessions.push(socket.id)

                    socket.send(`user ${login} created`)
                } else if (sessions.includes(socket.id)) {
                    socket.send(`You can't create another account in the same session`)
                } else {
                    socket.send(`user ${login} exists`)
                }
            } else {
                socket.send(`your login or your password is too short`)
            }



            console.log(users)


    }
}

const getUniqueID = () => {
    const s4 = () => { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }
    return s4() + s4() + s4() + '-' + s4() + s4() + s4()
}

server.listen(port, () => console.log(`app listening on port ${port}`))