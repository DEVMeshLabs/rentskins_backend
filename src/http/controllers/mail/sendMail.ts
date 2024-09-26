import { FastifyRequest, FastifyReply } from "fastify";
import { send } from "@/lib/nodemailer";
import { templateSendMail_1 } from "@/lib/templates/sendMail_1";

export async function sendMailController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { to, subject, value, paymentMethod } = req.body as {
    to: string;
    subject: string;
    value: string;
    paymentMethod: string;
    user: string;
  };
  const data = new Date();
  const htmlTemplate = templateSendMail_1({
    user: "Ítalo",
    title: subject,
    value,
    date: data.toDateString(),
    paymentMethod,
  });

  try {
    send(to, subject, htmlTemplate);

    return reply.status(200).send({ message: "Email enviado com sucesso" });
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
