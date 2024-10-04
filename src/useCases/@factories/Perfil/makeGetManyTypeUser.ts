import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { GetManyTypeUserPerfilUseCase } from "@/useCases/Perfil/getManyTypeUserUseCase";

export function makeGetManyTypeUser() {
  const prismaPerfil = new PrismaPerfilRepository();
  const perfilInfoUseCase = new GetManyTypeUserPerfilUseCase(prismaPerfil);

  return perfilInfoUseCase;
}
