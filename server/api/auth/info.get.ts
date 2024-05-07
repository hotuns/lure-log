// 获取用户信息
export default defineEventHandler(async (event) => {
  const query = getQuery<{
    id?: string;
    backpack?: boolean;
  }>(event);

  let { id, backpack } = query;
  if (!id) {
    let u = getAuth(event);
    id = u.id;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      backpack: backpack,
    },
  });

  return Res({ user });
});
