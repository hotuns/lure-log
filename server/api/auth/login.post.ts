import { User } from "@prisma/client";
import Joi from "joi";
import jwt from "jsonwebtoken";

// 登录
export default defineEventHandler(async (event) => {
  const body = await readBody<{
    phone?: string;
    password: string;
    username?: string;
  }>(event);

  const { phone, password, username } = body;
  // 用户名或者手机号必须有一个
  if (!phone && !username) {
    return Res(undefined, {
      success: false,
      message: "用户名或手机号必须有一个",
    });
  }

  const schema = Joi.object({
    phone: Joi.string().pattern(new RegExp("^[0-9]{11}$")),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
    username: Joi.string().alphanum().min(3).max(10),
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
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [
        {
          phone,
        },
        {
          username,
        },
      ],
    },
  });

  if (!userExists) {
    return Res(undefined, {
      success: false,
      message: "用户不存在",
    });
  }

  // 验证密码
  const verified = verify(password, userExists.password);
  if (!verified) {
    return Res(undefined, {
      success: false,
      message: "密码错误",
    });
  }

  const secret = process.env.JWT_SECRET || "secret";
  const expiresIn = process.env.EXPIRESIN || "3d";

  // jwt, 生成token
  const token = jwt.sign(
    {
      id: userExists.id,
      username: userExists.username,
      phone: userExists.phone,
    },
    secret,
    { expiresIn }
  );

  const { password: _password, ...userWithoutPassword } = userExists;
  return Res({
    token,
    user: userWithoutPassword,
  });
});
