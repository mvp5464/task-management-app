const dotenv = require("dotenv").config();
import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";

export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token?.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No JWT provided" });
  }

  try {
    const getToken = token.split(" ")[1];
    const decodeJWT = verify(getToken, dotenv.parsed.JWT_SECRET);

    res.locals.userId = decodeJWT;
    next();
  } catch (e) {
    console.error("Error while parsing JWT:", e);
    return res.status(401).json({ msg: "Invalid or expired JWT" });
  }
};
