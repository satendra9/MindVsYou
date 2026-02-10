import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "../models/TeacherRoute.js"
import authMiddleware from "../middleware/middleware.js";

const router = express.Router();

/* REGISTER (run once or admin-only) */
router.post("/teacher-register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new Teacher({
      email,
      password: hashedPassword,
    });

    await teacher.save();

    res.status(201).json({ message: "Teacher registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

/* LOGIN */
router.post("/teacher-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: teacher._id,
        role: teacher.role, // ✅ now exists
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});


router.get("/teacher/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome Teacher" });
});


export default router;