import Elysia, { t } from "elysia";
import { signIn, signUp } from "../services/auth.service";
import { signInModel, signUpModel } from "../models/auth";
import jwt from "@elysiajs/jwt";

export const authRoutes = new Elysia({
  prefix: "/auth",
  tags: ["auth"],
})
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.JWT_SECRET!,
    })
  )
  .post(
    "/sign-in",
    async ({ body, jwt, set }) => {
      const payload = await signIn(body, set);

      const accessToken = await jwt.sign({
        sub: payload.id,
        role: payload.role,
      });

      return {
        accessToken: accessToken,
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
    async ({ body, set }) => {
      const user = await signUp(body, set);

      return {
        user: user,
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
