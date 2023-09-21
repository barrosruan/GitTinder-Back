const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 3333;

const connectedUsers = {};

io.on("connection", (socket) => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
  console.log("Client connectet:", user);
});

mongoose.connect(
  "mongodb+srv://RuanSilva:Ruansilva@projectapi.0ebdwkh.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
