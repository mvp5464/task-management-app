"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const types_1 = require("../config/types");
const db_1 = require("../config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const __1 = require("..");
exports.userRoute = express_1.default.Router();
const myJwt = __1.dotenv.parsed.JWT_SECRET;
exports.userRoute.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    try {
        const { success, error } = types_1.signUpZod.safeParse(body);
        if (!success) {
            return res.status(402).json({ msg: error === null || error === void 0 ? void 0 : error.errors[0].message });
        }
        const findUser = yield db_1.UserModel.findOne({
            email: body.email,
        });
        if (findUser) {
            return res.status(402).json({ msg: "User already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(body.password, 10);
        console.log({ hashedPassword });
        const createUser = yield db_1.UserModel.create({
            fullName: body.fullName,
            email: body.email,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign(createUser._id.toString(), myJwt);
        const bearerToken = `bearer ${token}`;
        return res
            .status(200)
            .json({ msg: bearerToken, name: createUser.fullName });
    }
    catch (e) {
        console.log({ msg: `Error while creating user: ${e}` });
        return res.status(403).json({ msg: "Error while creating user" });
    }
}));
exports.userRoute.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    try {
        const { success, error } = types_1.signInZod.safeParse(body);
        if (!success) {
            return res.status(402).json({ msg: error === null || error === void 0 ? void 0 : error.errors[0].message });
        }
        const findUser = yield db_1.UserModel.findOne({
            email: body.email,
        });
        if (!findUser) {
            return res.status(403).json({ msg: "Invalid email address" });
        }
        const passwordValidation = yield bcryptjs_1.default.compare(body.password, findUser.password);
        console.log({ passwordValidation });
        if (!passwordValidation) {
            return res.status(403).json({ msg: "Password is incorrect" });
        }
        const token = jsonwebtoken_1.default.sign(findUser._id.toString(), myJwt);
        const bearerToken = `bearer ${token}`;
        return res.status(200).json({ msg: bearerToken, name: findUser.fullName });
    }
    catch (e) {
        console.log({ msg: `Error while logging user: ${e}` });
        return res.status(403).json({ msg: "Error while logging user" });
    }
}));
