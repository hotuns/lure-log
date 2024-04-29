import { defineStore } from "pinia";
import type { LoginParams, LoginResultModel } from "~/apis/auth";
import { useApi } from "~/composables/useApi";

function storeSetup() {
  const userInfo = ref<LoginResultModel>();
  const getUserInfo = computed(() => userInfo.value);
  const isLogin = computed(() => !!userInfo.value?.token);
  const getToken = computed(() => userInfo.value?.token);
  const setUserInfo = (info: LoginResultModel) => {
    userInfo.value = info;
  };
  const login = async (params: LoginParams) => {
    console.log("store login", params);
    const { auth } = useApi();
    try {
      const res = await auth.login(params);
      if (res.success) {
        userInfo.value = res.data;
        return res.data;
      } else {
        showFailToast(res.message);
        return null;
      }
    } catch (error) {
      showFailToast("登录失败");
      return null;
    }
  };
  const clearUserInfo = () => {
    userInfo.value = undefined;
  };
  const logout = async () => {
    clearUserInfo();
  };

  return {
    userInfo,
    login,
    logout,
    getUserInfo,
    getToken,
    isLogin,
    clearUserInfo,
    setUserInfo,
  };
}
export const useUserStore = defineStore("app-user", storeSetup, {
  persist: true,
});
