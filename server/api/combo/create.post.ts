// 创建combo组合
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);
  const body = await readBody<{
    name: string;
    rodId: number;
    reelId: number;
  }>(event);

  const { rodId, reelId, name } = body;

  const combo = await prisma.combo.create({
    data: {
      name,
      user: {
        connect: {
          id,
        },
      },
      fishingRod: {
        connect: {
          id: rodId,
        },
      },
      fishingReel: {
        connect: {
          id: reelId,
        },
      },
    },
  });

  return Res("success", { combo });
});
