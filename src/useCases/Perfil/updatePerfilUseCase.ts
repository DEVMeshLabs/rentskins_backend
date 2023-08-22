// import { Perfil, Prisma } from "@prisma/client";
// import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
// import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

// export class UpdatePerfilUseCase {
//   constructor(private perfilRepository: IPerfilRepository) {}

//   async execute(
//     id: string,
//     date: Prisma.PerfilUncheckedUpdateManyInput
//   ): Promise<Perfil> {
//     const findId = await this.perfilRepository.findById(id);

//     if (!findId) {
//       throw new PerfilNotExistError();
//     }

//     const updatePerfil = await this.perfilRepository.updateById(id, {
//       ...date,
//     });

//     return updatePerfil;
//   }
// }
