const dotenv = require("dotenv").config();
import express from "express";
import { SignInType, signInZod, SignUpType, signUpZod } from "../config/types";
import { UserModel } from "../config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const userRoute = express.Router();
type CompleteSignupType = Required<SignUpType>;
const myJwt = dotenv.parsed.JWT_SECRET;

userRoute.post("/signup", async (req, res) => {
  const body: CompleteSignupType = await req.body;
  try {
    const { success, error } = signUpZod.safeParse(body);

    if (!success) {
      return res.status(400).json({ msg: error?.errors[0].message });
    }

    const findUser: CompleteSignupType | null = await UserModel.findOne({
      email: body.email,
    });

    if (findUser) {
      return res.status(409).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const createUser: CompleteSignupType = await UserModel.create({
      fullName: body.fullName,
      email: body.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: createUser._id.toString() }, myJwt, {
      expiresIn: "7d",
    });
    const bearerToken = `Bearer ${token}`;

    return res
      .status(201)
      .json({ msg: bearerToken, name: createUser.fullName });
  } catch (e) {
    console.error({ msg: `Error while creating user: ${e}` });
    return res
      .status(403)
      .json({ msg: "Internal Server Error while creating user" });
  }
});

userRoute.post("/login", async (req, res) => {
  const body: SignInType = await req.body;

  try {
    const { success, error } = signInZod.safeParse(body);

    if (!success) {
      return res.status(400).json({ msg: error?.errors[0].message });
    }

    const findUser: CompleteSignupType | null = await UserModel.findOne({
      email: body.email,
    });

    if (!findUser) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const passwordValidation = await bcrypt.compare(
      body.password,
      findUser.password
    );

    if (!passwordValidation) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: findUser._id.toString() }, myJwt, {
      expiresIn: "7d",
    });
    const bearerToken = `Bearer ${token}`;

    return res.status(200).json({ msg: bearerToken, name: findUser.fullName });
  } catch (e) {
    console.error({ msg: `Error while logging user: ${e}` });
    return res
      .status(500)
      .json({ msg: "Internal Server Error while logging user" });
  }
});
