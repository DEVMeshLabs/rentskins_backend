import { Perfil, Prisma } from "@prisma/client";

export interface IPerfilRepository {
  create(data: Prisma.PerfilUncheckedCreateInput): Promise<Perfil>;
  findByUser(owner_id: string): Promise<Perfil | null>;
  findByUsers(owner_ids: string[]): Promise<Perfil | null>;
  findById(id: string): Promise<Perfil | null>;
  findManyTypeUser(owner_type: string): Promise<Perfil[]>;
  findByMany(): Promise<Perfil[]>;
  findByStatus(id: string): Promise<any>;
  findByUserNotDeleteAt(owner_id: string): Promise<Perfil>;
  updateById(
    id: string,
    data: Prisma.PerfilUncheckedCreateInput
  ): Promise<Perfil>;
  updateByCart(owner_id: string, cart: string): Promise<any>;
  updateByUser(
    owner_id: string,
    data: Prisma.PerfilUncheckedUpdateInput
  ): Promise<Perfil>;
  updateByIdUser(id: string, data: any): Promise<any>;
  updateTotalExchanges(buyerIds: string[]): Promise<any>;
  deletePerfil(id: string): Promise<Perfil>;
  deletePerfilBanco(id: string): Promise<Perfil>;
}
