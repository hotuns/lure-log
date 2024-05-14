export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const body = await readBody<{
    id: string;
    polygon: string;
    center: string;
    description?: string;
    tagIds: string[];
    public: boolean;
  }>(event);
  const {
    id: spotId,
    polygon,
    center,
    description,
    tagIds,
    public: isPublic,
  } = body;

  const fishSpot = await prisma.fishSpot.update({
    where: {
      id: spotId,
    },
    data: {
      polygon,
      center,
      description,
      tagIds,
      public: isPublic,
    },
  });

  return Res({ fishSpot });
});
