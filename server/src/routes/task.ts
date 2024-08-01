import express from "express";
import {
  TaskDeleteType,
  TaskDeleteZod,
  TaskType,
  TaskZod,
} from "../config/types";
import { TaskModel } from "../config/db";
import { authMiddleware } from "../config/middleware";

export const taskRoute = express.Router();
type CompleteTaskType = Required<TaskType>;

taskRoute.post("/create-task", authMiddleware, async (req, res) => {
  const body: TaskType = await req.body;

  try {
    const { success, error } = TaskZod.safeParse(body);
    if (!success) {
      return res.status(400).json({ msg: error?.errors[0].message });
    }

    const { userId } = res.locals.userId;

    await TaskModel.create({
      userId,
      title: body.title,
      status: body.status,
      description: body.description,
      priority: body.priority,
      deadline: body.deadline,
    });

    return res.status(201).json({ msg: "Task Created Successfully" });
  } catch (e) {
    console.error({ msg: `Error while creating Task: ${e}` });
    return res
      .status(500)
      .json({ msg: `Internal Server Error while creating Task` });
  }
});

taskRoute.get("/get-task", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.userId;

    const allTasks: CompleteTaskType[] = await TaskModel.find({ userId });
    return res.status(200).json({ msg: allTasks });
  } catch (e) {
    console.error("Error while getting task info:", e);
    return res
      .status(500)
      .json({ msg: `Internal Server Error while getting task info` });
  }
});

taskRoute.delete("/delete-task", authMiddleware, async (req, res) => {
  const body: TaskDeleteType = await req.body;

  try {
    const { success, error } = TaskDeleteZod.safeParse(body);
    if (!success) {
      return res.status(400).json({ msg: error?.errors[0].message });
    }

    const deleteTask = await TaskModel.deleteOne({
      _id: body._id,
    });

    if (deleteTask.deletedCount === 0) {
      return res.status(404).json({ msg: "Task not found" });
    }

    return res.status(200).json({ msg: "Task Deleted Successfully" });
  } catch (e) {
    console.error("Error while deleting a task:", e);
    return res
      .status(500)
      .json({ msg: `Internal Server Error while deleting a task` });
  }
});

taskRoute.put("/update-task", authMiddleware, async (req, res) => {
  const body: CompleteTaskType = await req.body;

  try {
    const { success, error } = TaskZod.safeParse(body);

    if (!success || !body._id) {
      return res.status(400).json({ msg: error?.errors[0].message });
    }

    const updateTask = await TaskModel.updateOne(
      {
        _id: body._id,
      },
      {
        title: body.title,
        status: body.status,
        description: body.description,
        priority: body.priority,
        deadline: body.deadline,
      }
    );

    if (updateTask.matchedCount === 0) {
      return res.status(404).json({ msg: "Task not found" });
    }

    return res.status(200).json({ msg: "Task Updated Successfully" });
  } catch (e) {
    console.error(`Error while updating a task: ${e}`);
    return res
      .status(500)
      .json({ msg: `Internal Server Error while updating a task` });
  }
});
