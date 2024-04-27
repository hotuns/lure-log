// 获取卷线器，用关键词搜索
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const keyword = getRouterParam(event, "keyword");

  //   brand, model 包含关键词
  const reels = await prisma.fishingReel.findMany({
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

  return Res("success", { reels });
});
