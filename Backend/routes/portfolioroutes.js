import express from "express";
import { Email } from "../models/EmailsignupRoute.js";
import { Contact } from "../models/ContactRoute.js";
import multer from "multer";
import { PdfDetails } from "../models/PdfDetails.js";
import fs from "fs";
import path from "path";

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../files"));  // your folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post("/upload-files", upload.single("file"), async (req, res) => {
      console.log(req.file);
      const  title = req.body.title;
      const fileName = req.file.filename;
      try{
        await PdfDetails.create({title: title, pdf: fileName, section: req.body.section});
        res.send({status: "ok"});
      }catch(error){
        res.json({status: error});
      }

})

router.get("/get-pdfs/:sectionId", async(req, res) => {
  try{
    const sectionId = req.params.sectionId;
    PdfDetails.find({ section: sectionId }).then((data) => {
      res.send({status: "ok", data: data});
    });
  }catch(error){
    res.json({status: error});
  }
});


// DELETE PDF
router.delete("/delete-pdf/:id", async (req, res) => {
  try {
    const record = await PdfDetails.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "PDF not found" });

    // full path to actual file
    const filePath = path.join(__dirname, "../files", record.pdf);

    fs.unlink(filePath, (err) => {
      if (err) console.log("File not found:", err);
    });

    await PdfDetails.findByIdAndDelete(req.params.id);

    res.json({ message: "PDF deleted successfully" });

  } catch (error) {
    res.status(500).json({ error });
  }
});

// UPDATE PDF TITLE
router.put("/edit-pdf/:id", async (req, res) => {
  try {
    const { title } = req.body;

    const updated = await PdfDetails.findByIdAndUpdate(
      req.params.id,
      { title: title },
      { new: true }  // return updated record
    );

    if (!updated) {
      return res.status(404).json({ message: "PDF not found" });
    }

    res.json({
      status: "ok",
      message: "Title updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ error });
  }
})











 


export default router;