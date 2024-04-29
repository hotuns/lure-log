// 获取reel列表
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);
  const query = getQuery<{
    limit: number;
    random: boolean;
  }>(event);

  const { limit, random } = query;

  let reels;
  if (random) {
    reels = await prisma.fishingReel.findMany({
      take: limit,
      orderBy: {
        id: "desc",
      },
    });
  } else {
    reels = await prisma.fishingReel.findMany({
      take: limit,
    });
  }
  return Res({ reels });
});
