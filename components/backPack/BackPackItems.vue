<script setup lang='ts'>
import type { FishingReel, FishingRod } from '@prisma/client';

const props = defineProps<{
    fishingRods: FishingRod[];
    fishingReels: FishingReel[];
}>();

const { fishingRods, fishingReels } = toRefs(props);


const active = ref(0);

const toCreateRod = () => {
    navigateTo({ name: 'backpack-createRod' });
};
const toCreateReel = () => {
    navigateTo({ name: 'backpack-createReel' });
};

function formatLabel(rod: any) {
    return `品牌：${rod.brand}  型号：${rod.model}`
}
</script>

<template>
    <div class="m-10">
        <van-tabs class="mb-6" v-model:active="active" type="card">
            <van-tab title="鱼竿">
                <van-empty v-if="fishingRods.length === 0" description="你似乎没有鱼竿">
                    <van-button round type="primary" class="bottom-button" @click="toCreateRod">马上添加鱼竿</van-button>
                </van-empty>

                <van-cell-group v-else inset>
                    <van-cell center v-for="rod in fishingRods" :key="rod.id" :title="rod.model"
                        :label="formatLabel(rod)" value="详情🔎" is-link />
                </van-cell-group>
            </van-tab>
            <van-tab title="卷线器">
                <van-empty v-if="fishingReels.length === 0" description="你似乎没有卷线器">
                    <van-button round type="primary" class="bottom-button" @click="toCreateReel">马上添加卷线器</van-button>
                </van-empty>


                <van-cell-group v-else inset>
                    <van-cell center v-for="reel in fishingReels" :key="reel.id" :title="reel.model"
                        :label="formatLabel(reel)" value="详情🔎" is-link />
                </van-cell-group>
            </van-tab>
        </van-tabs>
    </div>
</template>

<style scoped></style>
