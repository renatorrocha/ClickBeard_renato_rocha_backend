import { Static, t } from "elysia";

export const signInModel = t.Object({
  email: t.String(),
  password: t.String(),
});

export const signUpModel = t.Object({
  email: t.String(),
  password: t.String(),
  name: t.String(),
});

export type signInModelType = Static<typeof signInModel>;
export type signUpModelType = Static<typeof signUpModel>;
