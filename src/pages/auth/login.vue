<script setup lang="ts">
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';


const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const postData = reactive({
  username: '',
  password: '',
})
const rules = reactive({
  username: [
    { required: true, message: t('login.pleaseEnterUsername') },
  ],
  password: [
    { required: true, message: t('login.pleaseEnterPassword') },
  ],
})

async function asyncLogin(values: any) {
  try {
    loading.value = true
    await userStore.login({ ...postData, ...values })
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

function toRejister() {
  router.push({ name: 'register' })
}
</script>

<template>
  <Container :padding-x="0">
    <div class="m-x-a w-7xl text-center">
     
      <van-form :model="postData" :rules="rules" @submit="asyncLogin">
        <van-cell-group inset>
          <van-field v-model="postData.username" :rules="rules.username" name="username" :placeholder="t('login.username')" left-icon="contact" />
          <van-field v-model="postData.password" :rules="rules.password" name="password" :placeholder="t('login.password')" left-icon="lock" type="password" />
        </van-cell-group>
        <div class="m-16 space-y-xl">
          <van-button :loading="loading" round block type="primary" native-type="submit">
            {{ t('login.login') }}
          </van-button>
          <van-button round block @click="toRejister">{{ t('login.register') }}</van-button>
        </div>
      </van-form>
    </div>
  </Container>
</template>

<route lang="json">
{
  "name": "login",
  "meta": {
    "level": 2,
    "i18n": "home.login"
  }
}
</route>
