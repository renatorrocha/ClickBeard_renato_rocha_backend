import { appointmentModel } from '@/models/appointment';
import { createAppointment, listAppointments } from '@/services/appointments.service';
import Elysia, { t } from "elysia";

export const appointmentsRoutes = new Elysia({
  prefix: "/appointments",
  tags: ["appointments"],
})
  .get(
    "/",
    async () => {
      return await listAppointments();
    },
    {
      detail: {
        summary: "Get all appointments",
        description: "Get all appointments",
      },
    }
  ).post(
    "/",
    async ({ body, set }) => {
      return await createAppointment(body, set);
    },
    {
      body: appointmentModel,
      detail: {
        summary: "Create an appointment",
        description: "Create an appointment",
      },
    }
  );
