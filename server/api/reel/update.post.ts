import { Braking, ReelType } from "@prisma/client";

// 修改reel
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);
  const body = await readBody<{
    id: number;
    brand: string;
    model: string;
    type: ReelType;
    weight: number;
    gearRatio: number;
    braking: Braking;
  }>(event);

  const { id: reelId, brand, model, type, weight, gearRatio, braking } = body;
  const reel = await prisma.fishingReel.update({
    where: {
      id: reelId,
    },
    data: {
      brand,
      model,
      type,
      weight,
      gearRatio,
      braking,
    },
  });
  return Res({ reel });
});
