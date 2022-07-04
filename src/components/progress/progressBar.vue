<template>
  <div class="ow-flex-wrap">
    <div class="item">계획 대비 실적 달성률</div>
    <div class="progress-bar">
      <!-- 컴포넌트화 하기-->
      <!--  span 태그를 통해 progress바 위에 퍼센티지 수치를 나타냄 -->
      <span :data-value="percentOrd" :style="`width: ${percentOrd}%`">{{ percentOrd }}%</span>
      <!-- 퍼센트마다 progress바 다르게 적용 -->
      <progress class="low" v-if="percentOrd < 80" :value="percentOrd" :max="100"></progress>
      <progress class="mid" v-else-if="percentOrd < 100" :value="percentOrd" :max="100"></progress>
      <progress class="high" v-else :value="percentOrd" :max="100"></progress>
    </div>
  </div>
</template>

<script setup></script>

<style>
.low {
  display: block;
  border: 0 none;
  border-radius: 2px;
  background: gainsboro;
}

.low::-webkit-progress-bar {
  background: transparent;
}

.low::-webkit-progress-value {
  border-radius: 2px;
  background: rgb(246, 193, 68);
}

.mid {
  display: block;
  border: 0 none;
  border-radius: 2px;
  background: gainsboro;
}

.mid::-webkit-progress-bar {
  background: transparent;
}

.mid::-webkit-progress-value {
  border-radius: 2px;
  background: rgb(63, 132, 88);
}

.high {
  display: block;
  border: 0 none;
  border-radius: 2px;
  background: gainsboro;
}

.high::-webkit-progress-bar {
  background: transparent;
}

.high::-webkit-progress-value {
  border-radius: 2px;
  background: rgb(44, 112, 244);
}
</style>