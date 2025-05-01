import { Elysia } from "elysia";
import { jwt as jwtPlugin } from "@elysiajs/jwt";

export const jwt = new Elysia().use(
  jwtPlugin({
    name: "jwt",
    secret: Bun.env.JWT_SECRET!,
  })
);
