import { PrismaPerfilInfoRepository } from "@/repositories/Prisma/prismaPerfilInfoRepository";
import { CreatePerfilInfoUseCase } from "@/useCases/Perfil/createPerfilInfoUseCase";

export function makeCreatePerfilInfo() {
  const prismaPerfilInfo = new PrismaPerfilInfoRepository();
  const createPerfilInfoUseCase = new CreatePerfilInfoUseCase(prismaPerfilInfo);

  return createPerfilInfoUseCase;
}
