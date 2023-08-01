import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { UpdatePerfilUseCase } from "@/useCases/Perfil/updatePerfilUseCase";

export function makeUpdatePerfil() {
  const prismaPerfil = new PrismaPerfilRepository();
  const createPerfilUseCase = new UpdatePerfilUseCase(prismaPerfil);

  return createPerfilUseCase;
}
