import { getUserInfo, login as userLogin, logout as userLogout, type LoginData } from '@/api/user'
import type { Backpack, User } from '@/typing'
import { clearToken, setToken } from '@/utils/auth'
import { defineStore } from 'pinia'

const InitUserInfo = {
  id: 0,
  username: '',
  avatar: '',
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<User>({ ...InitUserInfo })
  const backpack = ref<Backpack>()

  // Set user's information
  const setInfo = (partial: User) => {
    userInfo.value = { ...partial }
  }

  const setBackpack = (partial: Backpack) => {
    backpack.value = partial
  }

  const login = async (loginForm: LoginData) => {
    try {
      const { data } = await userLogin(loginForm)
      setToken(data.content.token)
    }
    catch (error) {
      clearToken()
      throw error
    }
  }

  const info = async () => {
    try {
      const { data } = await getUserInfo()
      setInfo(data.user)
      setBackpack(data.backpack)
    }
    catch (error) {
      clearToken()
      throw error
    }
  }

  const logout = async () => {
    try {
      await userLogout()
    }
    finally {
      clearToken()
      setInfo({ ...InitUserInfo })
    }
  }

  return {
    userInfo,
    info,
    login,
    logout,
  }
}, {
  persist: true,
})

export default useUserStore
