const express = require("express");
const router = express.Router();
const { createTask, getAllTasks, getTaskById, deleteTask, updateTask } = require("../Controllers/TaskController");

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
