export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const body = await readBody<{
    name: string;
    description: string;
    image: string;
  }>(event);

  const { name, description, image } = body;

  const fishSpecie = await prisma.fishSpecies.create({
    data: {
      name,
      description,
      image,
    },
  });

  return Res({ fishSpecie });
});
