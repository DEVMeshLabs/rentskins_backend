import axios from "axios";

export async function validInventory(owner_id: string) {
  const isValidEnv =
    process.env.NODE_ENV === "production"
      ? "https://api-rentskin-backend-on.onrender.com"
      : "http://localhost:3333";

  const inventario = await axios
    .get(`${isValidEnv}/v1/skins/inventory/${owner_id}`)
    .then((response) => response.data)
    .catch((err) => err.message);

  if (inventario.length <= 0) {
    return false;
  }

  return inventario;
}
