// delete
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const body = await readBody<{ id: string }>(event);
  const { id: fishSpecieId } = body;

  const fishSpecie = await prisma.fishSpecies.delete({
    where: {
      id: fishSpecieId,
    },
  });

  return Res({ fishSpecie });
});
