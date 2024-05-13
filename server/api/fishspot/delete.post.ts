export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const body = await readBody<{
    id: string;
  }>(event);
  const { id: spotId } = body;

  await prisma.fishspot.delete({
    where: {
      id: spotId,
    },
  });

  return Res({});
});
