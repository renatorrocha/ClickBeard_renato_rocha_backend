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
    async ({ body, set }) => {
      const { name, document, specialties } = body;

      const barber = await createBarber({ name, document, specialties }, set);

      return {
        id: barber.id,
        name: barber.name,
        document: barber.document,
      };
    },
    {
      body: t.Object({
        name: t.String(),
        document: t.String(),
        specialties: t.Array(t.String()),
      }),
      detail: {
        summary: "Create a new barber",
        description: "Creates a new barber with the given name, document, and specialties",
      },
    }
  );
