import Elysia, { t } from "elysia";
import { createBarber, listBarbers } from "../services/barber.service";
import { isAuthenticated } from "@/middlewares/auth";

export const barbersRoutes = new Elysia({
  prefix: "/barbers",
  tags: ["barbers"],
})
  // .use(isAuthenticated)
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
  )
  .post(
    "/",
    async ({ body }) => {
console.log(body)
      const { name, document, specialities } = body;

      return await createBarber(name, document, specialities);
    },
    {
      body: t.Object({
        name: t.String(),
        document: t.String(),
        specialities: t.Array(t.String()),
      }),
    }
  );
