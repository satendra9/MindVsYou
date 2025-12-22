import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    section: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("Pdf", pdfSchema);