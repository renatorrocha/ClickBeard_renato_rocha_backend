import { swagger as swaggerElysia } from "@elysiajs/swagger";

export const swagger = swaggerElysia({
  documentation: {
    info: {
      title: "ClickBeard API",
      version: "1.0.0",
      description: "API for the ClickBeard app",
    },
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
