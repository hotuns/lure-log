export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const query = getQuery(event);
  const hasTags = query.hasTags === "true";
  const hasRecords = query.hasRecords === "true";

  const fishSpots = await prisma.fishSpot.findMany({
    where: {
      userId: id,
    },
    include: {
      tags: hasTags,
      records: hasRecords,
    },
  });

  return Res({ fishSpots });
});
