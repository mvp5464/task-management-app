import express from "express";
import { TaskType, TaskZod } from "../config/types";
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
