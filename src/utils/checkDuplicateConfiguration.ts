import { ConfigurationAlreadyExistCpfError } from "@/useCases/@errors/Configuration/ConfigurationAlreadyExistCpfError";
import { Configuration } from "@prisma/client";

export function checkDuplicate(
  config: Configuration,
  field: string,
  value: string,
  errorMessage: string,
  owner_id: string
) {
  if (config[field] === value && config.owner_id !== owner_id) {
    throw new ConfigurationAlreadyExistCpfError(errorMessage);
  }
}
