import { type Static, t } from "elysia";

export const loginModel = t.Object({
  email: t.String(),
  password: t.String(),
});

export const registerModel = t.Object({
  email: t.String(),
  password: t.String(),
  name: t.String(),
});

export type loginModelType = Static<typeof loginModel>;
export type registerModelType = Static<typeof registerModel>;
