"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = exports.UserModel = void 0;
const dotenv = require("dotenv").config();
const mongoose_1 = __importStar(require("mongoose"));
const mongoUrl = dotenv.parsed.MONGO_URI;
const myPort = dotenv.parsed.PORT;
const myJwt = dotenv.parsed.JWT_SECRET;
console.log({ myPort });
console.log({ myJwt });
console.log({ mongoUrl });
if (!mongoUrl) {
    throw new Error("MONGODB_URI is not defined");
}
mongoose_1.default.connect(mongoUrl);
const userSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide a fullName"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
}, { timestamps: true });
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Please provide a fullName"],
    },
    description: String,
    status: {
        type: String,
        required: [true, "Please provide a fullName"],
    },
    priority: String,
    deadline: String,
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users",
    },
}, {
    timestamps: true,
});
exports.UserModel = mongoose_1.default.models.Users || mongoose_1.default.model("Users", userSchema);
exports.TaskModel = mongoose_1.default.models.Tasks || mongoose_1.default.model("Tasks", taskSchema);
