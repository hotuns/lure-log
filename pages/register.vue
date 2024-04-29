<script lang="ts" setup>
definePageMeta({
    title: "注册",
    name: "register",
});

const userStore = useUserStore();
const { auth } = useApi()

const username = ref("");
const phone = ref("");
const password = ref("");
const rePassword = ref("");

const validatorRePassword = (val: any) => {
    return val === password.value;
};
const onRegister = async (values: any) => {
    console.log(values);
    try {
        // 判断两次密码是否一致
        if (password.value !== rePassword.value) {
            showFailToast("两次密码不一致");
            return
        }

        // 注册
        let data = await auth.register({
            phone: phone.value,
            username: username.value,
            password: password.value,
        });



        if (data.success) {
            showDialog({
                title: "恭喜",
                message: "注册成功，立即登录",
            }).then(() => {
                // on close
                navigateTo({ name: "login" });
            });
        }

    } catch (err: any) {
        console.log(err);
    }
};

const backToLogin = () => {
    navigateTo({ name: "login" });
};
</script>

<template>
    <div>
        <van-form @submit="onRegister">
            <van-cell-group>
                <van-field v-model="phone" name="手机号" label="手机号" type="tel" placeholder="手机号"
                    :rules="[{ required: true, message: '填写正确的手机号', pattern: /^[0-9]{11}$/ }]" />

                <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '任意字母数字组合，最小长度3', }]" />

                <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '任意字母数字组合，最小长度6', pattern: /^[a-zA-Z0-9]{6,30}$/ }]" />
                <van-field v-model="rePassword" type="password" name="确认密码" label="确认密码" placeholder="确认密码"
                    :rules="[{ required: true, message: '密码不一致', validator: validatorRePassword }]" />
            </van-cell-group>
            <div class="mt-10 space-y-4">
                <van-button round block type="primary" native-type="submit"> 提交注册 </van-button>

                <van-button round block type="default" @click="backToLogin"> 返回登录 </van-button>
            </div>
        </van-form>
    </div>
</template>
