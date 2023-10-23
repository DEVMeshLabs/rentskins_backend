import { Prisma } from "@prisma/client";
import { ISkinsRepository } from "../interfaceRepository/ISkinsRepository";
import { randomUUID } from "crypto";

export class InMemorySkinRepository implements ISkinsRepository {
  public skins = [];

  private notImplemented(): Promise<any> {
    return Promise.resolve(null);
  }

  findBySearch(search: string, type: string, page: number, pageSize: number) {
    return this.notImplemented();
  }

  findById(id: string): Promise<any> {
    return this.notImplemented();
  }

  findBySeller(seller_id: string): Promise<any> {
    return this.notImplemented();
  }

  findByMany(page: number, pageSize: number): Promise<any> {
    return this.notImplemented();
  }

  findByManyWeapon(skin_weapon: string): Promise<any> {
    return this.notImplemented();
  }

  findByManyCategory(skin_category: string): Promise<any> {
    return this.notImplemented();
  }

  async findManyAssent(): Promise<any> {
    const allSkins = this.skins.filter(
      (skin) => skin.status === null && skin.deletedAt === null
    );
    console.log(allSkins);
    return allSkins;
  }

  findByManySeller(
    seller_id: string,
    page: number,
    pageSize: number,
    deletedAt: string
  ): Promise<any> {
    return this.notImplemented();
  }

  findByCountSkins(): Promise<number> {
    return this.notImplemented();
  }

  findByCountSellers(seller_id: string): Promise<number> {
    return this.notImplemented();
  }

  findByCountSearch(search: string): Promise<number> {
    return this.notImplemented();
  }

  updateById(id: string, data: Prisma.SkinUpdateInput): Promise<any> {
    return this.notImplemented();
  }

  async create(data: Prisma.SkinCreateManyInput) {
    const skin = {
      id: data.id ?? randomUUID(),
      asset_id: data.asset_id,
      skin_image: data.skin_image,
      skin_name: data.skin_name,
      skin_category: data.skin_category,
      skin_weapon: data.skin_weapon,
      skin_price: data.skin_price,
      skin_float: data.skin_float,
      median_price: data.median_price,
      seller_name: data.seller_name,
      seller_id: data.seller_id,
      skin_rarity: data.skin_rarity,
      status: null,
      sale_type: data.sale_type,
      status_float: data.status_float,
      skin_link_game: "/",
      skin_link_steam: "/",
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    this.skins.push(skin);

    return skin;
  }

  deleteSkin(id: string): Promise<any> {
    return this.notImplemented();
  }
}
