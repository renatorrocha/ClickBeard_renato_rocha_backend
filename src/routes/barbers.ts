import Elysia from "elysia";
import { listBarbers } from "../services/barber.service";
import { isAuthenticated } from "@/middlewares/auth";

export const barbersRoutes = new Elysia({
  prefix: "/barbers",
  tags: ["barbers"],
})
  .use(isAuthenticated)
  .get(
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
