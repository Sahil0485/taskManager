const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    default: null,
    required: false,
  },
  isDone: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const TaskModel = mongoose.model("todos", TaskSchema);
module.exports = TaskModel;
