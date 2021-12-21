const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = Schema({
  title: { type: String, required: true },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true,
  },
  status: { type: String, enum: ["Done", "UnDone"] },
  createDate: { type: String, require: true },
  creatorId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Task", taskSchema);
