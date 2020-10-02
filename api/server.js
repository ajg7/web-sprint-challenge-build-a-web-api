const express = require("express");

const server = express();

server.get("/", (request, response) => {
    response.status(200).json({Anakin: "It's working! It's working!"})
})

module.exports = server;