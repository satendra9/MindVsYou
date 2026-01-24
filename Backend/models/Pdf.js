import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    pdfUrl: { type: String, required: true },

    publicId: { type: String, required: true },

    section: {
      type: String,
      required: true, // pyq / class12th / class10th / test
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
      index: true,
      required: function () {
        return this.section === "pyq";
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pdf", pdfSchema);

