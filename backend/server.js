require("dotenv").config();
const express = require("express");
const app = express();

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user(${socket.id.slice(0, 5)}) connected`);
  socket.on("get-analysis", (analysisId) => {
    socket.join(analysisId);
    //socket.emit('load-analysis')

    socket.on("send-changes", (data) => {
      console.log(`user(${socket.id.slice(0, 5)}) send data`);
      socket.broadcast.to(analysisId).emit("receive-changes", data);
    });
  });
});

app.listen(process.env.PORT, () => {
  console.log("listening!!!");
});
