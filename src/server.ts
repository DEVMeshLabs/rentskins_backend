import { app } from "./app";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { configSwagger } from "./plugins/swagger";
import cors from "@fastify/cors";
import { skinSwaggerRouter } from "./plugins/swagger/skins.swagger";

app.register(cors, {
  origin: true,
});

app.register(fastifySwagger, configSwagger.swaggerOptions);
app.register(fastifySwaggerUi, configSwagger.swaggerUiOptions);
app.register(skinSwaggerRouter);

app
  .listen({
    host: "0.0.0.0",
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
