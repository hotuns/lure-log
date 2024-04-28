import Joi from "joi";

// 更新用户信息
export default defineEventHandler(async (event) => {
  const body = await readBody<{
    phone?: string;
    username?: string;
    email?: string;
    avatar?: string;
  }>(event);

  const { phone, username, email, avatar } = body;

  const schema = Joi.object({
    phone: Joi.string().pattern(new RegExp("^[0-9]{11}$")).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email(),
    avatar: Joi.string(),
  });

  try {
    await schema.validateAsync(body);
  } catch (error: any) {
    return Res("failed", {}, "参数错误", error.details);
  }

  let u = getAuth(event);
  // 更新用户信息

  const user = await prisma.user.update({
    where: {
      id: u.id,
    },
    data: {
      phone,
      username,
      email,
      avatar,
    },
  });

  const userWithoutPassword = { ...user, password: undefined };

  return Res("success", { user: userWithoutPassword });
});
