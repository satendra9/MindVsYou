import express from "express";
import { Email } from "../models/EmailsignupRoute.js";
import { Contact } from "../models/ContactRoute.js";
import multer from "multer";
import { PdfDetails } from "../models/PdfDetails.js";
import fs from "fs";
import path from "path";
import cloudinary from "../cloudinary.js"
import { CloudinaryStorage } from "multer-storage-cloudinary";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
//posting on to the server
router.post("/emailform", async (req, res) => {
  try {
    if (!req.body.email) {
      res.status(400).send({
        message: "Please input the email",
      });
    }

    const newRecord = {
      email: req.body.email,
      
    };

    const record = await Email.create(newRecord);
    return res.status(201).send(record);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
})

router.post("/contactdata", async (req, res) => {
  try {
    if (!req.body.firstname || !req.body.secondname || !req.body.email || !req.body.message) {
      res.status(400).send({
        message: "Please input all the details",
      });
    }

    const newContactRecord = {
      firstname: req.body.firstname,
      secondname: req.body.secondname,
      email:req.body.email,
      message:req.body.message
      
    };

    const contactrecord = await Contact.create(newContactRecord);
    return res.status(201).send(contactrecord);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });

  }

})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mindvsyou_pdfs",
    resource_type: "raw", // important for PDFs
    format: async (req, file) => "pdf",
    public_id: (req, file) =>
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_"),
  },
});

const upload = multer({ storage });

// Root route
router.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Upload PDF
router.post("/upload-files", upload.single("file"), async (req, res) => {
  try {
    const { title, section } = req.body;

    // IMPORTANT: CloudinaryStorage already returns secure_url and filename
    const pdfUrl = req.file.path;      // secure_url
    const publicId = req.file.filename; // Cloudinary public_id

    await PdfDetails.create({
      title,
      pdfUrl,
      publicId,
      section,
    });

    res.json({ status: "ok", data: { title, pdfUrl, publicId } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Get PDFs by section
router.get("/get-pdfs/:sectionId", async (req, res) => {
  try {
    const data = await PdfDetails.find({ section: req.params.sectionId });
    res.json({ status: "ok", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Delete PDF
router.delete("/delete-pdf/:id", async (req, res) => {
  try {
    const record = await PdfDetails.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "PDF not found" });

    await cloudinary.uploader.destroy(record.publicId, {
      resource_type: "raw",
    });

    await PdfDetails.findByIdAndDelete(req.params.id);

    res.json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Update PDF title
router.put("/edit-pdf/:id", async (req, res) => {
  try {
    const { title } = req.body;

    const updated = await PdfDetails.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "PDF not found" });

    res.json({ status: "ok", message: "Title updated", data: updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});





 


export default router;