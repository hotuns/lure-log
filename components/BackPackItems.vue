<script setup lang='ts'>
import type { FishingReel, FishingRod } from '@prisma/client';

const props = defineProps<{
    fishingRods: FishingRod[];
    fishingReels: FishingReel[];
}>();

const { fishingRods, fishingReels } = toRefs(props);


const active = ref(0);



</script>

<template>
    <div class="m-10">



        <van-tabs v-model:active="active" type="card">
            <van-tab title="鱼竿">
                <van-empty v-if="fishingRods.length === 0" description="你似乎没有鱼竿">
                    <van-button round type="primary" class="bottom-button">马上添加鱼竿</van-button>
                </van-empty>

                <van-cell-group v-else inset>
                    <van-cell title="单元格" value="内容" label="描述信息" />
                </van-cell-group>


            </van-tab>
            <van-tab title="卷线器">
                <van-empty v-if="fishingReels.length === 0" description="你似乎没有卷线器">
                    <van-button round type="primary" class="bottom-button">马上添加卷线器</van-button>
                </van-empty>


                <van-cell-group v-else inset>
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" label="描述信息" />
                </van-cell-group>
            </van-tab>
        </van-tabs>
    </div>
</template>

<style scoped></style>
