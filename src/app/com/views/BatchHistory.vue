<template>
  <ow-search-zone>
    <ow-input label="배치작업명"></ow-input>
    <ow-select label="대상시스템" :items="search.items1"></ow-select>
    <ow-select label="변경항목" :items="search.items2"></ow-select>
    <ow-select label="변경구분" :items="search.items3"></ow-select>
    <ow-input label="변경항목ID"></ow-input>
    <ow-input label="변경자"></ow-input>
    <ow-flex-item>
      <ow-input-date label="변경일시" :after="$refs.after" ref="before"></ow-input-date>
      <ow-input-date :before="$refs.before" ref="after"></ow-input-date>
    </ow-flex-item>
    <template #right>
      <button class="ow-btn type-reference"><span>엑셀다운로드</span></button>
      <button class="ow-btn type-reference"><span>조회</span></button>
    </template>
  </ow-search-zone>
</template>
<script>
import OwSearchZone from '@@/com/components/input/OwSearchZone';
export default {
  name: 'TheBatchHistory',
  components: {
    OwSearchZone,
  },
  data() {
    return {
      search: {
        items1: [
          { name: '시스템1', value: '' },
          { name: '시스템2', value: '' },
        ],
        items2: [
          { name: '성공', value: '' },
          { name: '실패', value: '' },
        ],
        items3: [
          { name: '성공', value: '' },
          { name: '실패', value: '' },
        ],
      },
    };
  },
};
</script>
<style lang="scss" scoped></style>
