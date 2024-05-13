export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const body = await readBody<{
    id: string;
    polygon: string;
    center: string;
    description?: string;
    tagIds: string[];
  }>(event);
  const { id: spotId, polygon, center, description, tagIds } = body;

  const spot = await prisma.fishSpot.update({
    where: {
      id: spotId,
    },
    data: {
      polygon,
      center,
      description,
      tagIds,
    },
  });

  return Res({ fishspot: spot });
});
