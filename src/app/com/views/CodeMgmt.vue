<template>
  <ow-search-zone :store="grpStore" :query="grpQry">
    <ow-search-input label="공통코드 그룹ID" v-model="grpQry.cmmGrpCd"/>
    <ow-search-input label="공통코드 그룹명" v-model="grpQry.cmmGrpCdNm"/>
    <ow-search-select label="사용여부" v-model="grpQry.useYn" :items="useYnView"/>
  </ow-search-zone>
  <ow-grid
    title="공통코드 그룹"
    ref="grpGrid"
    :initialized="initGrpGrid"
    :items-source="grpStore"
    :query="grpQry"
    :paging="grpOpt"
    :read="grpStore.getList"
    :save="grpStore.save"
    :remove="grpStore.remove"
    :selectionChanged="selectionChanged"
    allow-selector
    allow-status
    allow-push-state
  >
    <wj-flex-grid-column header="그룹ID" binding="cmmGrpCd" :is-required="true" :width="200"/>
    <wj-flex-grid-column header="그룹명" binding="cmmGrpCdNm" :is-required="true" :width="200"/>
    <wj-flex-grid-column header="그룹설명" binding="cmmGrpCdDesc" width="*" :maxLength="500"/>
    <wj-flex-grid-column header="코드종류구분코드" binding="cdKndDvcd" :dataMap="cdKndDvMap" :is-required="true" :width="120" align="center" :maxLength="20"/>
    <wj-flex-grid-column header="개별코드테이블ID" binding="eachCdTblId" :width="200" :maxLength="20"/>
    <wj-flex-grid-column header="연계시스템코드" binding="connSysCd" :dataMap="connSysMap" :width="120" align="center" :maxLength="20"/>
    <wj-flex-grid-column header="신청업무코드" binding="aplBizCd" :dataMap="owBizMap" :width="120" align="center" :maxLength="20"/>
    <wj-flex-grid-column header="사용여부" binding="useYn" :dataMap="useYnMap" :is-required="true" :width="100" align="center"/>
    <wj-flex-grid-column header="상위공통그룹코드" binding="upCmmGrpCd" :width="120" :maxLength="20" />
  </ow-grid>
  <ow-grid
    title="공통코드"
    ref="dtGrid"
    :initialized="initDtGrid"
    :items-source="dtStore"
    :query="dtQry"
    :paging="dtOpt"
    :read="dtStore.getList"
    :save="dtStore.save"
    :remove="dtStore.remove"
    :buttons="['REMOVE', 'SAVE']"
    allow-selector
    allow-status
    allow-push-state
  >
    <template #right>
      <button type="button" class="ow-btn type-state" @click="reset">초기화</button>
      <button type="button" class="ow-btn type-state" @click="add">추가</button>
    </template>
    <wj-flex-grid-column header="그룹ID" binding="cmmGrpCd" :is-required="true" isReadOnly="true" :width="200"/>
    <wj-flex-grid-column header="공통코드" binding="cmmCd" :is-required="true" :width="200"/>
    <wj-flex-grid-column header="공통코드명" binding="cmmCdNm" :is-required="true" width="*"/>
    <wj-flex-grid-column header="정렬순서" binding="sortOrd" :is-required="true" :maxLength="10" :width="100" align="center"/>
    <wj-flex-grid-column header="사용여부" binding="useYn" :dataMap="useYnMapDt" :is-required="true" :width="100" align="center"/>
  </ow-grid>
</template>

<script>
import { GridApi } from '@/api/gridApi.js';
import { getCodeList, asDataMap } from '@/api/comCode.js';
import { reactive, ref, toRefs, watch } from 'vue';
import components from '@@/com/components';
import {CodeMgmtModel, CodeMgmtDetailModel} from '../model/CodeMgmtModel.js';

const uri = '/com/CodeMgmt';

export default {
  name: 'CodeMgmt',
  components,
  setup() {
    const grpGrid = ref(null),
          dtGrid = ref(null),
          grpStore = new GridApi(uri, CodeMgmtModel),
          dtStore = new GridApi(uri, CodeMgmtDetailModel, 'Detail');

    const state = reactive({
      grpQry: {cmmGrpCd: '', cmmGrpCdNm: ''},
      grpOpt: {pageNo: 1, pageSize: 10, totalCount: 0},
      dtQry: {cmmGrpCd: ''},
      dtOpt: {pageNo: 1, pageSize: 10, totalCount: 0},
      useYnView: getCodeList('USE_YN'),
      cdKndDvMap: asDataMap(getCodeList('CD_PSNT_DVCD')),
      connSysMap: asDataMap(getCodeList('CONN_SYS_CD')),
      owBizMap: asDataMap(getCodeList('OWTASK_CD')),
      useYnMap: asDataMap(getCodeList('USE_YN')),
      useYnMapDt: asDataMap(getCodeList('USE_YN')),
      currentItem: null,
    });

    const initGrpGrid = (grid) => {
      grpStore.init(grpGrid.value, grid, state.grpQry, state.grpOpt);
    };

    const initDtGrid = (grid) => {
      dtStore.init(dtGrid.value, grid, state.dtQry, state.dtOpt);
    };

    const selectionChanged = async(grid, e) => {
      if (e.row < 0) {
        return;
      }

      state.dtQry.cmmGrpCd = grid.collectionView.currentItem.cmmGrpCd;
      state.currentItem = grid.collectionView.currentItem;
    }

    const getDetail = async() => {
      await dtStore.getList(state.dtQry, state.dtOpt, true);
    }

    const add = () => {
      dtGrid.value.add();
      const addItem = dtStore.currentItem;

      addItem.cmmGrpCd = state.currentItem.cmmGrpCd;
    }

    const reset = () => {
      dtGrid.value.reset();
    }

    watch(
      () => state.currentItem,
      () => {
        getDetail();
      }
    )

    return {
      ...toRefs(state),
      grpGrid,
      dtGrid,
      grpStore,
      dtStore,
      initGrpGrid,
      initDtGrid,
      selectionChanged,
      add,
      reset,
    }
  }
};
</script>

