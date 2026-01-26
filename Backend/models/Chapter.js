import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  title: String,
  section: String,   // class12th
  subject: String,   // physics
  price: Number,
  driveLink: String,
});

export default mongoose.model("Chapter", chapterSchema);
