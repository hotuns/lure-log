export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const records = await prisma.record.findMany({
    where: {
      userId: id,
    },
  });

  return Res({ records });
});
