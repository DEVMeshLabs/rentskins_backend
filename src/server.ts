import GlobalOffensive from "globaloffensive";
import cors from "@fastify/cors";
import SteamUser from "steam-user";
import { app } from "./app";
import { env } from "./env";
export const user = new SteamUser();
export const csgo = new GlobalOffensive(user);

app.register(cors, {
  origin: true,
});

user.logOn({
  accountName: env.STEAM_USERNAME,
  password: env.STEAM_PASSWORD,
});

user.on("loggedOn", () => {
  user.gamesPlayed(730);
  csgo.on("connectedToGC", async () => {
    console.log("Logado!");
  });
});

app
  .listen({
    host: "0.0.0.0",
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
