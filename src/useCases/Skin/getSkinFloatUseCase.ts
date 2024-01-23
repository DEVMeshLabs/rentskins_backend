import { env } from "@/env";
import axios from "axios";

export class GetSkinFloatUseCase {
  constructor() {}
  async execute(url: string) {
    const linkBase = "https://www.steamwebapi.com";
    const tratarUrl = url.split("%");
    const link = `${linkBase}/float/api/item?key=${env.KEY_STEAM_WEB_API}&url=steam%3A%2F%2Frungame%2F730%2F76561202255233023%2F%2Bcsgo_econ_action_preview%${tratarUrl[1]}`;
    const { data } = await axios.get(link);
    return data;
  }
}
