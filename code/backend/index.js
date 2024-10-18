const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
// const { PrismaClient } = require("@prisma/client");

const app = express();
// const prisma = new PrismaClient();
const server = http.createServer(app);

app.use(cors());


const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("join", () => {
    socket.join("abc");
    console.log("JJoined room")
  });

  socket.on("send_message", (message) => {
    console.log(message,"Received message")
    io.emit("receive_message", message);
  });


  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});



app.get("/api", (req, res) => {
  res.status(200).send("This is the API route");
});


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

