// 背包内新增物品
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);
  const body = await readBody<{
    type: "rod" | "reel";
    id: number;
  }>(event);

  const { type, id: itemId } = body;
  let backpack;
  if (type === "rod") {
    backpack = await prisma.backpack.update({
      where: {
        userId: id,
      },
      data: {
        fishingRods: {
          connect: {
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
          connect: {
            id: itemId,
          },
        },
      },
    });
  }

  return Res("success", { backpack });
});
