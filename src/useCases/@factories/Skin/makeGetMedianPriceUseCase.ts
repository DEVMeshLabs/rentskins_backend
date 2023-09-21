import { GetMedianPriceUseCase } from "@/useCases/Skin/getMedianPriceUseCase";

export function makeGetMedianPriceUseCase() {
  const getskinUseCase = new GetMedianPriceUseCase();
  return getskinUseCase;
}
