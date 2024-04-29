// 获取rod列表
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);
  const query = getQuery<{
    limit: number;
    random: boolean;
  }>(event);

  const { limit, random } = query;

  let rods;
  if (random) {
    rods = await prisma.fishingRod.findMany({
      take: Number(limit),
      orderBy: {
        id: "desc",
      },
    });
  } else {
    rods = await prisma.fishingRod.findMany({
      take: Number(limit),
    });
  }
  return Res({ rods });
});
