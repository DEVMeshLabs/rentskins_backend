import { env } from "@/env";
import axios from "axios";
import { SkinFloatUnauthorizedError } from "../@errors/Skin/skinFloatUnauthorizedError";
import { SkinFloatNoCreditsError } from "../@errors/Skin/SkinFloatNoCreditsError";
import { SkinFloatInvalidParametersLinkError } from "../@errors/Skin/SkinFloatInvalidParametersLinkError";
import { SkinFloatCantGetFloatError } from "../@errors/Skin/SkinFloatCantGetFloatError";
// ${env.KEY_STEAM_WEB_API}
export class GetSkinFloatUseCase {
  constructor() {}
  async execute(url: string) {
    try {
      const linkBase = "https://www.steamwebapi.com";
      const tratarUrl = url.split("%");
      const link = `${linkBase}/float/api/item?key=${env.KEY_STEAM_WEB_API}&url=steam%3A%2F%2Frungame%2F730%2F76561202255233023%2F%2Bcsgo_econ_action_preview%${tratarUrl[1]}`;
      const response = await axios.get(link).then((res) => res.data);
      return response;
    } catch (error) {
      if (error.response.status === 401) {
        throw new SkinFloatUnauthorizedError();
      } else if (error.response.status === 402) {
        throw new SkinFloatNoCreditsError();
      } else if (error.response.status === 406) {
        throw new SkinFloatInvalidParametersLinkError();
      } else if (error.response.status === 417) {
        throw new SkinFloatCantGetFloatError();
      }
    }
  }
}
