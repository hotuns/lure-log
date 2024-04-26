<script setup lang="ts">
definePageMeta({
  layout: "home",
});

const currentUser = useAuthUser();
const color = useColorMode();

useHead({
  meta: [
    {
      id: "theme-color",
      name: "theme-color",
      content: () => (color.value === "dark" ? "#222222" : "#ffffff"),
    },
  ],
});

const checked = computed({
  get: () => color.value === "dark",
  set: (val: boolean) => {
    return val;
  },
});

function toggleDark() {
  color.preference = color.value === "dark" ? "light" : "dark";
}
</script>

<template>
  <van-cell-group inset title="信息" v-if="currentUser">
    <van-cell title="用户名" :value="currentUser.username" />
    <van-cell title="手机号" :value="currentUser.phone" />
    <van-cell title="修改密码" is-link />
  </van-cell-group>

  <VanCellGroup inset title="设置">
    <VanCell center title="🌗 暗黑模式">
      <template #right-icon>
        <VanSwitch v-model="checked" size="20px" aria-label="on/off Dark Mode" @click="toggleDark" />
      </template>
    </VanCell>
  </VanCellGroup>
</template>
