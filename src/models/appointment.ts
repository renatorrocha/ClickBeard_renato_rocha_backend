import { Static, t } from "elysia";

export const appointmentModel = t.Object({
  date: t.String(),
  specialtyId: t.String(),
  userId: t.String(),
  barberId: t.String(),
});


export type appointmentModelType = Static<typeof appointmentModel>;
