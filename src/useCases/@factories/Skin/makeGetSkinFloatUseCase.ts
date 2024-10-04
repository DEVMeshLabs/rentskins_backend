import { GetSkinFloatUseCase } from "@/useCases/Skin/getSkinFloatUseCase";

export function makeGetSkinFloatUseCase() {
  const getSkinFloatUseCase = new GetSkinFloatUseCase();

  return getSkinFloatUseCase;
}
