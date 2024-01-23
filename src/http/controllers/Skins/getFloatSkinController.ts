import { makeGetSkinFloatUseCase } from "@/useCases/@factories/Skin/makeGetSkinFloatUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { getFloatSchema } from "./Schemas/getFloatSchema";

export async function getFloatSkinController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { url } = getFloatSchema.parse(req.body);

  try {
    const getSkinFloat = makeGetSkinFloatUseCase();
    const response = await getSkinFloat.execute(url);

    return reply.status(200).send(response);
  } catch (error) {
    const errorMappings = {
      SkinFloatUnauthorizedError: 401,
      SkinFloatNoCreditsError: 402,
      SkinFloatInvalidParametersLinkError: 406,
      SkinFloatCantGetFloatError: 417,
    };
    const status = errorMappings[error.constructor.name] || 500;
    return reply.status(status).send({ error: error.message });
  }
}
