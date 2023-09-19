import { Perfil, Prisma } from "@prisma/client";

export interface IPerfilRepository {
  create(data: Prisma.PerfilUncheckedCreateInput): Promise<Perfil>;
  findByUser(owner_id: string): Promise<Perfil | null>;
  findById(id: string): Promise<Perfil | null>;
  findManyTypeUser(owner_type: string): Promise<Perfil[]>;
  findByMany(): Promise<Perfil[]>;
  findByStatus(id: string): Promise<any>;
  updateById(
    id: string,
    data: Prisma.PerfilUncheckedCreateInput
  ): Promise<Perfil>;
  updateByCart(owner_id: string, cart: string): Promise<any>;
  updateLevel(id: string, steam_level: number): Promise<Perfil>;
  updateByUser(owner_id: string, data: any): Promise<Perfil>;
  updateByIdUser(id: string, data: any): Promise<any>;
  deletePerfil(id: string, force: string): Promise<Perfil>;
  deletePerfilBanco(id: string): Promise<Perfil>;
}
