<script setup lang='ts'>
import type { FishingRod } from '@prisma/client';

definePageMeta({
    name: 'backpack-createRod',
    title: "新增鱼竿",
});

const { data: ranwomRods } = await useHttpFetch('/api/rod/list', {
    method: 'get',
    body: {
        limit: 10,
        random: true,
    },
});

const rods = ref<FishingRod[]>([]);
const searchQuery = ref('');
const showCustomForm = ref(false);
const brand = ref('');

const fetchRods = async () => {

};
</script>

<template>
    <div>
        <van-search v-model="searchQuery" placeholder="搜索鱼竿" @search="fetchRods" />
        <van-list v-if="ranwomRods">
            <van-cell v-for="rod in ranwomRods" :key="rod.id" :title="rod.model" />
        </van-list>
        <van-list v-if="rods.length > 0">
            <van-cell v-for="rod in rods" :key="rod.id" :title="rod.model" />
        </van-list>
        <van-button type="primary" @click="showCustomForm = true">创建新的鱼竿</van-button>

        <van-popup v-model:show="showCustomForm" position="bottom" round>
            <BackPackRodForm />
        </van-popup>
    </div>
</template>

<style scoped></style>
