import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoutes from './routes/users';
import authRoutes from  './routes/auth';


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user/',userRoutes);
app.use('/api/auth/',authRoutes);



app.listen(7000, () => {
  console.log("server running on localhost:7000");
});
