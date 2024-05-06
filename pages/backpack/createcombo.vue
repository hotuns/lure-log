<script setup lang="ts">
definePageMeta({
  name: "backpack-createCombo",
  title: "创建装备组合",
});
const backPackStore = useBackpackStore();

const newCombo = ref<{
  name: string;
  rodId: number | undefined;
  reelId: number | undefined;
}>({
  name: "",
  rodId: undefined,
  reelId: undefined,
});
const selectedOpt = ref({
  rod: {
    text: "",
    value: 0,
  },
  reel: {
    text: "",
    value: 0,
  },
});

const showRodPicker = ref(false);
const showReelPicker = ref(false);

const rodList = computed(() => {
  return backPackStore.getOwnRods.map((rod) => {
    return {
      text: `${rod.brand} ${rod.model}`,
      value: rod.id,
    };
  });
});
function onRodConfirm(event: any) {
  const opt = event.selectedOptions[0];
  selectedOpt.value.rod = opt;
  showRodPicker.value = false;
}
const reelList = computed(() => {
  return backPackStore.getOwnReels.map((reel) => {
    return {
      text: `${reel.brand} ${reel.model}`,
      value: reel.id,
    };
  });
});
function onReelConfirm(event: any) {
  const opt = event.selectedOptions[0];
  selectedOpt.value.reel = opt;
  showReelPicker.value = false;
}

async function onSubmit(values: any) {
  const { backpack } = useApi();
  let res = await backpack.createCombo({
    name: newCombo.value.name,
    rodId: selectedOpt.value.rod.value,
    reelId: selectedOpt.value.reel.value,
  });
  if (res.success) {
    showSuccessToast("添加成功");
    navigateTo({ name: "backpack" });
  }
}
</script>

<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="newCombo.name"
          label="名称"
          name="name"
          placeholder="请输入组合名称"
        />
        <van-field
          v-model="selectedOpt.rod.text"
          label="鱼竿"
          name="rod"
          placeholder="请选择鱼竿"
          @click="showRodPicker = true"
        />
        <van-field
          v-model="selectedOpt.reel.text"
          name="reel"
          label="鱼线轮"
          placeholder="请选择鱼线轮"
          @click="showReelPicker = true"
        />
        <van-button round block type="primary" native-type="submit"
          >提交</van-button
        >
      </van-cell-group>
      <van-popup v-model:show="showRodPicker" round position="bottom">
        <van-picker
          show-toolbar
          title="选择鱼竿"
          @cancel="showRodPicker = false"
          :columns="rodList"
          @confirm="onRodConfirm"
        />
      </van-popup>

      <van-popup v-model:show="showReelPicker" round position="bottom">
        <van-picker
          show-toolbar
          title="选择鱼线轮"
          :columns="reelList"
          @cancel="showReelPicker = false"
          @confirm="onReelConfirm"
        />
      </van-popup>
    </van-form>
  </div>
</template>

<style scoped></style>
