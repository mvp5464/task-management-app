"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv").config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./routes/user");
const task_1 = require("./routes/task");
const router = express_1.default.Router();
const PORT = dotenv.parsed.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/user", user_1.userRoute);
app.use("/api/v1/task", task_1.taskRoute);
app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
});
exports.default = router;
