const dotenv = require("dotenv").config();
import mongoose, { Schema } from "mongoose";

const mongoUrl = dotenv.parsed.MONGO_URI;

if (!mongoUrl) {
  throw new Error("MONGODB_URI is not defined");
}

(async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
})();

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide a full name"],
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
      required: [true, "Please provide a title"],
    },
    description: String,
    status: {
      type: String,
      required: [true, "Please provide a status"],
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
