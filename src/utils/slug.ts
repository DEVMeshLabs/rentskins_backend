import md5 from "md5";
export async function slug(
  skin_category: string,
  skin_weapon: string,
  assetId: string
): Promise<string> {
  const hash = await createdHash(assetId);

  const returnSlug = `${skin_category}-${skin_weapon}-${hash}`;

  const formatText = returnSlug
    .replace(/\s+/g, "-")
    .replace(/\|/g, "")
    .replace(/\//g, "-")
    .replace(/[()]/g, "-")
    .replace(/--/g, "-")
    .replace(/-$/, "")
    .toLowerCase();

  return formatText;
}

async function createdHash(assetId) {
  const createHash = await md5(assetId);
  return createHash;
}
