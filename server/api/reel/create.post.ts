import { Braking, ReelType } from "@prisma/client";

// 创建reel
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);
  const body = await readBody<{
    brand: string;
    model: string;
    type: ReelType;
    weight: number;
    gearRatio: number;
    braking: Braking;
  }>(event);

  const { brand, model, type, weight, gearRatio, braking } = body;
  const reel = await prisma.fishingReel.create({
    data: {
      brand,
      model,
      type,
      weight,
      gearRatio,
      braking,
      backpack: {
        connect: {
          userId: id,
        },
      },
    },
  });
  return Res({ reel });
});
