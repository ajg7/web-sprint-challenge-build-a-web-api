const express = require("express");
const actionRouters = require("../express_routers/actionRouters");

const server = express();
server.use(express.json());
server.use("/actions", actionRouters);


server.get("/", (request, response) => {
    response.status(200).json({Anakin: "It's working! It's working!"})
})

module.exports = server;