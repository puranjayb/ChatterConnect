const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

const users = [];
const messages = [];

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "Username is already taken" });
  }

  const newUser = { username, password, socketId: null };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
});

// Handle user connections for real-time messaging
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("authenticate", (username) => {
    const user = users.find((u) => u.username === username);
    if (user) {
      user.socketId = socket.id;
    }
  });

  // Handle private messaging
  socket.on("privateMessage", (data) => {
    const recipient = users.find((user) => user.username === data.recipient);

    if (recipient && recipient.socketId) {
      io.to(recipient.socketId).emit("privateMessage", {
        sender: data.sender,
        message: data.message,
      });
    }
  });

  // Handle public group chat
  socket.on("groupMessage", (data) => {
    io.emit("groupMessage", {
      sender: data.sender,
      message: data.message,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
