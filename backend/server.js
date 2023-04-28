require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Analysis = require("./db_analysis");
const app = express();

main().catch((err) => console.log(err));

// let server = app.listen(8080, () => {
//   console.log("listening on port: ", server.address().port);
// });

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.DOMAIN}`
  );
}

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //console.log(`user(${socket.id.slice(0, 5)}) connected`);
  socket.on("get-analysis", (analysisId) => {
    socket.join(analysisId);

    socket.on("send-changes", (data) => {
      //console.log(`user(${socket.id.slice(0, 5)}) send data`);
      socket.broadcast.to(analysisId).emit("receive-changes", data);
    });

    socket.on("save-analysis", async (data) => {
      await CreateDocument(data.dbId, data.ownerId, data);
    });

    socket.on("update-analysis", async (data) => {
      await Analysis.deleteOne({ _id: data.dbId });
      await CreateDocument(data.dbId, data.ownerId, data);
    });

    socket.on("delete-analysis", async (id) => {
      await Analysis.deleteOne({ _id: id });
    });

    socket.on("load-analyses", async (userId) => {
      const data = await Analysis.find({ "data.ownerId": userId });
      socket.emit("receive-analyses", data);
    });
  });
});

async function CreateDocument(id, userId, data) {
  if (id === null) return;
  try {
    return await Analysis.create({ _id: id, ownerId: userId, data: data });
  } catch (err) {}
}
