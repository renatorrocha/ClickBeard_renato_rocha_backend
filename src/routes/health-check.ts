import Elysia from "elysia";

export const healthCheckRoute = new Elysia({
  prefix: "/health-check",
  tags: ["health-check"],
}).get(
  "/",
  async ({ set }) => {
    set.status = 200;
    return "OK";
  },
  {
    detail: {
      summary: "Health check",
      description: "Returns a 200 status code if the server is running",
    },
  }
);
