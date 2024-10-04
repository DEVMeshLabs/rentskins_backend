import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      name: string;
      email: string;
      image: string;
      ownerId: string;
    };
  }
}
