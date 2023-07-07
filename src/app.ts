import fastify from "fastify";
import { skinRouter } from "./http/controllers/Skins/routes";

export const app = fastify({ logger: true });

app.register(skinRouter);
