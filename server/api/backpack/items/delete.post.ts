// 删除背包内的rod or rell
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);
  const body = await readBody<{
    id: string;
    type: "rod" | "reel";
  }>(event);

  const { id: itemId, type } = body;

  if (type === "rod") {
    let r = await prisma.fishingRod.delete({
      where: {
        id: itemId,
      },
    });
  } else if (type === "reel") {
    let r = await prisma.fishingReel.delete({
      where: {
        id: itemId,
      },
    });
  }

  let backpack = await prisma.backpack.findUnique({
    where: {
      userId: id,
    },
  });
  return Res({ backpack });
});
