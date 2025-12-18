import mongoose from "mongoose";

const PdfDetailsSchema = new mongoose.Schema({
    pdf: String,
    title: String,
    section: String 
},
    {collection:"PDF Details"}
)

export const PdfDetails = mongoose.model("PdfDetails", PdfDetailsSchema);
