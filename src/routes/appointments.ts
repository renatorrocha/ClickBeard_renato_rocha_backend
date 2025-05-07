import { appointmentModel } from '@/models/appointment';
import { cancelAppointment, createAppointment, listAppointments, listAppointmentsByUser } from '@/services/appointments.service';
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
  ).delete(
    "/:id",
    async ({ params }) => {
      return await cancelAppointment(params.id);
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        summary: "Cancel an appointment",
        description: "Cancel an appointment",
      },
    }
  ).get(
    "/:id",
    async ({ params }) => {
      return await listAppointmentsByUser(params.id);
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        summary: "Get appointments by user",
        description: "Get appointments by user",
      },
    }
  );
