import Elysia from "elysia";
import { listBarbers } from "../services/barber.service";

export const barbersRoutes = new Elysia({ prefix: "/barbers" }).get(
  "/",
  async () => {
    return await listBarbers();
  }
);
