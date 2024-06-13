<script setup lang="ts">
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';


const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const postData = reactive({
  phone: '',
  password: '',
  repassword: ''
})
const rules = reactive({
  phone: [
    { required: true, message: t('login.pleaseEnterPhone') },
  ],
  password: [
    { required: true, message: t('login.pleaseEnterPassword') },
  ],
})

async function asyncRegister(values: any) {
  try {
    loading.value = true
    
// 注册todos


    const { redirect, ...othersQuery } = router.currentRoute.value.query
    router.push({
      name: (redirect as string) || 'home',
      query: {
        ...othersQuery,
      },
    })
  }
  finally {
    loading.value = false
  }
}


function validatePhone(rule: any, value: string) {
  if (!value) {
    return t('login.pleaseEnterPhone')
  }
  if (!/^1[3456789]\d{9}$/.test(value)) {
    return t('login.pleaseEnterPhone')
  }
  return true
}

function toLogin() {
  router.push({ name: 'login' })
} 
</script>

<template>
  <Container :padding-x="0">
    <div class="m-x-a w-7xl text-center">
     
      <van-form :model="postData" :rules="rules" @submit="asyncRegister">
        <van-cell-group inset>          <van-field v-model="postData.phone" :rules="rules.phone" name="phone" :placeholder="t('login.phone')" left-icon="phone" />
          <van-field v-model="postData.password" :rules="rules.password" name="password" :placeholder="t('login.password')" left-icon="lock" type="password" />
          <van-field v-model="postData.repassword" :rules="rules.password" name="repassword" :placeholder="t('login.confirmPassword')" left-icon="lock" type="password" />

        </van-cell-group>
        <div class="m-16">
          <van-button :loading="loading" round block type="primary" native-type="submit">
            {{ t('login.register') }}
          </van-button>
          <VanButton round block @click="toLogin">{{ t('login.login') }}</VanButton>
        </div>
      </van-form>
    </div>
  </Container>
</template>

<route lang="json">
{
  "name": "register",
  "meta": {
    "level": 2,
    "i18n": "home.register"
  }
}
</route>
