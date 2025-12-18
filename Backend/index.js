import express from "express";
import mongoose from "mongoose";
import { PORT, MONGO_URL } from "./config.js";
import EmailRoute from "./routes/portfolioroutes.js"
import cors from 'cors';
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(cors());

app.use("/record", EmailRoute);
app.use("/files", express.static(path.join(__dirname, "files")));

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
