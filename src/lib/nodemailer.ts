import { env } from "@/env";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(env.MAIL_SENDGRID_API_KEY);
export const send = (to: string, subject: string, html: string) => {
  console.log(env.MAIL_SENDGRID_API_KEY);

  try {
    sgMail
      .send({
        to,
        from: env.MAIL_FROM,
        subject,
        html,
      })
      .then(() => {
        console.log("Email enviado com sucesso");
      });
  } catch (error) {
    console.error(error);
  }
};

// const transporter = nodemailer.createTransport({
//   host: env.MAIL_HOST,
//   port: Number(env.MAIL_PORT),
//   auth: {
//     user: env.MAIL_USER,
//     pass: env.MAIL_PASS,
//   },
// });

// export const send = (to: string, subject: string, html: string) => {
//   transporter.sendMail({
//     from: env.MAIL_FROM,
//     to,
//     subject,
//     html,
//   });
// };
