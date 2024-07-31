export const dotenv = require("dotenv").config();
import express from "express";
const app = express();
import cors from "cors";
import { userRoute } from "./routes/user";
import { taskRoute } from "./routes/task";

const router = express.Router();
const PORT = dotenv.parsed.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/task", taskRoute);

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});

export default router;
