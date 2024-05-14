<script setup lang="ts">
import type { Combo, FishSpecies } from "@prisma/client";
import type { FishSpotModel } from "~/apis/fishSpot";

definePageMeta({
  title: "创建记录",
});

const fishSpotStore = useFishspotStore();
const fishSpeciesStore = useFishSpeciesStore();

const fishSpot = ref<FishSpotModel>();

// 装备组合相关
const backpackStore = useBackpackStore();
backpackStore.loadBackPackCombos();
const combo = ref<Combo>();
const comboCol = computed(() => {
  return backpackStore.getCombos.map((combo) => {
    return {
      text: combo.name,
      value: combo.id,
    };
  });
});
const comboName = ref<string>();
const showComboPicker = ref(false);
const onComboConfirm = (value: string) => {
  combo.value = backpackStore.getCombos.find((c) => c.id === value);
  comboName.value = combo.value?.name;
  showComboPicker.value = false;
};

const fishSpecies = ref<FishSpecies>();

const fileList = ref([{ url: "/avatar/鲌.png" }]);

const afterRead = (file: any) => {
  // 此时可以自行将文件上传至服务器
  console.log(file);
};

const fishCatchData = ref<{
  length: number;
  weight: number;
}>({
  length: 0,
  weight: 0,
});
</script>

<template>
  <div class="space-y-6xl">
    <van-cell-group>
      <div class="p-4xl">
        <van-uploader v-model="fileList" multiple :after-read="afterRead" />
      </div>
    </van-cell-group>

    <van-cell-group>
      <van-field> </van-field>

      <van-field
        v-model="fishCatchData.length"
        required
        label="长度"
        placeholder="长度"
        :rules="[{ required: true, message: '请填写长度' }]"
      >
        <template #extra>（cm）</template>
      </van-field>
      <van-field
        v-model="fishCatchData.weight"
        label="重量"
        placeholder="重量"
        :rules="[{ required: true, message: '请填写重量' }]"
        ><template #extra> （kg） </template>
      </van-field>
      <van-cell title="上鱼时间" value="2024-5-9 20:13:53" />
    </van-cell-group>

    <van-cell-group>
      <van-field
        v-model="comboName"
        is-link
        readonly
        name="picker"
        label="装备组合"
        placeholder="点击选择装备组合"
        @click="showComboPicker = true"
      />
      <van-popup v-model:show="showComboPicker" position="bottom">
        <van-picker
          :columns="comboCol"
          @confirm="onComboConfirm"
          @cancel="showComboPicker = false"
        />
      </van-popup>
    </van-cell-group>

    <van-cell-group>
      <van-cell title="钓点" />
    </van-cell-group>

    <div style="margin: 16px">
      <van-button round block type="primary"> 提交 </van-button>
    </div>
  </div>
</template>

<style scoped></style>
