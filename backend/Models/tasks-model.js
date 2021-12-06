const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = Schema({
  title: { type: String, required: true },
  createDate: { type: String, require: true },
  creator: { type: String, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
