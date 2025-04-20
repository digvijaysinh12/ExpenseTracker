import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import otpRoutes from "./routes/otpRoutes.js";
import morgan from "morgan";
import connectDb from "./config/connectDb.js";
import transactionRoute from "./routes/transactionRoute.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(morgan("dev")); // Logs details about each request for debugging
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());

// Database connection
connectDb();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);

//transaction routes
app.use('/api/transaction',transactionRoute)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
