import express from "express";
import { SignInType, signInZod, SignUpType, signUpZod } from "../config/types";
import { UserModel } from "../config/db";
import jwt from "jsonwebtoken";

export const userRoute = express.Router();

const dotenv = require("dotenv").config();
const myJwt = dotenv.parsed.JWT_SECRET;

userRoute.post("/signup", async (req, res) => {
  const body: SignUpType = await req.body;
  try {
    const { success, error } = signUpZod.safeParse(body);

    if (!success) {
      return res.status(402).json({ msg: error?.errors[0].message });
    }

    const findUser = await UserModel.findOne({
      email: body.email,
    });

    if (findUser) {
      return res.status(402).json({ msg: "User already exists" });
    }
    // encrypt the password here

    const createUser = await UserModel.create({
      fullName: body.fullName,
      email: body.email,
      password: body.password,
    });

    const token = jwt.sign(createUser._id.toString(), myJwt);
    const bearerToken = `bearer ${token}`;

    return res
      .status(200)
      .json({ msg: bearerToken, name: createUser.fullName });
  } catch (e) {
    console.log({ msg: `Error while creating user: ${e}` });
    return res.status(403).json({ msg: "Error while creating user" });
  }
});

userRoute.post("/login", async (req, res) => {
  const body: SignInType = await req.body;

  try {
    const { success, error } = signInZod.safeParse(body);

    if (!success) {
      return res.status(402).json({ msg: error?.errors[0].message });
    }
    // encrypt incoming password

    const findUser = await UserModel.findOne({
      email: body.email,
      password: body.password,
    });

    if (!findUser) {
      return res.status(403).json({ msg: "Wrong email or password" });
    }

    const token = jwt.sign(findUser._id.toString(), myJwt);
    const bearerToken = `bearer ${token}`;

    return res.status(200).json({ msg: bearerToken, name: findUser.fullName });
  } catch (e) {
    console.log({ msg: `Error while logging user: ${e}` });
    return res.status(403).json({ msg: "Error while logging user" });
  }
});
