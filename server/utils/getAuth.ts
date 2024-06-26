import type { H3Event, EventHandlerRequest } from "h3";

interface Auth {
  id: string;
  username: string;
  phone: string;
}
export const getAuth = (event: H3Event<EventHandlerRequest>): Auth => {
  const auth = event.context.auth as Auth;

  if (!auth) {
    throw createError({
      statusCode: 401,
      statusMessage: "未登录",
    });
  }
  return auth;
};
