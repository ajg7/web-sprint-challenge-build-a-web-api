const express = require("express");
const actionRouters = require("../express_routers/actionRouters");
const projectRouter = require("../express_routers/projectRouter");

const server = express();
server.use(express.json());
server.use("/actions", actionRouters);
server.use("/project", projectRouter);


server.get("/", (request, response) => {
    response.status(200).json({Anakin: "It's working! It's working!"})
})

module.exports = server;