import { app } from "./app";
import { env } from "./env";
import cors from "@fastify/cors";
import GlobalOffensive from "globaloffensive";
import SteamUser from "steam-user";
import SteamCommunity from "steamcommunity";
import job from "node-schedule";
import { makeCronJobProcessTransaction } from "./useCases/@factories/TransactionHistory/makeCronJobProcessTransaction";

export const user = new SteamUser();
export const csgo = new GlobalOffensive(user);
export const community = new SteamCommunity();
export const { checkout, webhooks, customers } = require("stripe")(
  env.STRIPE_SECRET_KEY
);

const makeTransaction = makeCronJobProcessTransaction();

job.scheduleJob("* * 1 * * *", async () => {
  try {
    await makeTransaction.execute();
  } catch (error) {
    console.log(error);
    return error;
  }
});

app.register(cors, {
  origin: true,
});

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running! ${env.PORT}`);
  });
