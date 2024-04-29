import { Action, PowerValue } from "@prisma/client";

// 创建rod
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const body = await readBody<{
    brand: string;
    model: string;
    length: number;
    sections: number;
    powerValue: PowerValue;
    action: Action;
  }>(event);

  const { brand, model, length, sections, powerValue, action } = body;

  // 创建并加入到背包
  const rod = await prisma.fishingRod.create({
    data: {
      brand,
      model,
      length,
      sections,
      powerValue,
      action,
      backpack: {
        connect: {
          userId: id,
        },
      },
    },
  });
  return Res({ rod });
});
