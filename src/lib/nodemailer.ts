import { env } from "@/env";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT),
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
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
