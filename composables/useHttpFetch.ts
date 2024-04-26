interface FetchOptions {
  headers?: HeadersInit;
  [key: string]: any;
}

export const useHttpFetch = (url: string, opt: FetchOptions) => {
  const token = useCookie("token");
  if (token) {
    opt.headers = {
      ...opt.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return useFetch(url, {
    ...opt,
    headers: {
      "Content-Type": "application/json",
      ...opt.headers,
    },
    onRequest: ({ request, options }) => {},
    onRequestError: ({ request, options, error }) => {},
    onResponse: ({ response, options }) => {
      return response._data;
    },
    onResponseError: ({ request, options, error }) => {},
  });
};
