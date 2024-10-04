import { Prisma, Skin } from "@prisma/client";
import { ISkinsRepository } from "../interfaceRepository/ISkinsRepository";
import { randomUUID } from "crypto";

export class InMemorySkinRepository implements ISkinsRepository {
  async findBySlug(slug: string) {
    return this.notImplemented();
  }

  async findLastSellerSkins(name: string) {
    return this.notImplemented();
  }

  public skins: Skin[] = [];

  private notImplemented(): Promise<any> {
    return Promise.resolve(null);
  }

  findBySearch(search: string, type: string, page: number, pageSize: number) {
    return this.notImplemented();
  }

  async findById(id: string): Promise<any> {
    const getSkin = this.skins.find((item) => item.id === id);
    return getSkin;
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
    return allSkins;
  }

  async findByManySeller(seller_id: string, deletedAt: string): Promise<any> {
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

  async updateById(id: string, data: any) {
    const skinsIndex = this.skins.findIndex((item) => item.id === id);

    if (skinsIndex !== -1) {
      this.skins[skinsIndex] = {
        ...this.skins[skinsIndex],
        ...data,
      };
    }

    return this.skins[skinsIndex];
  }

  async create(data: Prisma.SkinCreateManyInput) {
    const skin: Skin = {
      id: data.id ?? randomUUID(),
      asset_id: data.asset_id,
      skin_image: data.skin_image,
      skin_name: data.skin_name,
      skin_market_hash_name: data.skin_market_hash_name ?? "",
      skin_paintseed: data.skin_paintseed ?? 0,
      skin_classid: data.skin_classid ?? "",
      skin_instanceid: data.skin_instanceid ?? "",
      skin_category: data.skin_category,
      skin_weapon: data.skin_weapon,
      skin_price: data.skin_price,
      skin_float: data.skin_float,
      skin_wear: data.skin_wear ?? "", // Add the skin_wear property
      seller_name: data.seller_name,
      seller_id: data.seller_id,
      skin_rarity: data.skin_rarity,
      status: null,
      saledAt: null,
      slug: "",
      sale_type: [],
      skin_border_color: data.skin_border_color ?? "",
      skin_color: data.skin_color ?? "",
      pricesafe7d: data.pricesafe7d ?? 0,
      status_float: data.status_float,
      skin_stickers: (data.skin_stickers as any) ?? null,
      skin_link_game: "/",
      skin_link_steam: "/",
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      rentalTransactionId: data.rentalTransactionId ?? "",
      transactionHistoryId: data.transactionHistoryId ?? "",
    };

    this.skins.push(skin);
    return skin;
  }

  updateMany(skinsIds: string[], status: string): Promise<any> {
    return new Promise((resolve) => {
      const updatedSkins = skinsIds.map((item) => {
        const skinsIndex = this.skins.findIndex((skin) => skin.id === item);
        return (this.skins[skinsIndex] = {
          ...this.skins[skinsIndex],
          status,
        });
      });
      resolve(updatedSkins);
    });
  }

  findManySkins(skinsIds: string[]): Promise<Skin[]> {
    const foundSkins = this.skins.filter((skin) => skinsIds.includes(skin.id));
    return Promise.resolve(foundSkins);
  }

  deleteSkin(id: string): Promise<any> {
    return this.notImplemented();
  }
}
