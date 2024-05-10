<script setup lang="ts">
definePageMeta({
  title: "创建记录",
});

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
      <van-cell title="鱼种" value="翘嘴" />

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
      <van-cell center title="装备组合" label="本次钓鱼使用的装备">
        <template #right-icon>
          <van-icon name="add" size="1.5rem" color="#1989fa" />
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell title="钓点" />
      <div class="w-full h-4xl p-xl">
        <ClientOnly>
          <MapLeaflet />
        </ClientOnly>
      </div>

      <van-field label="是否公开钓点">
        <template #input>
          <van-switch />
        </template>
      </van-field>
    </van-cell-group>

    <div style="margin: 16px">
      <van-button round block type="primary"> 提交 </van-button>
    </div>
  </div>
</template>

<style scoped></style>
