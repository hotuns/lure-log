<script setup lang='ts'>
import type { ReelType, Braking, FishingReel } from '@prisma/client';
import type { PickerConfirmEventParams } from 'vant';

definePageMeta({
    name: 'backpack-createReel',
    title: "新增卷线器",
});

const backPackStore = useBackpackStore();
onMounted(() => {
    refresh()
})
const { data, pending, refresh } = await useAsyncData("backpack_randomreels", () => backPackStore.loadRandomReels());

const formatLabel = (reel: FishingReel) => {
    return `品牌：${reel.brand}  型号：${reel.model}`
}

const searchResult = ref<FishingReel[]>([]);
const searchQuery = ref('');
const showCustomForm = ref(false);
const fetchReels = async () => {
    const { backpack } = useApi()
    let res = await backpack.searchReel({ keyword: searchQuery.value })
    if (res.success) {
        searchResult.value = res.data.reels
    }
};

// 表单
const newReel = ref({
    brand: "",
    model: "",
    type: '纺车轮',
    weight: 0,
    gearRatio: 0,
    braking: '无刹车',
})
const onListClick = (reel: FishingReel) => {
    console.log('click', reel);
    // 设置到表单
    newReel.value = {
        brand: reel.brand,
        model: reel.model,
        type: reel.type,
        weight: reel.weight,
        gearRatio: reel.gearRatio,
        braking: reel.braking,
    }
    showCustomForm.value = true
}
const onSubmit = async (values: any) => {
    const { backpack } = useApi()
    let res = await backpack.createReel({
        brand: values.brand,
        model: values.model,
        type: values.type,
        weight: values.weight,
        gearRatio: values.gearRatio,
        braking: values.braking,
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
        <van-search v-model="searchQuery" placeholder="搜索鱼竿品牌或者型号" @search="fetchReels" />
        <van-list>
            <van-cell v-for="rod in searchResult" :key="rod.id" :title="rod.model" :label="formatLabel(rod)"
                @click="onListClick(rod)" value="选择" is-link />
        </van-list>
        <van-button class="mt-6" round block type="primary" @click="showCustomForm = true">自定义新的鱼竿</van-button>

        <van-divider>快捷选择</van-divider>
        <van-list>
            <van-cell v-for="reel in backPackStore.getRandomReels" :key="reel.id" :title="reel.model"
                :label="formatLabel(reel)" @click="onListClick(reel)" value="选择" is-link />
        </van-list>



        <van-popup v-model:show="showCustomForm" position="bottom" round>
            <BackPackReelForm :data="newReel" @submit="onSubmit" />
        </van-popup>
    </div>
</template>

<style scoped>
/* Add any additional styles if needed */
</style>
