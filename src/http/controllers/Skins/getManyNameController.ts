import { makeGetManyNameUseCase } from "@/useCases/factories/Skin/makeGetManyNameUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyNameController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { name } = req.params as { name: string };
  console.log(name);
  try {
    const getManyName = makeGetManyNameUseCase();

    const getMany = await getManyName.execute(name);

    return reply.status(200).send(getMany);
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
