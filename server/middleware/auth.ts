import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  let token = getHeader(event, "Authorization");
  if (token) {
    token = token.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
      const plyload = decoded as {
        id: number;
        username: string;
        phone: string;
      };
      event.context.auth = {
        id: plyload.id,
        username: plyload.username,
        phone: plyload.phone,
      };
    } catch (error) {
      event.context.auth = null;
    }
  }
});
