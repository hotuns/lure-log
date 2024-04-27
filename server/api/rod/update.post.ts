import { Action, PowerValue } from "@prisma/client";

// 修改rod
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);
  const body = await readBody<{
    id: number;
    brand: string;
    model: string;
    length: number;
    sections: number;
    powerValue: PowerValue;
    action: Action;
  }>(event);

  const {
    id: rodId,
    brand,
    model,
    length,
    sections,
    powerValue,
    action,
  } = body;
  const rod = await prisma.fishingRod.update({
    where: {
      id: rodId,
    },
    data: {
      brand,
      model,
      length,
      sections,
      powerValue,
      action,
    },
  });

  return Res("success", { rod });
});
