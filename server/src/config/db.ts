const dotenv = require("dotenv").config();
import mongoose, { Schema } from "mongoose";
const mongoUrl = dotenv.parsed.MONGO_URI;
const myPort = dotenv.parsed.PORT;
const myJwt = dotenv.parsed.JWT_SECRET;

console.log({ myPort });
console.log({ myJwt });
console.log({ mongoUrl });

if (!mongoUrl) {
  throw new Error("MONGODB_URI is not defined");
}

mongoose.connect(mongoUrl);

const userSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

const taskSchema = new Schema(
  {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel =
  mongoose.models.Users || mongoose.model("Users", userSchema);
export const TaskModel =
  mongoose.models.Tasks || mongoose.model("Tasks", taskSchema);
