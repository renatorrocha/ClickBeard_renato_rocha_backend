import Elysia from "elysia";
import { swagger } from "@/plugins/swagger";
import { routes } from "@/routes";
import { jwt } from "@/plugins/jwt";

export const app = new Elysia()
  .use(swagger)
  .use(jwt)
  .use(routes)

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
