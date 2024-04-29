<script setup lang='ts'>
import type { FishingRod } from '@prisma/client';
import type { RodParams } from '~/apis/backpack';

definePageMeta({
    name: 'backpack-createRod',
    title: "新增鱼竿",
});

const backPackStore = useBackpackStore();
onMounted(() => {
    refresh()
})
const { data, pending, refresh } = await useAsyncData("backpack_randomrods", () => backPackStore.loadRandomRods());

const formatLabel = (rod: FishingRod) => {
    return `品牌：${rod.brand}  型号：${rod.model}`
}

const searchResult = ref<FishingRod[]>([]);
const searchQuery = ref('');
const showCustomForm = ref(false);

const fetchRods = async () => {
    const { backpack } = useApi()
    let res = await backpack.searchRod({ keyword: searchQuery.value })
    if (res.success) {
        searchResult.value = res.data.rods
    }
};



// 表单
const newRod = ref<RodParams>({
    brand: "",
    model: "",
    length: 180,
    sections: 2,
    powerValue: "M",
    action: "Medium",
})
const onListClick = (rod: FishingRod) => {
    console.log('click', rod);
    // 设置到表单
    newRod.value = {
        brand: rod.brand,
        model: rod.model,
        length: rod.length,
        sections: rod.sections,
        powerValue: rod.powerValue,
        action: rod.action,
    }
    showCustomForm.value = true
}
const onSubmit = async (values: RodParams) => {
    const { backpack } = useApi()
    let res = await backpack.createRod({
        brand: values.brand,
        model: values.model,
        length: Number(values.length),
        sections: values.sections,
        powerValue: values.powerValue,
        action: values.action,

    })
    if (res.success) {
        showCustomForm.value = false
        showSuccessToast('添加成功')
        navigateTo({ name: 'backpack' })
    }
}


</script>

<template>
    <div>
        <van-search v-model="searchQuery" placeholder="搜索鱼竿品牌或者型号" @search="fetchRods" />
        <van-list>
            <van-cell v-for="rod in searchResult" :key="rod.id" :title="rod.model" :label="formatLabel(rod)"
                @click="onListClick(rod)" value="选择" is-link />
        </van-list>
        <van-button class="mt-6" round block type="primary" @click="showCustomForm = true">自定义新的鱼竿</van-button>

        <van-divider>快捷选择</van-divider>
        <van-list>
            <van-cell v-for="rod in backPackStore.getRandomRods" :key="rod.id" :title="rod.model"
                :label="formatLabel(rod)" @click="onListClick(rod)" value="选择" is-link />
        </van-list>



        <van-popup v-model:show="showCustomForm" position="bottom" round>
            <BackPackRodForm :data="newRod" @submit="onSubmit" />
        </van-popup>
    </div>
</template>

<style scoped></style>
