import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { UpdatePerfilUseCase } from "@/useCases/Perfil/updatePerfilUseCase";

export function makeUpdateUserPerfil() {
  const prismaPerfil = new PrismaPerfilRepository();
  const createPerfilUseCase = new UpdatePerfilUseCase(prismaPerfil);

  return createPerfilUseCase;
}
