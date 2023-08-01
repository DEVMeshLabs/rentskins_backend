import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { CreatePerfilUseCase } from "@/useCases/Perfil/createPerfilUseCase";

export function makeCreatePerfil() {
  const prismaPerfilInfo = new PrismaPerfilRepository();
  const createPerfilUseCase = new CreatePerfilUseCase(prismaPerfilInfo);

  return createPerfilUseCase;
}
