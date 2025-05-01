import { barbersRoutes } from "./routes/barbers";
import { appointmentsRoutes } from "./routes/appointments";
import { usersRoutes } from "./routes/users";
import Elysia from "elysia";

export const app = new Elysia()
  .get("/health-check", () => "OK")

  .use(barbersRoutes)

  .use(appointmentsRoutes)

  .use(usersRoutes);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
