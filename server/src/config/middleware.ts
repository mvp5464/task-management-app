import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
const dotenv = require("dotenv").config();

export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token?.startsWith("bearer ")) {
    return res.status(403).json({ msg: "No JWT provided" });
  }

  try {
    const getToken = token.split(" ")[1];
    const decodeJWT = verify(getToken, dotenv.parsed.JWT_SECRET);

    res.locals.userId = decodeJWT;
    next();
  } catch (e) {
    console.log("Error while parsing JWT:", e);
    return res.status(403).json({ msg: "Error while parsing JWT" });
  }
};
