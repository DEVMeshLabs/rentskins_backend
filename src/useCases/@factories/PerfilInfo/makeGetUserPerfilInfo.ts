import { PrismaPerfilInfoRepository } from "@/repositories/Prisma/prismaPerfilInfoRepository";
import { GetUserPerfilInfoUseCase } from "@/useCases/Perfil/getUserPerfilInfoUseCase";

export function makeGetUserPerfilInfo() {
  const prismaPerfilInfo = new PrismaPerfilInfoRepository();
  const createPerfilInfoUseCase = new GetUserPerfilInfoUseCase(
    prismaPerfilInfo
  );

  return createPerfilInfoUseCase;
}
