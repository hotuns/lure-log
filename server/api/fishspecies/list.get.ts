export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const query = getQuery(event);

  const name = query.name as string;

  const fishSpecies = await prisma.fishSpecies.findMany(
    name
      ? {
          where: {
            name: {
              contains: name,
            },
          },
        }
      : undefined
  );

  return Res({ fishSpecies });
});
