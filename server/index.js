const express = require("express");
const cors = require("cors");
const { connection } = require("./src/db");
const userRouter = require("./src/Routes/User");
const carsRouter = require("./src/Routes/Cars");

const app = express();

require("dotenv").config;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    res.status(200).send("Welcome to Full Throttle");
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/cars", carsRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Database Successfully running on 8080");
  } catch (error) {
    console.log("Cannot Connect to Datatbase");
  }
});
