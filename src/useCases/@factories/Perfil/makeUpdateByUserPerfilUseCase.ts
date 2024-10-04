import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { UpdateByUserPerfilUseCase } from "@/useCases/Perfil/updateByUserPerfilUseCase";

export function makeUpdateByUserPerfilUseCase() {
  const prismaPerfil = new PrismaPerfilRepository();
  const createPerfilUseCase = new UpdateByUserPerfilUseCase(prismaPerfil);

  return createPerfilUseCase;
}
