import type { H3Event, EventHandlerRequest } from "h3";

interface Auth {
  id: number;
  username: string;
  phone: string;
}
export const getAuth = (event: H3Event<EventHandlerRequest>): Auth => {
  return event.context.auth as Auth;
};
