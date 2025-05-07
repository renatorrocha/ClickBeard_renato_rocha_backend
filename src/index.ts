import Elysia from "elysia";
import { swagger } from "@/plugins/swagger";
import { routes } from "@/routes";
import { jwt } from "@/plugins/jwt";
import cors from '@elysiajs/cors';
import { logger } from '@grotto/logysia';

export const app = new Elysia()
  .use(swagger)
  .use(jwt)
  .use(logger())
  .use(
    cors({
      origin: [Bun.env.FRONTEND_URL || 'http://localhost:5173'],
      credentials: true,
    })
  )
  .use(routes)

  .listen(Bun.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
