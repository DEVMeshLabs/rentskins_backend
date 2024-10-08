import { env } from "@/env";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 4444,
  auth: {
    user: "",
    pass: "",
  },
});

export const send = (to: string, subject: string, html: string) => {
  transporter.sendMail({
    from: env.MAIL_FROM,
    to,
    subject,
    html,
  });
};
