import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import videoRoute from "./routes/videoRoute.js";
import commentRoute from "./routes/commentRoute.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();





//middlewares
app.use(cookieParser())
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/video", videoRoute);
app.use("/api/comment", commentRoute);


//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    console.log(status,message,"middelware")
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });

  app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'Hello from NileTube-Backend!'
    })
  })



const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log("Connected to mongodb");
    } catch (error) {
        throw error;
    }
}

app.listen(4000, ()=>{
    connect();
    console.log("Server is running on the port 4000!")
})