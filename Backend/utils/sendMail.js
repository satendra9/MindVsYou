import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password (NOT normal gmail password)
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Mail server error:", error);
  } else {
    console.log("✅ Mail server is ready");
  }
});

export const sendMail = async ({
  to,
  subject,
  html,
  attachments = [],
}) => {
  await transporter.sendMail({
    from: `"MindvsYou Learning" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments,
  });
};

