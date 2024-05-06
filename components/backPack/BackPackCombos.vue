<script setup lang="ts">
import type { Combo } from "@prisma/client";

const props = defineProps<{
  combos: Combo[];
}>();

const { combos } = toRefs(props);

function formatLabel(combo: any) {
  return `鱼竿：${combo.fishingRod.brand}  卷线器：${combo.fishingReel.brand}`;
}

function toCreateCombo() {
  navigateTo({ name: "backpack-createCombo" });
}
</script>

<template>
  <div class="m-10">
    <van-empty v-if="combos.length === 0" description="还没有装备组合">
      <van-button
        round
        type="primary"
        class="bottom-button"
        @click="toCreateCombo"
        >马上创建组合</van-button
      >
    </van-empty>

    <van-cell-group v-else inset>
      <van-cell
        center
        v-for="combo in combos"
        :key="combo.id"
        :title="combo.name"
        :label="formatLabel(combo)"
        value="详情🔎"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<style scoped></style>
