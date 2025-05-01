import { barbersRoutes } from "./routes/barbers";
import { appointmentsRoutes } from "./routes/appointments";
import { usersRoutes } from "./routes/users";
import Elysia from "elysia";
import { swagger } from "./plugins/swagger";
import { routes } from "./routes";

export const app = new Elysia()
  .use(swagger)


  .use(routes)

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
