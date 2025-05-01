import Elysia from "elysia";
import { usersRoutes } from "./users";
import { appointmentsRoutes } from "./appointments";
import { barbersRoutes } from "./barbers";
import { healthCheckRoute } from "./health-check";
import { authRoutes } from "./auth";

export const routes = new Elysia()
  .use(healthCheckRoute)
  .use(authRoutes)
  .use(barbersRoutes)
  .use(appointmentsRoutes)
  .use(usersRoutes);
