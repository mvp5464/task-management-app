"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const dotenv = require("dotenv").config();
const jsonwebtoken_1 = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!(token === null || token === void 0 ? void 0 : token.startsWith("bearer "))) {
        return res.status(403).json({ msg: "No JWT provided" });
    }
    try {
        const getToken = token.split(" ")[1];
        const decodeJWT = (0, jsonwebtoken_1.verify)(getToken, dotenv.parsed.JWT_SECRET);
        res.locals.userId = decodeJWT;
        next();
    }
    catch (e) {
        console.log("Error while parsing JWT:", e);
        return res.status(403).json({ msg: "Error while parsing JWT" });
    }
};
exports.authMiddleware = authMiddleware;
