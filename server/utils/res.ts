interface ResOptions<T> {
  data: T;
  code: number;
  message: string;
  success: boolean;
}

export const Res = <T = any>(
  data: any,
  opt?: {
    code?: number;
    message?: string;
    success?: boolean;
  }
) => {
  let optDefault = {
    code: 200,
    message: "success",
    success: true,
  };
  opt = { ...optDefault, ...opt };

  return {
    data,
    ...opt,
  } as ResOptions<T>;
};
