import type { User } from "@prisma/client";
import { useHttpFetch } from "./useHttpFetch";

/**获取auth相关的数据 */
export const useAuth = () => {
  const authUser = useCookie<User>("authUser", { maxAge: 60 * 60 * 24 * 7 });

  const login = async (opt: {
    password: string;
    phone?: string;
    username?: string;
    email?: string;
  }) => {
    try {
      const { data } = await useHttpFetch("/api/auth/login", {
        method: "POST",
        body: opt,
      });
      console.log(data);

      if (data.value?.code === "success") {
        authUser.value = data.value.data.user;
        const accessTokenCookie = useCookie("accessToken", {
          maxAge: 60 * 60 * 24 * 7,
        });
        accessTokenCookie.value = data.value.data.token;
      }

      return data;
    } catch (error) {
      showFailToast("登录失败");
    }
  };

  const register = async (opt: {
    password: string;
    phone: string;
    username: string;
    email?: string;
  }) => {
    try {
      const { data } = await useHttpFetch("/api/auth/register", {
        method: "POST",
        body: opt,
      });
      return data;
    } catch (error) {
      showFailToast("注册失败");
    }
  };

  const update = async (opt: {
    phone: string;
    username: string;
    email?: string;
    avatar?: string;
  }) => {
    try {
      const { data } = await useHttpFetch("/api/auth/update", {
        method: "POST",
        body: opt,
      });
      return data;
    } catch (error) {
      showFailToast("更新失败");
    }
  };

  return {
    authUser,
    login,
    register,
    update,
  };
};
