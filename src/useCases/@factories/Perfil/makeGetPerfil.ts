import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { GetPerfilUseCase } from "@/useCases/Perfil/getPerfilUseCase";

export function makeGetPerfil() {
  const prismaPerfil = new PrismaPerfilRepository();
  const perfilInfoUseCase = new GetPerfilUseCase(prismaPerfil);

  return perfilInfoUseCase;
}
