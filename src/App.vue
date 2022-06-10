<template>
  확인용 커밋입니다. 배고파용
  <router-view></router-view>
  <app-teleport></app-teleport>
</template>
<script>
import AppTeleport from '@/components/AppTeleport';
export default {
  name: 'App',
  components: {
    AppTeleport,
  },
  setup() {},
};
</script>

<style lang="scss">
@import '@/assets/css/index.scss';
</style>
