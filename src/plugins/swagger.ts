import { swagger as swaggerElysia } from "@elysiajs/swagger";

export const swagger = swaggerElysia({
  documentation: {
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});
