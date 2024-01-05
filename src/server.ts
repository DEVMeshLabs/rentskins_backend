import { app } from "./app";
import { env } from "./env";
import cors from "@fastify/cors";
import GlobalOffensive from "globaloffensive";
import SteamUser from "steam-user";
import SteamCommunity from "steamcommunity";
export const user = new SteamUser();
export const csgo = new GlobalOffensive(user);
export const community = new SteamCommunity();
export const { checkout, webhooks, customers } = require("stripe")(
  env.STRIPE_SECRET_KEY
);

app.register(cors, {
  origin: true,
});

// -------------------------- FLOAT ------------------------------

user.logOn({
  accountName: "Rentskins1",
  password: "c03bca41b453d4c15c6e62c0e39892b3",
});

user.on("loggedOn", () => {
  console.log("ok");
  user.gamesPlayed(730);
  csgo.on("connectedToGC", async () => {
    console.log("Logado!");
  });
});

user.on("error", (err) => {
  console.log(err.message);
});

// --------------------------------------------------------

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running! ${env.PORT}`);
  });
