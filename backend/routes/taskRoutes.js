const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/TaskController");

const router = require("express").Router();

// fetching all tasks
router.get("/", getAllTasks);

// creating new task
router.post("/", createTask);

// for updating task
router.put("/:id", updateTask);

// for deleting task
router.delete("/:id", deleteTask);

module.exports = router;
