const { Schema, model } = require("mongoose");

const Analysis = new Schema({
  _id: String,
  data: Object,
});

module.exports = model("Analysis", Analysis);
