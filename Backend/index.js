import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "./cloudinary.js";
import mongoose from "mongoose";
import { PORT, MONGO_URL } from "./config.js";
import EmailRoute from "./routes/portfolioroutes.js"
import AuthRoute from "./routes/authroutes.js"
import userRoute from "./routes/userRoutes.js"
import chapterRoutes from "./routes/chapterRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import cors from 'cors';



const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://www.mindvsyou.in",
  "https://mindvsyou.in"
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/record", EmailRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/auth", userRoute);
app.use("/api/chapters", chapterRoutes);
app.use("/api/payments", paymentRoutes);


mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`Server is connected on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
