import Elysia, { t } from "elysia";
import { signIn, signUp } from "../services/auth.service";
import { signInModel, signUpModel } from "../models/auth";

export const authRoutes = new Elysia({
  prefix: "/auth",
  tags: ["auth"],
})
  .post(
    "/sign-in",
    async ({ body }) => {
      const payload = await signIn(body.email, body.password);

      return {
        token: payload,
      };
    },
    {
      body: signInModel,
      detail: {
        summary: "Sign in",
        description: "Sign in to the application",
      },
    }
  )
  .post(
    "/sign-up",
    async ({ body }) => {
      const payload = await signUp(body.email, body.password, body.name);

      return {
        token: payload,
      };
    },
    {
      body: signUpModel,
      detail: {
        summary: "Sign up",
        description: "Sign up to the application",
      },
    }
  );
