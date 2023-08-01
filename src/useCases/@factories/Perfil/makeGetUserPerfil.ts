import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { GetUserPerfilUseCase } from "@/useCases/Perfil/getUserPerfilUseCase";

export function makeGetUserPerfil() {
  const prismaPerfil = new PrismaPerfilRepository();
  const createPerfilUseCase = new GetUserPerfilUseCase(prismaPerfil);

  return createPerfilUseCase;
}
