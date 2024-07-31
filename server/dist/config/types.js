"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDeleteZod = exports.TaskZod = exports.signInZod = exports.signUpZod = void 0;
const zod_1 = require("zod");
exports.signUpZod = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    fullName: zod_1.z.string().min(1, "The name field is required."),
    email: zod_1.z.string().email("Please enter a valid email address."),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long."),
});
exports.signInZod = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    email: zod_1.z.string().email("Please enter a valid email address."),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long."),
});
exports.TaskZod = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    userId: zod_1.z.string().optional(),
    title: zod_1.z.string().min(1, "The title field is required."),
    description: zod_1.z.string().optional(),
    status: zod_1.z.string().min(1, "The status field is required"),
    priority: zod_1.z.enum(["Low", "Medium", "Urgent", ""]).optional(),
    deadline: zod_1.z.string().optional(),
});
exports.TaskDeleteZod = zod_1.z.object({
    _id: zod_1.z.string().min(1),
});
