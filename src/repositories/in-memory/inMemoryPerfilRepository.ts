// import { Prisma } from "@prisma/client";
// import { IPerfilRepository } from "../interfaceRepository/IPerfilRepository";
// import { randomUUID } from "crypto";

// export class inMemoryPerfilRepository implements IPerfilRepository {
//   public perfil = [];
//   private notImplemented(): Promise<any> {
//     return Promise.resolve(null);
//   }

//   async create(data: Prisma.PerfilUncheckedCreateInput) {
//     const createdPerfil = {
//       id: data.id ?? randomUUID(),
//       owner_id: data.owner_id,
//       owner_name: data.owner_name,
//       owner_type: "Usuario",
//       owner_country: null,
//       account_status: "Ativo",
//       steam_level: null,
//       delivery_time: 0,
//       total_exchanges: 0,
//       total_exchanges_completed: 0,
//       reliability: "Sem informações",
//       steam_created_date: null,
//       picture: data.picture,
//       steam_url: data.steam_url,
//       createdAt: new Date(),
//       updatedAt: null,
//       deletedAt: null,
//     };

//     this.perfil.push(createdPerfil);
//     return createdPerfil;
//   }

//   findByUser(owner_id: string) {
//     return this.notImplemented();
//   }

//   findById(id: string) {
//     return this.notImplemented();
//   }

//   findManyTypeUser(owner_type: string) {
//     return this.notImplemented();
//   }

//   findByMany() {
//     return this.notImplemented();
//   }

//   findByStatus(id: string): Promise<any> {
//     return this.notImplemented();
//   }

//   findByUserNotDeleteAt(owner_id: string) {
//     return this.notImplemented();
//   }

//   updateById(id: string, data: Prisma.PerfilUncheckedCreateInput) {
//     return this.notImplemented();
//   }

//   updateByCart(owner_id: string, cart: string): Promise<any> {
//     return this.notImplemented();
//   }

//   updateLevel(id: string, steam_level: number) {
//     return this.notImplemented();
//   }

//   updateByUser(owner_id: string, data: any) {
//     return this.notImplemented();
//   }

//   updateByIdUser(id: string, data: any): Promise<any> {
//     return this.notImplemented();
//   }

//   deletePerfil(id: string, force: string) {
//     return this.notImplemented();
//   }

//   deletePerfilBanco(id: string) {
//     return this.notImplemented();
//   }
// }
