import mongoose, { Schema } from "mongoose";
import { dotenv } from "..";
const mongoUrl = dotenv.parsed.MONGO_URI;

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
