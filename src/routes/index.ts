import Elysia from "elysia";
import { usersRoutes } from "./users";
import { appointmentsRoutes } from "./appointments";
import { barbersRoutes } from "./barbers";
import { healthCheckRoute } from "./health-check";

export const routes = new Elysia()
  .use(healthCheckRoute)
  .use(barbersRoutes)
  .use(appointmentsRoutes)
  .use(usersRoutes);
