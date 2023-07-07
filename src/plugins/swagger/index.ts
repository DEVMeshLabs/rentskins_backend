import swaggerSchema from "../../swagger.json";
const swaggerOptions = {
  swagger: {
    info: {
      title: "RentSkins",
      description: "API RentSkins",
      version: "1.0.0",
    },
    host: "localhost",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
};

const swaggerUiOptions = {
  routePrefix: "/api",
  swagger: swaggerSchema,
  swaggerUiConfig: {
    deepLinking: true,
    displayOperationId: true,
  },
};

export const configSwagger = {
  swaggerOptions,
  swaggerUiOptions,
};
