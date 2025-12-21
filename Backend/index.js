import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "./cloudinary.js";
import mongoose from "mongoose";
import { PORT, MONGO_URL } from "./config.js";
import EmailRoute from "./routes/portfolioroutes.js"
import cors from 'cors';


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use("/record", EmailRoute);

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
