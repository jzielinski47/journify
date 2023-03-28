const http = require("http")
const express = require("express")
const path = require("path")

const app = express()
const server = http.createServer(app);
const WebSocket = require("ws");
const port = 5000


server.listen(port, () => console.log(`app listening on port ${port}`))