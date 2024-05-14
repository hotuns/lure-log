export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const body = await readBody<{
    time: string;
    description: string;
    comboId: string;
    fishSpotId: string;
    fishCatch: {
      speciesId: string;
      length: number;
      weight: number;
    };
  }>(event);

  const { time, description, comboId, fishSpotId, fishCatch } = body;

  const newFishCatch = await prisma.fishCatch.create({
    data: {
      speciesId: fishCatch.speciesId,
      length: fishCatch.length,
      weight: fishCatch.weight,
    },
  });

  const record = await prisma.record.create({
    data: {
      time,
      description,
      userId: id,
      comboId,
      fishSpotId,
      fishCatchId: newFishCatch.id,
    },
  });

  return Res({ record });
});
