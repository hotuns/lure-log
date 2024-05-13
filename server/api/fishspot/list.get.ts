export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const spots = await prisma.fishSpot.findMany({
    where: {
      userId: id,
    },
  });

  return Res({ spots });
});
