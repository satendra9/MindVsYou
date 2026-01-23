import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    publicId: { type: String, required: true },

    section: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    classname: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
    },

    subject: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
    },

    year: {
      type: Number,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pdf", pdfSchema);

