const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("new WS connection");
  // Welcome current user
  socket.emit("message", "Hello from socket");
  // Broadcast when a user connects
  socket.broadcast.emit("message", "A user has joined the chat");
  // Runs when client disconnect
  socket.on("disconnect", () => {
    io.emit("message", "A user has left that chat");
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
