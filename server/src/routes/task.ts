import express from "express";
import {
  TaskDeleteType,
  TaskDeleteZod,
  TaskType,
  TaskZod,
} from "../config/types";
import { TaskModel } from "../config/db";

export const taskRoute = express.Router();

taskRoute.post("/create", async (req, res) => {
  const body: TaskType = await req.body;

  try {
    const { success } = TaskZod.safeParse(body);
    if (!success) {
      return res.status(404).json({ msg: "Wrong input types" });
    }

    const taskCreate = await TaskModel.create({
      title: body.title,
      status: body.status,
      description: body.description,
      priority: body.priority,
      deadline: body.deadline,
    });
    console.log({ taskCreate });

    return res.status(200).json({ msg: "Task Created Successfully" });
  } catch (e) {
    console.log({ msg: `Error while creating user: ${e}` });
    return res.status(403).json({ msg: `Error while creating user: ${e}` });
  }
});

taskRoute.get("/get-task", async (req, res) => {
  try {
    const allTasks = await TaskModel.find();
    return res.status(200).json({ msg: allTasks });
  } catch (e) {
    console.log("Error:", e);
    return res.status(402).json({ msg: `Error while getting task info: ${e}` });
  }
});

taskRoute.delete("/delete-task", async (req, res) => {
  const body: TaskDeleteType = await req.body;

  try {
    const { success } = TaskDeleteZod.safeParse(body);
    if (!success) {
      return res.status(404).json({ msg: "Wrong input types" });
    }

    const deleteTask = await TaskModel.deleteOne({
      _id: body._id,
    });

    if (!deleteTask.acknowledged) {
      return res.status(404).json({ msg: `Error while deleting a task` });
    }

    return res.status(200).json({ msg: "Deleted task successfully" });
  } catch (e) {
    console.log("Error while deleting a task:", e);
    return res.status(404).json({ msg: `Error while deleting a task: ${e}` });
  }
});

taskRoute.put("/update-task", async (req, res) => {
  const body: TaskType = await req.body;

  try {
    const { success } = TaskZod.safeParse(body);

    if (!success || !body._id) {
      return res.status(402).json({ msg: "Wrong input" });
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

    if (!updateTask.acknowledged) {
      return res.status(404).json({ msg: `Error while updating a task` });
    }

    return res.status(200).json({ msg: "Task updated successfully" });
  } catch (e) {
    return res.status(404).json({ msg: `Error while updating a task: ${e}` });
  }
});
