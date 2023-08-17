const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const server = express();

mongoose.connect(
    "mongodb+srv://RuanSilva:Ruansilva@projectapi.0ebdwkh.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
);

server.use(cors());
server.use(express.json());

server.use(routes);

server.listen(3333);
