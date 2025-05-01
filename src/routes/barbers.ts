import Elysia from "elysia";
import { listBarbers } from "../services/barber.service";

export const barbersRoutes = new Elysia({
  prefix: "/barbers",
  tags: ["barbers"],
}).get(
  "/",
  async () => {
    return await listBarbers();
  },
  {
    detail: {
      summary: "List all barbers",
      description: "Returns a list of all barbers",
    },
  }
);
