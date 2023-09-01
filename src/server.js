const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectdUsers = {};

io.on("connecttion", (socket) => {
  const { user } = socket.handshake.query;
  console.log(user, socket.id);
  connectdUsers[user] = socket.id;
});

mongoose.connect(
  "mongodb+srv://RuanSilva:Ruansilva@projectapi.0ebdwkh.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use((req, res, next) => {
  req.io = io;
  req.connectdUsers = connectdUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
