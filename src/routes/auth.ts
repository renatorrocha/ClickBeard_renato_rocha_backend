import Elysia from "elysia";
import { login, register } from "../services/auth.service";
import { loginModel, registerModel } from "../models/auth";
import jwt from "@elysiajs/jwt";

export const authRoutes = new Elysia({
  prefix: "/auth",
  tags: ["auth"],
})
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.JWT_SECRET,
    })
  )
  .post(
    "/login",
    async ({ body, jwt, set }) => {
      const payload = await login(body, set);

      const accessToken = await jwt.sign({
        sub: payload.id,
        role: payload.role,
      });

      return {
        user: {
          id: payload.id,
          email: payload.email,
          name: payload.name,
          role: payload.role,
          token: accessToken,
        },
      };
    },
    {
      body: loginModel,
      detail: {
        summary: "Login",
        description: "Login to the application",
      },
    }
  )
  .post(
    "/register",
    async ({ body, set }) => {
      const user = await register(body, set);

      return {
        user: user,
      };
    },
    {
      body: registerModel,
      detail: {
        summary: "Register",
        description: "Register to the application",
      },
    }
  );
