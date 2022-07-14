<template>
  <ow-panel>
    <!-- 헤더를 누르면 해당 단계 관리 페이지로 이동 -->
    <template #title onclick={this.handleClick}>{{ title }}</template>

    <div class="ow-flex-wrap">
      <div class="item txt-dot-square">계획 대비 실적 달성률</div>
      <div class="progress-bar">
        <span :data-value="percentOrd" :style="`width: ${percentOrd}%`">{{ percentOrd }}%</span>
        <progress class="low" v-if="percentOrd < 60" :value="percentOrd" :max="100"></progress>
        <progress class="mid" v-else-if="percentOrd < 80" :value="percentOrd" :max="100"></progress>
        <progress class="high" v-else :value="percentOrd" :max="100"></progress>
      </div>
    </div>
    <hr />
    <div class="ow-flex-wrap">
      <div class="item txt-dot-square">계획</div>
      <div class="align-to-right">
        {{ orderPlan }}건(<strong style="color: rgb(103, 146, 226)">잔여 {{ 300 - statusOrd }}건</strong> / <strong style="color: rgb(210, 57, 46)">미출고 {{ unreleaseCnt }}건</strong>)
      </div>
    </div>
    <div class="ow-flex-wrap">
      <div class="item txt-dot-square">실적</div>
      <div class="align-to-right">{{ statusOrd }}건</div>
    </div>
  </ow-panel>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  title: {
    Type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
::v-deep {
  .low,
  .mid,
  .high {
    display: block;
    border: 0 none;
    border-radius: 2px;
    background: gainsboro;
  }

  .low::-webkit-progress-bar,
  .mid::-webkit-progress-bar,
  .high::-webkit-progress-bar {
    background: transparent;
  }

  .low::-webkit-progress-value {
    border-radius: 2px;
    background: rgb(246, 193, 68);
  }

  .mid::-webkit-progress-value {
    border-radius: 2px;
    background: rgb(63, 132, 88);
  }

  .high::-webkit-progress-value {
    border-radius: 2px;
    background: rgb(44, 112, 244);
  }
}
</style>
