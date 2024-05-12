export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const body = await readBody<{
    id: string;
  }>(event);
  const { id: recordId } = body;

  await prisma.fishCatch.deleteMany({
    where: {
      Record: {
        id: recordId,
      },
    },
  });

  const record = await prisma.record.delete({
    where: {
      id: recordId,
    },
  });

  return Res({ record });
});
