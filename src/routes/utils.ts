import { db } from '@/database';
import Elysia, { t } from "elysia";

export const utilsRoutes = new Elysia({ prefix: "/utils", tags: ["utils"] })

.get("/specialties", async () => {
  const specialties = await db.specialties.findMany();
  return specialties;
}, {
  response: {
    200: t.Array(t.Object({
      id: t.String(),
      label: t.String(),
    })),
  },
  detail: {
    summary: "List all specialties",
    description: "Returns a list of all specialties",
  },
});
