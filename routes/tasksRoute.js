import express from "express";
import {
  createTask,
  getAllTasks,
  getPendingTasks,
  getCompletedTasks,
  updateTask,
  deleteTask,
  toggleStatusTask,
  deleteAllTasks,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);

router.get("/", getAllTasks);

router.get("/pending", getPendingTasks);

router.get("/completed", getCompletedTasks);

router.put("/status/:id", toggleStatusTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.delete("/", deleteAllTasks);

export default router;
