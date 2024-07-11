import { app } from "./app";
import { env } from "./env";
import cors from "@fastify/cors";
import GlobalOffensive from "globaloffensive";
import SteamUser from "steam-user";
import SteamCommunity from "steamcommunity";
import job from "node-schedule";
import { makeCronJobProcessTransaction } from "./useCases/@factories/TransactionHistory/makeCronJobProcessTransaction";
// import { makeCronJobProcessRental } from "./useCases/@factories/RentalTransaction/makeCronJobRental";

export const user = new SteamUser();
export const csgo = new GlobalOffensive(user);
export const community = new SteamCommunity();
export const { checkout, webhooks, customers } = require("stripe")(
  env.STRIPE_SECRET_KEY
);

const makeCronJobTransaction = makeCronJobProcessTransaction();
// const makeCronJobRental = makeCronJobProcessRental();

job.scheduleJob("*/50 * * * *", async () => {
  await Promise.all([makeCronJobTransaction.execute()]);
});

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Acc"],
});

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running! ${env.PORT}`);
  });
