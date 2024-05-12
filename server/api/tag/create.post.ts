export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);

  const body = await readBody<{
    name: string;
    description?: string;
  }>(event);
  const { name, description } = body;

  const tag = await prisma.tag.create({
    data: {
      name,
      description,
    },
  });
  return Res({ tag });
});
