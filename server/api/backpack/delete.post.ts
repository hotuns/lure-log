// 删除背包内的rod or rell
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);
  const body = await readBody<{
    id: number;
    type: "rod" | "reel";
  }>(event);

  const { id: itemId, type } = body;
  let backpack;
  if (type === "rod") {
    backpack = await prisma.backpack.update({
      where: {
        userId: id,
      },
      data: {
        fishingRods: {
          disconnect: {
            id: itemId,
          },
        },
      },
    });
  } else if (type === "reel") {
    backpack = await prisma.backpack.update({
      where: {
        userId: id,
      },
      data: {
        fishingReels: {
          disconnect: {
            id: itemId,
          },
        },
      },
    });
  }

  return Res("success", { backpack });
});
