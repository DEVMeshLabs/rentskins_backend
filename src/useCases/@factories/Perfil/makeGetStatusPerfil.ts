import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { GetStatusPerfilUseCase } from "@/useCases/Perfil/getStatusPerfilUseCase";

export function makeGetStatusPerfil() {
  const prismaPerfil = new PrismaPerfilRepository();
  const perfilInfoUseCase = new GetStatusPerfilUseCase(prismaPerfil);

  return perfilInfoUseCase;
}
