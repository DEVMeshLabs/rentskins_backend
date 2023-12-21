import md5 from "md5";
export async function slug(
  skin_category: string,
  skin_weapon: string,
  assetId: string
): Promise<string> {
  const hash = await createdHash(assetId);

  // const formatText = market_name
  //   .replace(/\s+/g, "-")
  //   .replace(/\|/g, "")
  //   .replace(/[()]/g, "-")
  //   .replace(/--/g, "-")
  //   .replace(/-$/, "")
  //   .toLowerCase();

  return `${skin_category.toLowerCase()}-${skin_weapon.toLowerCase()}-${hash}`;
}

async function createdHash(assetId) {
  const createHash = await md5(assetId);
  return createHash;
}
