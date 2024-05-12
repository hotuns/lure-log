<script setup lang="ts">
import type { Action, PowerValue } from "@prisma/client";

const props = defineProps<{
  data: {
    brand: string;
    model: string;
    length: number;
    sections: number;
    powerValue: string;
    action: string;
  };
}>();
const emits = defineEmits(["submit"]);
const { data } = toRefs(props);

const showPowerValuePicker = ref(false);
const showActionPicker = ref(false);

const powerValues: { text: PowerValue; value: PowerValue }[] = [
  // 'UL', 'L', 'ML', 'M', 'MH', 'H', 'XH'
  {
    text: "UL",
    value: "UL",
  },
  {
    text: "L",
    value: "L",
  },
  {
    text: "ML",
    value: "ML",
  },
  {
    text: "M",
    value: "M",
  },
  {
    text: "MH",
    value: "MH",
  },
  {
    text: "H",
    value: "H",
  },
  {
    text: "XH",
    value: "XH",
  },
];

const actions: { text: string; value: Action }[] = [
  // 'ExtraFast', 'Fast', 'MediumFast', 'Medium', 'MediumSlow', 'Slow'
  {
    text: "超快",
    value: "ExtraFast",
  },
  {
    text: "快",
    value: "Fast",
  },
  {
    text: "中快",
    value: "MediumFast",
  },
  {
    text: "中",
    value: "Medium",
  },
  {
    text: "中慢",
    value: "MediumSlow",
  },
  {
    text: "慢",
    value: "Slow",
  },
];

const onSubmit = async (values: any) => {
  let reqdata = {
    ...data.value,
    length: parseFloat(data.value.length as any),
    sections: parseFloat(data.value.sections as any),
    powerValue: powerValues.filter((x) => x.text === data.value.powerValue)[0]
      .value,
    action: actions.filter((x) => x.text === data.value.action)[0].value,
  };
  emits("submit", reqdata);
};

const onPowerValueConfirm = (res: any) => {
  let opt = res.selectedOptions[0];
  data.value.powerValue = opt.text;
  showPowerValuePicker.value = false;
};

const onActionConfirm = (res: any) => {
  let opt = res.selectedOptions[0];
  data.value.action = opt.text;
  showActionPicker.value = false;
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="data.brand"
        name="品牌"
        label="品牌"
        placeholder="请输入品牌"
        :rules="[{ required: true, message: '请填写品牌' }]"
      />
      <van-field
        v-model="data.model"
        name="型号"
        label="型号"
        placeholder="请输入型号"
        :rules="[{ required: true, message: '请填写型号' }]"
      />
      <van-field
        v-model="data.length"
        name="长度"
        label="长度 (cm)"
        placeholder="请输入长度"
        type="digit"
        :rules="[{ required: true, message: '请填写长度' }]"
      />
      <van-field
        name="stepper"
        label="分节数"
        placeholder="鱼竿能分几段；独节写1"
      >
        <template #input>
          <van-stepper v-model="data.sections" />
        </template>
      </van-field>
      <van-field
        v-model="data.powerValue"
        name="硬度"
        label="硬度"
        placeholder="请选择硬度"
        :rules="[{ required: true, message: '请选择硬度' }]"
        is-link
        clickable
        readonly
        @click="showPowerValuePicker = true"
      />
      <van-field
        v-model="data.action"
        name="调性"
        label="调性"
        placeholder="请选择调性"
        :rules="[{ required: true, message: '请选择调性' }]"
        is-link
        clickable
        readonly
        @click="showActionPicker = true"
      />
    </van-cell-group>

    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>

    <van-popup v-model:show="showPowerValuePicker" round position="bottom">
      <van-picker
        show-toolbar
        title="选择硬度"
        :columns="powerValues"
        @confirm="onPowerValueConfirm"
        @cancel="showPowerValuePicker = false"
      >
        <template #columns-top>
          <p class="px-12 text-center text-coolgray">
            硬度 (Power) 描述了鱼竿在施加力量时的抗压程度。从 UL (超轻) 到 XH
            (超重)。
          </p>
        </template>
      </van-picker>
    </van-popup>

    <van-popup v-model:show="showActionPicker" round position="bottom">
      <van-picker
        show-toolbar
        title="选择调性"
        :columns="actions"
        @confirm="onActionConfirm"
        @cancel="showActionPicker = false"
      >
        <template #columns-top>
          <p class="px-12 text-center text-coolgray">
            调性 (Action) 描述了鱼竿弯曲起来的部位，从 ExtraFast (极快) 到 Slow
            (慢)。
          </p>
        </template>
      </van-picker>
    </van-popup>
  </van-form>
</template>

<style scoped></style>
