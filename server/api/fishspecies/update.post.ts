export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const body = await readBody<{
    id: string;
    name: string;
    description: string;
    image: string;
  }>(event);
  const { id: fishSpecieId, name, description, image } = body;

  const fishSpecie = await prisma.fishSpecies.update({
    where: {
      id: fishSpecieId,
    },
    data: {
      name,
      description,
      image,
    },
  });

  return Res({ fishSpecie });
});
