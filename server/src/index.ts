const dotenv = require("dotenv").config();
import express from "express";
import cors from "cors";
import { userRoute } from "./routes/user";
import { taskRoute } from "./routes/task";

const app = express();

const PORT = dotenv.parsed.PORT || 9000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/task", taskRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

export default app;
