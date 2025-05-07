import { db } from "@/database";
import type { loginModelType, registerModelType } from "@/models/auth";
import type { Context } from "elysia";

export const login = async (body: loginModelType, set: Context["set"]) => {
  const user = await db.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    set.status = 400;
    throw new Error("Email or password is incorrect");
  }

  const isPasswordValid = await Bun.password.verify(
    body.password,
    user.password
  );

  if (!isPasswordValid) {
    set.status = 400;
    throw new Error("Email or password is incorrect");
  }

  set.status = 200;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
};

export const register = async (body: registerModelType, set: Context["set"]) => {
  const userExist = await db.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (userExist) {
    set.status = 400;
    throw new Error("Email already exists");
  }

  const hashedPassword = await Bun.password.hash(body.password);

  const user = await db.user.create({
    data: {
      email: body.email,
      password: hashedPassword,
      name: body.name,
    },
  });

  set.status = 201;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
};
