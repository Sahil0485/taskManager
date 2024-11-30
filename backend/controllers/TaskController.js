const TaskModel = require("../models/TaskModel");

const createTask = async (req, res) => {
  const data = req.body;
  try {
    const model = new TaskModel(data);
    await model.save();
    res.status(201).json({ message: "Task Created", success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", sucess: false });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const data = await TaskModel.find({});
    res.status(200).json({ message: "All Tasks", success: true, data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", sucess: false });
  }
};

const updateTask = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const obj = { $set: { ...body } };
    await TaskModel.findByIdAndUpdate(id, obj);
    res.status(200).json({ message: "Task Updated", success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", sucess: false });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted Successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", sucess: false });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
