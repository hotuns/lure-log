<script setup lang='ts'>
import type { Action, PowerValue } from '@prisma/client';

const brand = ref('');
const model = ref('');
const length = ref('');
const sections = ref('');
const powerValue = ref('');
const action = ref('');
const showPowerValuePicker = ref(false);
const showActionPicker = ref(false);

const powerValues: { text: PowerValue, value: PowerValue }[] = [
    // 'UL', 'L', 'ML', 'M', 'MH', 'H', 'XH'
    {
        text: 'UL',
        value: 'UL'
    },
    {
        text: 'L',
        value: 'L'
    },
    {
        text: 'ML',
        value: 'ML'
    },
    {
        text: 'M',
        value: 'M'
    },
    {
        text: 'MH',
        value: 'MH'
    },
    {
        text: 'H',
        value: 'H'
    },
    {
        text: 'XH',
        value: 'XH'
    }
];

const actions: { text: Action, value: Action }[] = [
    // 'ExtraFast', 'Fast', 'MediumFast', 'Medium', 'MediumSlow', 'Slow'
    {
        text: 'ExtraFast',
        value: 'ExtraFast'
    },
    {
        text: 'Fast',
        value: 'Fast'
    },
    {
        text: 'MediumFast',
        value: 'MediumFast'
    },
    {
        text: 'Medium',
        value: 'Medium'
    },
    {
        text: 'MediumSlow',
        value: 'MediumSlow'
    },
    {
        text: 'Slow',
        value: 'Slow'
    }
];

const { createRod } = useBackPack();

const onSubmit = async (values: any) => {
    console.log('submit', values);
    // 这里可以添加向后端发送数据的代码
    createRod({
        brand: brand.value,
        model: model.value,
        length: Number(length.value),
        sections: Number(sections.value),
        powerValue: powerValue.value,
        action: action.value
    });
};

const onPowerValueConfirm = (res: any) => {
    let opt = res.selectedOptions[0];
    powerValue.value = opt.value;
    showPowerValuePicker.value = false;
};

const onActionConfirm = (res: any) => {
    let opt = res.selectedOptions[0];
    action.value = opt.value;
    showActionPicker.value = false;
};
</script>

<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field v-model="brand" name="品牌" label="品牌" placeholder="请输入品牌"
                :rules="[{ required: true, message: '请填写品牌' }]" />
            <van-field v-model="model" name="型号" label="型号" placeholder="请输入型号"
                :rules="[{ required: true, message: '请填写型号' }]" />
            <van-field v-model="length" name="长度" label="长度 (cm)" placeholder="请输入长度" type="number"
                :rules="[{ required: true, message: '请填写长度' }]" />
            <van-field name="stepper" label="分节数" placeholder="鱼竿能分几段；独节写1">
                <template #input>
                    <van-stepper v-model="sections" />
                </template>
            </van-field>
            <van-field v-model="powerValue" name="硬度" label="硬度" placeholder="请选择硬度"
                :rules="[{ required: true, message: '请选择硬度' }]" is-link clickable readonly
                @click="showPowerValuePicker = true" />
            <van-field v-model="action" name="调性" label="调性" placeholder="请选择调性"
                :rules="[{ required: true, message: '请选择调性' }]" is-link clickable readonly
                @click="showActionPicker = true" />
        </van-cell-group>

        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>

        <van-popup v-model:show="showPowerValuePicker" round position="bottom">
            <van-picker show-toolbar title="选择硬度" :columns="powerValues" @confirm="onPowerValueConfirm"
                @cancel="showPowerValuePicker = false">
                <template #columns-top>
                    <p class="px-12 text-center text-coolgray">
                        硬度 (Power) 描述了鱼竿在施加力量时的抗压程度。从 UL (超轻) 到 XH (超重)。
                    </p>
                </template>
            </van-picker>
        </van-popup>

        <van-popup v-model:show="showActionPicker" round position="bottom">
            <van-picker show-toolbar title="选择调性" :columns="actions" @confirm="onActionConfirm"
                @cancel="showActionPicker = false">
                <template #columns-top>
                    <p class="px-12 text-center text-coolgray">
                        调性 (Action) 描述了鱼竿弯曲起来的部位，从 ExtraFast (极快) 到 Slow (慢)。
                    </p>
                </template>
            </van-picker>
        </van-popup>


    </van-form>
</template>

<style scoped></style>
