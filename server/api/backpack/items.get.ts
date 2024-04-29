// 获取背包内所有物品
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);
  const backpack = await prisma.backpack.findUnique({
    where: {
      userId: id,
    },
    include: {
      fishingRods: true,
      fishingReels: true,
    },
  });

  return Res({ backpack });
});
