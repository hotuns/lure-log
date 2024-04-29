// 获取我的combo组合列表
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const combos = await prisma.combo.findMany({
    where: {
      userId: id,
    },
    include: {
      fishingRod: true,
      fishingReel: true,
    },
  });
  return Res({ combos });
});
