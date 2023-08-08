import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { GetManyPerfilUseCase } from "@/useCases/Perfil/getManyPerfilUseCase";

export function makeGetManyPerfil() {
  const prismaPerfil = new PrismaPerfilRepository();
  const perfilInfoUseCase = new GetManyPerfilUseCase(prismaPerfil);

  return perfilInfoUseCase;
}
