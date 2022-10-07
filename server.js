import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import collegeRoute from "./routes/collegeRoute.js";
import programRoute from "./routes/programRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ withCredentials: true }));
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.use("/api/colleges", collegeRoute);
app.use("/api/courses", programRoute);
app.use("/api/auth", userRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(process.env.PORT, connect(), () => {
  console.log(`Backend connected ${process.env.PORT}`);
});
