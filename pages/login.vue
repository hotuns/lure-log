<script lang="ts" setup>
import { useUserStore } from '~/stores/user.store'

definePageMeta({
  title: "登录",
  name: "login",
});

const userStore = useUserStore();

const phone = ref("");
const password = ref("");
const onLogin = async (values: any) => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
  });

  await userStore.login({
    phone: phone.value,
    password: password.value,
  })

  navigateTo({ name: "user" });

};
const toRegister = () => {
  navigateTo({ name: "register" });
};
</script>

<template>
  <div>
    <van-form @submit="onLogin">
      <van-cell-group>
        <van-field v-model="phone" name="手机号" label="手机号" type="tel" placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]" />
        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div class="mt-10 space-y-4">
        <van-button round block type="primary" native-type="submit"> 立即登录 </van-button>

        <van-button round block type="default" @click="toRegister"> 去注册 </van-button>
      </div>
    </van-form>
  </div>
</template>
