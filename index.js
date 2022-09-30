import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js";
import tasksRoute from "./routes/tasksRoute.js";

import { verifyToken } from "./utils/verifyToken.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB successfully!!");
  } catch (error) {
    console.log(error.message);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

app.use(cors({ origin: "http://127.0.0.1:5000" }));
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", verifyToken, usersRoute);
app.use("/api/tasks", verifyToken, tasksRoute);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Internal server error";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

app.listen(PORT, () => {
  connect();
  console.log(`Server listening on port ${PORT}`);
});
