<script lang="ts" setup>
definePageMeta({
  name: "login",
  title: "Login",
});

const { login, register } = useAuth();

const username = ref("");
const phone = ref("");
const password = ref("");
const rePassword = ref("");
const rememberMe = ref(false);
const onLogin = async (values: any) => {
  try {
    await login(phone.value, password.value, rememberMe.value);
  } catch (error: any) {
    console.log(error);
  }
};

const loginOrRegister = ref<"login" | "register">("login");

const onRegister = async (values: any) => {
  console.log(values);
  try {
    // 判断两次密码是否一致
    if (password.value !== rePassword.value) {
      throw new Error("两次密码不一致");
    }

    // 注册
    await register(phone.value, password.value, username.value);

    showDialog({
      title: "恭喜",
      message: "注册成功，立即登录",
    }).then(() => {
      // on close
      loginOrRegister.value = "login";
    });
  } catch (err: any) {
    console.log(err);
  }
};
</script>

<template>
  <div>
    <van-form v-show="loginOrRegister === 'login'" @submit="onLogin">
      <van-cell-group>
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          type="tel"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />

        <van-cell clickable title="记住密码" @click="rememberMe = !rememberMe">
          <template #right-icon>
            <van-switch v-model="rememberMe" disabled />
          </template>
        </van-cell>
      </van-cell-group>
      <div class="mt-10 space-y-4">
        <van-button round block type="primary" native-type="submit"> 立即登录 </van-button>

        <van-button round block type="default" @click="loginOrRegister = 'register'"> 注册 </van-button>
      </div>
    </van-form>

    <van-form v-show="loginOrRegister === 'register'" @submit="onRegister">
      <van-cell-group>
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          type="tel"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />

        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />

        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="rePassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请填写确认密码' }]"
        />
      </van-cell-group>
      <div class="mt-10 space-y-4">
        <van-button round block type="primary" native-type="submit"> 提交注册 </van-button>

        <van-button round block type="default" @click="loginOrRegister = 'login'"> 返回登录 </van-button>
      </div>
    </van-form>
  </div>
</template>
