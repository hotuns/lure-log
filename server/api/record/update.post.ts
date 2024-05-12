import { Record } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const body = await readBody<{
    id: string;
    time: string;
    description: string;
    comboId: string;
    fishingSpotId: string;
    fishCatch: {
      id: string;
      speciesId: string;
      length: number;
      weight: number;
    };
  }>(event);

  const {
    id: recordId,
    time,
    description,
    comboId,
    fishingSpotId,
    fishCatch,
  } = body;

  const newFishCatch = await prisma.fishCatch.update({
    where: {
      id: fishCatch.id,
    },
    data: {
      speciesId: fishCatch.speciesId,
      length: fishCatch.length,
      weight: fishCatch.weight,
    },
  });

  const record = await prisma.record.update({
    where: {
      id: recordId,
    },
    data: {
      time,
      description,
      comboId,
      fishingSpotId,
    },
  });

  return Res({ record });
});
