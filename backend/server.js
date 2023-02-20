require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Analysis = require("./db_analysis");
const app = express();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/analyses");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

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

    socket.on("save-analysis", async (data) => {
      await CreateDocument(analysisId, data.ownerId, data);
    });
    socket.on("update-analysis", async (data) => {
      await Analysis.deleteOne({ _id: analysisId });
      await CreateDocument(analysisId, data.ownerId, data);
    });

    socket.on("load-analyses", async (userId) => {
      console.log(userId);
      const data = await Analysis.find({ "data.ownerId": userId });
      console.log(data);
      socket.emit("receive-analyses", data);
    });
  });
});

app.listen(process.env.PORT, () => {
  console.log("listening!!!");
});

async function CreateDocument(id, userId, data) {
  console.log(id, data);
  if (id === null) return;
  // const analysis = await Analysis.findById(id);
  // if (false) {

  return await Analysis.create({ _id: id, ownerId: userId, data: data });
}

async function UpdateDocument(id, data) {
  console.log(id, data);
  if (id === null) return;
  const doc = await Analysis.findOne({ _id: id });

  // Sets `name` and unsets all other properties
  doc.overwrite({ ...data });
  await doc.save();
}
