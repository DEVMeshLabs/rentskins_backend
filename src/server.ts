import { app } from "./app";
import cors from "@fastify/cors";

app.register(cors, {
  origin: true,
});

app
  .listen({
    host: "0.0.0.0",
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
