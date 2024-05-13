export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const fishSpecies = await prisma.fishSpecies.findMany();

  return Res({ fishSpecies });
});
