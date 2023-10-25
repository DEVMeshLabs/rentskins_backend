import { Perfil, Prisma } from "@prisma/client";
import { IPerfilRepository } from "../interfaceRepository/IPerfilRepository";
import { randomUUID } from "crypto";

export class InMemoryPerfilRepository implements IPerfilRepository {
  public perfil: Perfil[] = [];
  private notImplemented(): Promise<any> {
    return Promise.resolve(null);
  }

  async create(data: Prisma.PerfilUncheckedCreateInput) {
    const createdPerfil = {
      id: data.id ?? randomUUID(),
      owner_id: data.owner_id,
      owner_name: data.owner_name,
      owner_type: "Usuario",
      owner_country: null,
      account_status: "Ativo",
      steam_level: null,
      delivery_time: "",
      total_exchanges: 0,
      total_exchanges_completed: 0,
      reliability: "Sem informações",
      steam_created_date: null,
      picture: data.picture,
      steam_url: data.steam_url,
      configurationId: data.configurationId,
      stripe_id: null,
      cart_id: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    this.perfil.push(createdPerfil);
    return createdPerfil;
  }

  async findByUser(owner_id: string): Promise<Perfil | null> {
    const getUser = this.perfil.find((item) => item.owner_id === owner_id);
    return getUser;
  }

  findById(id: string) {
    return this.notImplemented();
  }

  findManyTypeUser(owner_type: string) {
    return this.notImplemented();
  }

  findByMany() {
    return this.notImplemented();
  }

  findByStatus(id: string): Promise<any> {
    return this.notImplemented();
  }

  findByUserNotDeleteAt(owner_id: string) {
    return this.notImplemented();
  }

  updateById(id: string, data: Prisma.PerfilUncheckedCreateInput) {
    return this.notImplemented();
  }

  updateByCart(owner_id: string, cart: string): Promise<any> {
    return this.notImplemented();
  }

  updateLevel(id: string, steam_level: number) {
    return this.notImplemented();
  }

  // updateByUser
  async updateByUser(owner_id: string, data: any) {
    const userProfileIndex = this.perfil.findIndex(
      (item) => item.owner_id === owner_id
    );

    if (userProfileIndex !== -1) {
      this.perfil[userProfileIndex] = {
        ...this.perfil[userProfileIndex],
        ...data,
      };
    }

    return this.perfil[userProfileIndex];
  }

  updateByIdUser(id: string, data: any): Promise<any> {
    return this.notImplemented();
  }

  deletePerfil(id: string, force: string) {
    return this.notImplemented();
  }

  deletePerfilBanco(id: string) {
    return this.notImplemented();
  }
}