import mongoose from "mongoose";

const PdfDetailsSchema = new mongoose.Schema({
    pdfUrl: String,
    publicId: String,
    section: String,
},
    {collection:"PDF Details"}
)

export const PdfDetails = mongoose.model("PdfDetails", PdfDetailsSchema);
