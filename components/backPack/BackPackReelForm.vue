<script setup lang='ts'>
import type { ReelType, Braking } from '@prisma/client';


const brand = ref('');
const type = ref('纺车轮');
const typeOptions: { text: string; value: ReelType }[] = [
    {
        text: '纺车轮',
        value: 'Spinning'
    },
    {
        text: '水滴轮',
        value: 'Casting'
    },
    {
        text: '鼓轮',
        value: 'Conventional'
    }
];
const showTypePicker = ref(false);

const model = ref('');
const weight = ref('');
const gearRatio = ref('');
const braking = ref('无刹车');
const showBrakingPicker = ref(false);
const brakingOptions: { text: string; value: Braking }[] = [
    {
        text: '机械刹车',
        value: 'SpoolTension'
    },
    {
        text: '离心刹车',
        value: 'Centrifugal'
    },
    {
        text: '磁力刹车',
        value: 'Magnetic'
    },
    {
        text: '电子刹车',
        value: 'Electronic'
    },
    {
        text: "无刹车",
        value: 'NoBraking'
    },
];

const { createReel } = useBackPack();

const onSubmit = async (values: any) => {
    console.log('submit', values);
    // 这里可以添加向后端发送数据的代码

    const theType = typeOptions.find((item) => item.text === type.value);
    const theBraking = brakingOptions.find((item) => item.text === braking.value);
    if (!theType || !theBraking) {
        return;
    }
    const res = await createReel({
        type: theType.value,
        brand: brand.value,
        model: model.value,
        weight: Number(weight.value),
        gearRatio: Number(gearRatio.value),
        braking: theBraking.value
    });
};

const onTypeConfirm = (res: any) => {
    let opt = res.selectedOptions[0]
    type.value = opt.text
    showTypePicker.value = false;
    if (opt.text === "纺车轮") {
        braking.value = "无刹车";
    }
};



const onBrakingConfirm = (res: any) => {
    let opt = res.selectedOptions[0]
    braking.value = opt.text
    showBrakingPicker.value = false;
};
</script>

<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <!-- 类型 -->
            <van-field v-model="type" name="类型" label="类型" placeholder="请选择类型"
                :rules="[{ required: true, message: '请选择类型' }]" is-link clickable readonly
                @click="showTypePicker = true" />

            <van-field v-model="brand" name="品牌" label="品牌" placeholder="请输入品牌"
                :rules="[{ required: true, message: '请填写品牌' }]" />
            <van-field v-model="model" name="型号" label="型号" placeholder="请输入型号"
                :rules="[{ required: true, message: '请填写型号' }]" />
            <van-field v-model="weight" name="重量" label="重量 (g)" placeholder="请输入重量" type="number"
                :rules="[{ required: true, message: '请填写重量' }]" />
            <van-field v-model="gearRatio" name="齿比" type="digit" label="齿比" placeholder="请输入齿比"
                :rules="[{ required: true, message: '请填写齿比' }]" />

            <van-field v-model="braking" name="刹车类型" label="刹车类型" placeholder="请选择刹车类型"
                :rules="[{ required: true, message: '请选择刹车类型' }]" is-link clickable readonly
                @click="showBrakingPicker = true" />


        </van-cell-group>

        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>

        <van-popup v-model:show="showBrakingPicker" round position="bottom">
            <van-picker show-toolbar title="选择刹车类型" :columns="brakingOptions" @confirm="onBrakingConfirm"
                @cancel="showBrakingPicker = false">
                <template #columns-top>
                    <p class="px-12 text-center text-coolgray">
                        纺车轮默认无刹车
                    </p>
                </template>
            </van-picker>
        </van-popup>

        <van-popup v-model:show="showTypePicker" round position="bottom">
            <van-picker show-toolbar title="选择类型" :columns="typeOptions" @confirm="onTypeConfirm"
                @cancel="showTypePicker = false">
            </van-picker>
        </van-popup>
    </van-form>
</template>

<style scoped></style>
