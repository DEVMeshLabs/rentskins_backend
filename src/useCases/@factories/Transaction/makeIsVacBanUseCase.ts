import { IsVacBanUseCase } from "@/useCases/Transaction/isVacBanUseCase";

export function makeIsVacBanUseCase() {
  const isvacBan = new IsVacBanUseCase();
  return isvacBan;
}
