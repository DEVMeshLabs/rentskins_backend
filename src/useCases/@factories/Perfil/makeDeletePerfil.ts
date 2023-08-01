import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { DeletePerfilUseCase } from "@/useCases/Perfil/deletePerfilUseCase";

export function makeDeletePerfil() {
  const prismaPerfil = new PrismaPerfilRepository();
  const perfilInfoUseCase = new DeletePerfilUseCase(prismaPerfil);

  return perfilInfoUseCase;
}
