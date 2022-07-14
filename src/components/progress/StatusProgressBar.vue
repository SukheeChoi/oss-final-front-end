<template>
  <div class="ow-panel">
    <div class="ow-panel-header">
      <!-- 주문 단계를 누르면 해당 단계 관리 페이지로 이동 -->
      <div class="ow-panel-title" onclick="location.href='/edu/Order'">주문</div>
    </div>
    <div class="ow-panel-body">
      <div class="ow-flex-wrap">
        <div class="item txt-dot-square">계획 대비 실적 달성률</div>
        <div class="progress-bar">
          <!--  span 태그를 통해 progress바 위에 퍼센티지 수치를 나타냄 -->
          <span :data-value="percentOrd" :style="`width: ${percentOrd}%`">{{ percentOrd }}%</span>
          <!-- 퍼센트마다 progress바 다르게 적용 -->
          <progress class="low" v-if="percentOrd < 60" :value="percentOrd" :max="100"></progress>
          <progress class="mid" v-else-if="percentOrd < 80" :value="percentOrd" :max="100"></progress>
          <progress class="high" v-else :value="percentOrd" :max="100"></progress>
        </div>
      </div>
      <hr />
      <div class="ow-flex-wrap">
        <div class="item txt-dot-square">계획</div>
        <div class="align-to-right">
          300건(<strong style="color: rgb(103, 146, 226)">잔여 {{ 300 - statusOrd }}건</strong> /
          <strong style="color: rgb(210, 57, 46)">미출고 {{ unreleaseCnt }}건</strong>)
        </div>
      </div>
      <div class="ow-flex-wrap">
        <div class="item txt-dot-square">실적</div>
        <div class="align-to-right">{{ statusOrd }}건</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
}
</style>
