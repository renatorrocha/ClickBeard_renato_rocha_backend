declare module "bun" {
  interface Env {
    JWT_SECRET: string;
    FRONTEND_URL: string;
    PORT: string;
  }
}