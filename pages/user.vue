<script setup lang="ts">
definePageMeta({
  name: "user",
  layout: "home",
});

const color = useColorMode();
const { auth } = useApi();
const userStore = useUserStore();
const authUser = userStore.getUserInfo?.user;
const logout = () => {
  userStore.logout();
  navigateTo({ name: "login" });
};

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

const showSetAvatar = ref(false);
const onAvatarClick = () => {
  showSetAvatar.value = true;
};
const avatarList = useAvatarList();

const changeAvatar = async (path: string) => {
  showConfirmDialog({
    title: "提示",
    message: "确定修改头像吗？",
  })
    .then(async () => {
      if (!authUser) return;

      const res = await auth.update({
        avatar: path,
        phone: authUser.phone,
        username: authUser.username,
      });

      if (res.success) {
        showSuccessToast("修改成功");
        authUser.avatar = res.data.user.avatar;
      } else {
        showFailToast("修改失败");
      }
      showSetAvatar.value = false;
    })
    .catch(() => {
      showFailToast("取消修改");
      showSetAvatar.value = false;
    });
};
</script>

<template>
  <div class="py-10">
    <van-cell-group inset v-if="authUser">
      <van-cell center value="修改头像" is-link @click="onAvatarClick">
        <template #title>
          <van-image
            width="10rem"
            height="10rem"
            fit="contain"
            :src="authUser.avatar || '/avatar/default.png'"
          />
        </template>
      </van-cell>
      <van-cell title="用户名" :value="authUser.username" />
      <van-cell title="手机号" :value="authUser.phone" />
      <van-cell title="修改密码" is-link />
      <van-cell title="退出登录" is-link @click="logout" />
    </van-cell-group>

    <van-cell-group inset v-else>
      <van-cell
        center
        title="立即登录"
        is-link
        @click="navigateTo({ name: 'login' })"
      />
    </van-cell-group>

    <!-- 设置头像 -->
    <van-popup
      v-model:show="showSetAvatar"
      teleport="body"
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div>
        <van-grid :column-num="3">
          <van-grid-item
            v-for="i in avatarList.avatar"
            :key="i.name"
            :text="i.name"
            @click="changeAvatar(i.path)"
          >
            <van-image :src="i.path" />
          </van-grid-item>

          <van-grid-item
            v-for="i in avatarList.avatarWithName"
            :key="i.name"
            :text="i.name"
            @click="changeAvatar(i.path)"
          >
            <van-image :src="i.path" />
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>

    <VanCellGroup inset title="设置">
      <VanCell center title="🌗 暗黑模式">
        <template #right-icon>
          <VanSwitch
            v-model="checked"
            size="20px"
            aria-label="on/off Dark Mode"
            @click="toggleDark"
          />
        </template>
      </VanCell>
    </VanCellGroup>
  </div>
</template>
