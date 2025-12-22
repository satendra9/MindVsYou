import express from "express";
import { Email } from "../models/EmailsignupRoute.js";
import { Contact } from "../models/ContactRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import Pdf from "../models/Pdf.js";
import cloudinary from "../cloudinary.js";
import upload from "../multer.js"


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

router.post("/upload/:section", upload.single("pdf"), async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);
    const {section} = req.params;
    console.log("Uploading to section:", section);

    if (!req.file) {
      return res.status(400).json({ message: "PDF file not received" });
    }

    const folderName = `pdfs/${section.replace(/\s+/g, "-").toLowerCase()}`;
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: folderName,
      
    });

    const pdf = await Pdf.create({
      title: req.body.title,
      pdfUrl: result.secure_url,
      publicId: result.public_id,
      section,
    });

    res.status(201).json(pdf);
    console.log("CLOUDINARY URL:", result.secure_url);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* Get pdf by section */
router.get("/pdfs/:section", async (req, res) => {
  try {
    const { section } = req.params;

    const pdfs = await Pdf.find({ section });

    res.json(pdfs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* delete pdf by section */
router.delete("/pdfs/:id", async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    await cloudinary.uploader.destroy(pdf.publicId, {
      resource_type: "raw",
    });

    await Pdf.findByIdAndDelete(req.params.id);

    res.json({ message: "PDF deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* 🔹 Get All PDFs */
router.get("/pdfs", async (req, res) => {
  const pdfs = await Pdf.find().sort({ createdAt: -1 });
  res.json(pdfs);
});

/* 🔹 Update PDF Title */
router.put("/pdfs/:id", async (req, res) => {
  const updated = await Pdf.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );
  res.json(updated);
});


 


export default router;