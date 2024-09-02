const express = require("express");
const userRouter = express.Router();
const UserRegister = require("../Controller/Register");
const UserLogin = require("../Controller/Login");
const authMiddleware = require("../Middlewares/Auth");
const GetUserBids = require("../Controller/GetUserBids");

userRouter.post("/register", UserRegister);
userRouter.post("/login", UserLogin);
userRouter.get("/bids", authMiddleware, GetUserBids);

module.exports = userRouter;
