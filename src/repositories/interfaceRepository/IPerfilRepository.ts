import { Perfil, Prisma } from "@prisma/client";

export interface IPerfilRepository {
  create(data: Prisma.PerfilUncheckedCreateInput): Promise<Perfil>;
  findByUser(owner_id: string): Promise<Perfil | null>;
  findById(id: string): Promise<Perfil | null>;
  findManyTypeUser(owner_type: string): Promise<Perfil[]>;
  findByMany(): Promise<Perfil[]>;
  findByStatus(id: string): Promise<any>;
  updateById(id: string, data: Prisma.PerfilUpdateInput): Promise<Perfil>;
  updateLevel(id: string, steam_level: number): Promise<Perfil>;
  deletePerfil(id: string): Promise<Perfil>;
}
