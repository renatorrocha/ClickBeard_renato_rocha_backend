import { db } from "@/database";
import { signUpModelType } from "@/models/auth";

export const signIn = async (email: string, password: string) => {
  const jwtToken = "123";
  return jwtToken;
};

export const signUp = async (body: signUpModelType) => {
  const userExist = await db.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (userExist) {
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

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
};
