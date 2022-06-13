<template>
  <ow-search-zone>
    <ow-input label="배치작업명"></ow-input>
    <ow-select label="대상시스템" :items="search.items1"></ow-select>
    <ow-select label="상태" :items="search.items2"></ow-select>
    <ow-flex-item>
      <ow-input-date label="실행시작일" :after="$refs.after1" ref="before1" v-model="search.before1"></ow-input-date>
      <ow-input-date :before="$refs.before1" ref="after1" v-model="search.after1"></ow-input-date>
    </ow-flex-item>
    <ow-flex-item>
      <ow-input-date label="실행종료일" :after="$refs.after2" ref="before2" v-model="search.before2"></ow-input-date>
      <ow-input-date :before="$refs.before2" ref="after2" v-model="search.after2"></ow-input-date>
    </ow-flex-item>
    <template #right>
      <button class="ow-btn type-reference"><span>엑셀다운로드</span></button>
      <button class="ow-btn type-reference"><span>조회</span></button>
    </template>
  </ow-search-zone>
  <ow-grid
    :page-no="paging.pageNo"
    :page-size="paging.pageSize"
    :totalCount="paging.totalCount"
    @page-change="pageChange"
  >
    <template #left>
      <h1 class="h1">배치결과</h1>
    </template>
    <wj-flex-grid class="ow-grid" headersVisibility="Column" selectionMode="0" :itemsSource="items">
      <ow-number-column></ow-number-column>
      <wj-flex-grid-column header="배치결과ID" binding="a"></wj-flex-grid-column>
      <wj-flex-grid-column header="배치작업명" binding="b" width="*"></wj-flex-grid-column>
      <wj-flex-grid-column header="대상시스템" binding="c"></wj-flex-grid-column>
      <wj-flex-grid-column header="상태" binding="d"></wj-flex-grid-column>
      <wj-flex-grid-column header="실행결과" binding="e" width="*"></wj-flex-grid-column>
      <wj-flex-grid-column header="실행시작일시" binding="f"></wj-flex-grid-column>
      <wj-flex-grid-column header="실행종료일시" binding="g"></wj-flex-grid-column>
      <wj-flex-grid-column header="조치내용" binding="h"></wj-flex-grid-column>
      <wj-flex-grid-column header="조치자" binding="i"></wj-flex-grid-column>
      <wj-flex-grid-column header="조치일시" binding="j"></wj-flex-grid-column>
    </wj-flex-grid>
  </ow-grid>
</template>
<script>
import OwNumberColumn from '@@/com/components/wijmo/grid/OwNumberColumn';
import OwSearchZone from '@@/com/components/input/OwSearchZone';
export default {
  name: 'TheBatchResult',
  components: {
    OwNumberColumn,
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
        before1: '',
        after1: '',
        before2: '',
        after2: '',
      },

      items: [],

      paging: {
        pageNo: 1,
        pageSize: 10,
        totalCount: 11,
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.search-zone {
  & > .item {
    flex: 0 0 auto;
  }
  :deep(.ow-combobox),
  :deep(.ow-input) {
    --width: 150px;
  }
}
</style>
