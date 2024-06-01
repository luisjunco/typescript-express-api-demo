import express, { Request, Response } from "express";
const router = express.Router();
import mongoose from "mongoose";

import Task from "../models/Task.model";
import Project from "../models/Project.model";


//  POST /api/tasks  -  Creates a new task
router.post("/tasks", (req: Request, res: Response) => {
  const { title, description, projectId } = req.body;

  Task.create({ title, description, project: projectId })
    .then((newTask) => {
      return Project.findByIdAndUpdate(projectId, {
        $push: { tasks: newTask._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});




//  GET /api/tasks/:taskId  - Retrieves a specific task by id
router.get("/tasks/:taskId", (req: Request, res: Response) => {
  const { taskId } = req.params;

  Task.findById(taskId)
    .then((task) => res.json(task))
    .catch((error) => res.json(error));
});




// PUT  /api/tasks/:taskId  - Updates a specific task by id
router.put("/tasks/:taskId", (req: Request, res: Response) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Task.findByIdAndUpdate(taskId, req.body, { new: true })
    .then((updatedTask) => res.json(updatedTask))
    .catch((err) => res.json(err));
});




//  DELETE /api/tasks/:taskId  - Deletes a specific task by id
router.delete("/tasks/:taskId", (req: Request, res: Response) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Task.findByIdAndRemove(taskId)
    .then(() =>
      res.json({ message: `Task with ${taskId} is removed successfully.` })
    )
    .catch((error) => res.json(error));
});

export default router;
