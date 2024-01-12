const http = require("http");
const express = require("express");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

const port = 8000;

const default_admin = { id: 0, name: 'admin', password: 'admin', admin: true }
const default_user = { id: 1, name: 'user', password: 'user', admin: false }

const users = [default_admin, default_user];
const usernames = [default_admin.name, default_user.name];
const sessions = [default_admin.id, default_user.id];

const garage = [
    { id: 0, brand: 'BMW', model: 'M3', year: 2003, owner: 0, owner_name: 'admin' },
    { id: 1, brand: 'BMW', model: 'X8', year: 2003, owner: 1, owner_name: 'user' },
    { id: 2, brand: 'Mercedes Benz', model: 'C-Class', year: 2010, owner: 0, owner_name: 'admin' },
    { id: 3, brand: 'Audi', model: 'A4', year: 2012, owner: 0, owner_name: 'admin' },
    { id: 4, brand: 'Peugeot', model: '308', year: 2015, owner: 0, owner_name: 'admin' },
    { id: 5, brand: 'BMW', model: 'X5', year: 2018, owner: 0, owner_name: 'admin' },
    { id: 6, brand: 'Toyota', model: 'Camry', year: 2014, owner: 0, owner_name: 'admin' },
    { id: 7, brand: 'Mercedes Benz', model: 'GLC', year: 2019, owner: 0, owner_name: 'admin' },
    { id: 8, brand: 'Peugeot', model: '208', year: 2017, owner: 0, owner_name: 'admin' },
    { id: 9, brand: 'Audi', model: 'Q5', year: 2016, owner: 0, owner_name: 'admin' },
    { id: 10, brand: 'BMW', model: 'M5', year: 2020, owner: 0, owner_name: 'admin' },
    { id: 11, brand: 'Mercedes Benz', model: 'E-Class', year: 2013, owner: 0, owner_name: 'admin' },
    { id: 12, brand: 'Toyota', model: 'Corolla', year: 2011, owner: 0, owner_name: 'admin' },
    { id: 13, brand: 'Peugeot', model: '508', year: 2019, owner: 1, owner_name: 'user' },
    { id: 14, brand: 'Audi', model: 'A6', year: 2017, owner: 0, owner_name: 'admin' },
    { id: 15, brand: 'BMW', model: 'X3', year: 2015, owner: 0, owner_name: 'admin' },
    { id: 16, brand: 'Mercedes Benz', model: 'S-Class', year: 2021, owner: 0, owner_name: 'admin' },
    { id: 17, brand: 'Toyota', model: 'Rav4', year: 2018, owner: 0, owner_name: 'admin' },
    { id: 18, brand: 'Peugeot', model: '3008', year: 2016, owner: 0, owner_name: 'admin' },
    { id: 19, brand: 'Audi', model: 'Q3', year: 2022, owner: 0, owner_name: 'admin' },
]

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
    const command = msg[0];
    let login, password

    console.log('cmd: ' + command)

    switch (command) {

        case '%login':
            login = msg[1].split('=')[1];
            password = msg[2].split('=')[1];

            const user = users.find(user => user.name === login)
            if (user) {
                if (user.password === password) {
                    socket.id = user.id
                    socket.send('%authorized=' + socket.id);
                } else {
                    socket.send('Password is not correct');
                }
            } else {
                socket.send('Username is not correct');
            }

            break;

        case '%register':

            login = msg[1].split('=')[1];
            password = msg[2].split('=')[1];

            if (login.length === 0 || password.length === 0) {
                socket.send('Your login or password is too short');
            } else if (usernames.includes(login)) {
                socket.send(`User ${login} already exists`);
            } else if (sessions.includes(socket.id)) {
                socket.send(`You can't create another account in the same session`);
            } else {

                const userInfo = {
                    id: socket.id,
                    name: login,
                    password: password,
                    admin: false
                };

                users.push(userInfo);
                usernames.push(login);
                sessions.push(socket.id);
                socket.send(`User ${login} created`);
            }

            break;

        case '%get':

            const subject = msg[1].split('=')[1]

            switch (subject) {
                case 'cars':
                    const personal_garage = garage.filter(car => car.owner === socket.id)
                    const res = JSON.stringify(personal_garage)
                    console.log(`%garage=${res}`)
                    socket.send(`%garage=${res}`);
                    break;
            }


            console.log()

            break;
        case '%logout':
            const sessionId = socket.id;

            // Reset or invalidate the socket.id
            socket.id = null; // or assign a new ID, or handle it as per your logic

            // Remove the sessionId from sessions array
            const sessionIndex = sessions.indexOf(sessionId);
            if (sessionIndex > -1) {
                sessions.splice(sessionIndex, 1);
            }
            socket.send('%loggedOut');
            break;

    }
};

const getUniqueID = () => {
    const randomHex = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${randomHex()}${randomHex()}${randomHex()}-${randomHex()}${randomHex()}${randomHex()}`;
};

server.listen(port, () => console.log(`App listening on port ${port}`));
