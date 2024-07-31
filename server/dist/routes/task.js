"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoute = void 0;
const express_1 = __importDefault(require("express"));
const types_1 = require("../config/types");
const db_1 = require("../config/db");
const middleware_1 = require("../config/middleware");
exports.taskRoute = express_1.default.Router();
exports.taskRoute.post("/create-task", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    try {
        const { success, error } = types_1.TaskZod.safeParse(body);
        if (!success) {
            return res.status(402).json({ msg: error === null || error === void 0 ? void 0 : error.errors[0].message });
        }
        const userId = res.locals.userId;
        yield db_1.TaskModel.create({
            userId,
            title: body.title,
            status: body.status,
            description: body.description,
            priority: body.priority,
            deadline: body.deadline,
        });
        return res.status(200).json({ msg: "Task Created Successfully" });
    }
    catch (e) {
        console.log({ msg: `Error while creating Task: ${e}` });
        return res.status(403).json({ msg: `Error while creating Task: ${e}` });
    }
}));
exports.taskRoute.get("/get-task", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId;
        const allTasks = yield db_1.TaskModel.find({ userId });
        return res.status(200).json({ msg: allTasks });
    }
    catch (e) {
        console.log("Error:", e);
        return res.status(402).json({ msg: `Error while getting task info: ${e}` });
    }
}));
exports.taskRoute.delete("/delete-task", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    try {
        const { success, error } = types_1.TaskDeleteZod.safeParse(body);
        if (!success) {
            return res.status(402).json({ msg: error === null || error === void 0 ? void 0 : error.errors[0].message });
        }
        const deleteTask = yield db_1.TaskModel.deleteOne({
            _id: body._id,
        });
        if (!deleteTask.acknowledged) {
            return res.status(404).json({ msg: `Error while deleting a task` });
        }
        return res.status(200).json({ msg: "Task Deleted Successfully" });
    }
    catch (e) {
        console.log("Error while deleting a task:", e);
        return res.status(404).json({ msg: `Error while deleting a task: ${e}` });
    }
}));
exports.taskRoute.put("/update-task", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    try {
        const { success, error } = types_1.TaskZod.safeParse(body);
        if (!success || !body._id) {
            return res.status(402).json({ msg: error === null || error === void 0 ? void 0 : error.errors[0].message });
        }
        const updateTask = yield db_1.TaskModel.updateOne({
            _id: body._id,
        }, {
            title: body.title,
            status: body.status,
            description: body.description,
            priority: body.priority,
            deadline: body.deadline,
        });
        if (!updateTask.acknowledged) {
            return res.status(404).json({ msg: `Error while updating a task` });
        }
        return res.status(200).json({ msg: "Task Updated Successfully" });
    }
    catch (e) {
        return res.status(404).json({ msg: `Error while updating a task: ${e}` });
    }
}));
