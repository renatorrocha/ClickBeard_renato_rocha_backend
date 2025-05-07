import Elysia, { t } from "elysia";
import { createBarber, deleteBarber, getBarber, listBarbers, updateBarber } from "../services/barber.service";
import { isAuthenticated } from "@/middlewares/auth";

export const barbersRoutes = new Elysia({
  prefix: "/barbers",
  tags: ["barbers"],
})
  .use(isAuthenticated)
  .get(
    "/",
    async ({ query }) => {
      return await listBarbers(query.specialtyId);
    },
    {
      query: t.Object({
        specialtyId: t.Optional(t.String()),
      }),
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
  ).delete(
    "/:id",
    async ({ params }) => {
      return await deleteBarber(params.id);
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        summary: "Delete a barber",
        description: "Deletes a barber with the given id",
      },
    }
  ).put(
    "/:id",
    async ({ params, body }) => {
      return await updateBarber(params.id, body);
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        name: t.String(),
        document: t.String(),
        specialties: t.Array(t.String()),
      }),
      detail: {
        summary: "Update a barber",
        description: "Updates a barber with the given id",
      },
    }
  ).get(
    "/:id",
    async ({ params }) => {
      return await getBarber(params.id);
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        summary: "Get a barber",
        description: "Returns a barber with the given id",
      },
    }
  );
