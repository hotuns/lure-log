import type { User } from "@prisma/client";
import Joi from "joi";
export default defineEventHandler(async (event) => {
  const body = await readBody<{
    phone: string;
    password: string;
    username: string;
    email?: string;
  }>(event);

  const { phone, password, username, email } = body;

  const schema = Joi.object({
    phone: Joi.string().pattern(new RegExp("^[0-9]{11}$")),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
    username: Joi.string().alphanum().min(3).max(10).required(),
    email: Joi.string().email(),
  });

  try {
    await schema.validateAsync(body);
  } catch (error: any) {
    return Res(error.details, {
      success: false,
      message: "参数错误",
    });
  }

  // 判断是否存在
  const userExists = await prisma.user.findUnique({
    where: {
      phone,
    },
  });

  if (userExists) {
    return Res(undefined, {
      success: false,
      message: "用户已存在",
    });
  }

  // 用户user
  const user = await prisma.user.create({
    data: {
      phone,
      password: hash(password),
      username,
      email,
      backpack: {
        create: {},
      },
    },
  });

  const { password: _password, ...userWithoutPassword } = user;
  return Res({ user: userWithoutPassword });
});
