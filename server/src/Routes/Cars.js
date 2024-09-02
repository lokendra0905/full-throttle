const express = require("express");
const GetCars = require("../Controller/GetCars");
const PlaceBid = require("../Controller/PlaceBid");
const authMiddleware = require("../Middlewares/Auth");
const bidLimiter = require("../Middlewares/BidLimiter");
const ListNewCar = require("../Controller/ListNewCar");
const carsRouter = express.Router();

carsRouter.get("/", GetCars);

carsRouter.post("/:id/bid", authMiddleware, bidLimiter, PlaceBid);

carsRouter.post("/new", authMiddleware, ListNewCar);

module.exports = carsRouter;
