// 获取鱼竿，用关键词搜索
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const query = getQuery(event);
  const keyword = query.keyword as string;

  //   brand, model 包含关键词
  const rods = await prisma.fishingRod.findMany({
    where: {
      OR: [
        {
          brand: {
            contains: keyword,
          },
        },
        {
          model: {
            contains: keyword,
          },
        },
      ],
    },
  });
  return Res({ rods });
});
