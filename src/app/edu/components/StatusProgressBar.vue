<template>
  <ow-panel>
    <!-- 헤더를 누르면 해당 단계 관리 페이지로 이동 -->
    <template #title>
      <router-link :to="`/edu/${link}`">{{ title }}</router-link>
    </template>
    <div class="ow-flex-wrap">
      <div class="item txt-dot-square">계획 대비 실적 달성률</div>
      <div class="progress-bar">
        <!--  span 태그를 통해 progress바 위에 퍼센티지 수치를 나타냄 -->
        <span :data-value="percentNum" :style="`width: ${percentNum}%`">{{ percentNum }}%</span>
        <!-- 퍼센트마다 progress바 다르게 적용 -->
        <progress class="low" v-if="percentNum < 60" :value="percentNum" :max="100"></progress>
        <progress class="mid" v-else-if="percentNum < 80" :value="percentNum" :max="100"></progress>
        <progress class="high" v-else :value="percentNum" :max="100"></progress>
      </div>
    </div>
    <hr />
    <div class="ow-flex-wrap">
      <div class="item txt-dot-square">계획</div>
      <div class="align-to-right">
        {{ planNum }}건
        <!-- 잔여, 미출고 값이 vue에서 넘어와 true일 때(주문일 때만 띄워줌)-->
        <span v-if="leftoverNum && unreleaseNum">
          <strong style="color: rgb(103, 146, 226)">(잔여 {{ leftoverNum }}건 / </strong>
          <strong style="color: rgb(210, 57, 46)">미출고 {{ unreleaseNum }}건)</strong>
        </span>
      </div>
    </div>
    <div class="ow-flex-wrap">
      <div class="item txt-dot-square">실적</div>
      <div class="align-to-right">{{ resultNum - unreleaseNum }}건</div>
    </div>
  </ow-panel>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
  title: {
    Type: String,
    default: '',
  },
  link: {
    Type: String,
    default: '',
  },
  planNum: {
    Type: Number,
    default: 300,
  },
  resultNum: {
    Type: Number,
    default: 0,
  },
  leftoverNum: Number,
  unreleaseNum: {
    Type: Number,
    default: 0,
  },
  percentNum: {
    Type: Number,
    default: 0,
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
    background: rgb(228, 233, 236);
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

  .progress-bar {
    position: relative;
    background-color: white;
    width: 50%;
    height: 100%;
  }

  .progress-bar span {
    position: absolute;
    display: inline-block;
    color: white;
    text-align: center;
    font-weight: 600;
  }

  a {
    color: white;
  }
}
</style>
