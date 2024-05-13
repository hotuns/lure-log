export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const body = await readBody<{
    polygon: string; // 存储GeoJSON,多边形数据
    center: string; // 存储GeoJSON,中心点数据\
    description: string;
    tagIds: string[];
  }>(event);

  const { polygon, center, description, tagIds } = body;

  const newSpot = await prisma.fishSpot.create({
    data: {
      polygon,
      center,
      description,
      userId: id,
      tagIds,
    },
  });

  return Res({ fishspot: newSpot });
});
