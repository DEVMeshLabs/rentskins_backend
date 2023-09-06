export class SkinAlreadyExistsError extends Error {
  constructor(customer?: string) {
    super(`Skin ${customer !== undefined ? customer : ""} Already Exist`);
  }
}
