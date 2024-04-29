// 删除combo组合
export default defineEventHandler(async (event) => {
  const { id } = getAuth(event);
  const body = await readBody<{ id: number }>(event);

  const { id: comboId } = body;

  const combo = await prisma.combo.delete({
    where: {
      id: comboId,
    },
  });
  return Res({ combo });
});
