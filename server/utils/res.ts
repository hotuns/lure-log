export const Res = (
  code: "success" | "failed",
  data: any,
  msg?: string,
  error?: any
) => {
  msg = msg || (code === "success" ? "成功" : "失败");

  return {
    code,
    msg,
    data,
    error,
  };
};
