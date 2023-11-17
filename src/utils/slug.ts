import md5 from "md5";
export async function slug(
  market_name: string,
  assetId: string
): Promise<string> {
  const hash = await createdHash(assetId);

  const formatText = market_name
    .replace(/\s+/g, "-")
    .replace(/\|/g, "")
    .replace(/[()]/g, "-")
    .replace(/--/g, "-")
    .replace(/-$/, "")
    .toLowerCase();
  return `${formatText}/${hash}`;
}

async function createdHash(assetId) {
  const createHash = await md5(assetId);
  return createHash;
}
