// 更新用户信息
export default defineEventHandler(async (event) => {
  const body = await readBody<{
    phone?: string;
    password?: string;
    username?: string;
    email?: string;
    avatar?: string;
  }>(event);
});
