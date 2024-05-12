export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const tags = await prisma.tag.findMany();

  return Res({ tags });
});
