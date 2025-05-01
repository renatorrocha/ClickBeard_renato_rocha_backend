import { db } from "@/database";
import jwt from "@elysiajs/jwt";
import { Elysia } from "elysia";

export const isAuthenticated = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: Bun.env.JWT_SECRET!,
      })
    )
    .derive(async ({ jwt, headers, set }) => {
      const authHeader = headers["authorization"];

      if (!authHeader) {
        set.status = 401;
        throw new Error("Access token is missing");
      }

      const token = authHeader.split(" ")[1];

      const jwtPayload = await jwt.verify(token);
      if (!jwtPayload) {
        set.status = 403;
        throw new Error("Access token is invalid");
      }

      const userId = jwtPayload.sub;

      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        set.status = 404;
        throw new Error("User not found");
      }

      return { user };
    });
