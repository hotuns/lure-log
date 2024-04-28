interface FetchOptions {
  headers?: HeadersInit;
  [key: string]: any;
}

interface FetchResponse<T> {
  code: "success" | "failed";
  data: T | any;
  msg?: string;
  error?: any;
}

export const useHttpFetch = <T>(url: string, opt: FetchOptions) => {
  const accessToken = useCookie("accessToken");
  if (accessToken) {
    opt.headers = {
      ...opt.headers,
      Authorization: `Bearer ${accessToken.value}`,
    };
  }

  return useFetch<FetchResponse<T>>(url, {
    ...opt,
    headers: {
      "Content-Type": "application/json",
      ...opt.headers,
    },
    onRequest: ({ request, options }) => {},
    onRequestError: ({ request, options, error }) => {},
    onResponse: ({ response, options }) => {
      if (response._data.code === "failed") {
        showFailToast(response._data.msg);
      }
    },
    onResponseError: ({ response, options, error }) => {
      // 401 未登录
      if (response.status === 401) {
        accessToken.value = undefined;
        navigateTo("/login");
      } else {
        showToast("出错了");
      }
    },
  });
};
