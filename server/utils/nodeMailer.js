import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

export const sendResetEmail = async (email, link) => {
  const mailOptions = {
    from: `"News Admin" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Password Reset Request",
    html: `
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${link}">${link}</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
