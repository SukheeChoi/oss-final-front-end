<template>
<div class="ow-flex-wrap dir-col" style="--gap:10px;">
  <div class="item">
    <div class="ow-flex-wrap">
      <div class="item size-fix" style="--gap-item:6px;">
        <div class="title-field">현황</div>
      </div>
      <div class="item">
        <div class="state">
          <div class="state-item">주문건 : <strong>1672</strong>건 </div>
          <div class="state-item">피킹완료건 : <strong>1487</strong>건 (긴급 <strong class="color-type-2">5</strong>건/일반 <strong>1482</strong>건) </div>
          <div class="state-item">출고검수/패킹건 : 0건 (긴급 <strong class="color-type-2">2</strong>건/일반 <strong>183</strong>건) </div>
        </div>
      </div>
    </div>
  </div>
</div>
<hr>
<dl class="checkbox-title-wrap">
  <dt>배송 구분</dt>
  <dd>
    <ow-filter-checkbox name="checkboxGp5" v-bind:items="checkboxGroup5" v-model="emptyGroup"></ow-filter-checkbox>
  </dd>
</dl>

<!-- 본문 시작, ow-flex 사용 -->
<div class="ow-flex-wrap">
  <!-- 그리드 영역 -->
  <div class="item" style="--size: 50%;">
    <div class="container-fluid">
      <div class="ow-grid-wrap">
        <wj-flex-grid
          headersVisibility="Column"
          selectionMode="None"
          :itemsSource="releaseInspectionData"
          class="ow-grid"
          :allowMerging="'Cells'"
        >
          <wj-flex-grid-column :binding="'No'" :header="'No'" :allowMerging="true" width="*" align="center"/>
          <wj-flex-grid-column :binding="'a'" :header="'거래처'" :allowMerging="true" width="*" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'b'" :header="'배송구분'" :allowMerging="true" width="*" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'c'" :header="'출고지'" :allowMerging="true" width="*" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'d'" :header="'배송지'" :allowMerging="true" width="*" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'e'" :header="'업체명'" width="*" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'f'" :header="'품목명'" width="*" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'g'" :header="'품목코드'" width="*" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'h'" :header="'피킹수량'" width="*" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'i'" :header="'검수수량'" width="*" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'j'" :header="'피킹담당자'" width="*" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'k'" :header="'출고요청서인쇄'" :allowMerging="true" width="*" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'l'" :header="'출고Box수량'" width="*" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'m'" :header="'출고검수'" width="*" align="center"></wj-flex-grid-column>           
          <wj-flex-grid-column :binding="'n'" :header="'거래명세서인쇄'" :allowMerging="true" width="*" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'o'" :header="'비고'" width="*" align="center"></wj-flex-grid-column>           
          
        </wj-flex-grid>
      </div>
    </div>
  </div>

  <!-- 검수스캔 영역 -->
  <div class="item">
    <div class="ow-flex-wrap dir-col" style="height: 150px;">
      <!-- 바코드 스캔(윗부분) -->
      <div class="item size-fix ow-flex-wrap dir-col">
        <div class="ow-flex-wrap">
          <div class="item size-fix" style="--gap-item:6px;">
            <div class="title-field">박스품목정보</div>
          </div>
          <div class="item">
            <div class="state">
              <div class="state-item w-100">오라클 치과</div>
              <div class="state-item ow-select">
                <select name="" id="">
                  <option value="긴급" selected>긴급</option>
                  <option value="일반">일반</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="ow-flex-wrap">
          <div class="item size-fix" style="--gap-item:6px;">
            <div class="title-field">거래처명</div>
          </div>
          <div class="item">
            <div class="state">
              <div class="state-item">
                <div class="w-100">*총피킹수량</div>
                <div class="ow-input mr-2" style="--width:60px">
                  <input type="text" value="11" />
                </div>
              </div>
              <div class="state-item">
                <div class="w-100">*총검수수량</div>
                <div class="ow-input mr-2" style="--width:60px">
                  <input type="text" value="11" />
                </div>
              </div>
              <div class="state-item">
                <div class="w-100">*총미출고수량</div>
                <div class="ow-input mr-2" style="--width:60px">
                  <input type="text" value="11" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="ow-table-type-info">
          
        </table>        
      </div>

      <!-- 박스별 품목정보 -->
      <div class="item align-y-start">item-3</div>
    </div>
  </div>
</div>

</template>

<script>
import WjFlexGrid from '@grapecity/wijmo.vue2.grid';
import { CollectionView } from '@grapecity/wijmo';
import { ref, reactive, toRefs } from 'vue';
import OwFlexGrid from '../../../components/grid/OwFlexGrid.vue';

export default {
  components: {
    WjFlexGrid,
  },
  data() {
    OwFlexGrid
    const checkboxGroup5 = ref([ 
      { name : '긴급', value : '긴급'} ,
      { name : '일반', value : '일반'} ,
    ]);
    const emptyGroup = ref([]);
    const releaseInspectionData = ref([
      {No: '1', a: '현대치과', b: '일반', c: 'C_02_006', d: '현대치과', e: '2201043708', f: 'Kavo', g: 'SmartMembrane', h: 'SM2W10129SB', i: '10', j: '', k:'김현일', l:'', m:'', n:'', o:''},
      {No: '1', a: '현대치과', b: '일반', c: 'C_02_006', d: '현대치과', e: '2201043708', f: 'Kavo', g: 'SmartMembrane', h: 'SM2W10129SB', i: '10', j: '', k:'김현일', l:'', m:'', n:'', o:''},
      {No: '1', a: '현대치과', b: '일반', c: 'C_02_006', d: '현대치과', e: '2201043708', f: 'Kavo', g: 'SmartMembrane', h: 'SM2W10129SB', i: '10', j: '', k:'김현일', l:'', m:'', n:'', o:''},
      {No: '2', a: '램브란트치과', b: '일반', c: 'C_02_006', d: '현대치과', e: '2201043708', f: 'Kavo', g: 'SmartMembrane', h: 'SM2W10129SB', i: '10', j: '', k: '', l:'김현일', m:'', n:'', o:''},
      {No: '2', a: '램브란트치과', b: '일반', c: 'C_02_006', d: '현대치과', e: '2201043708', f: 'Kavo', g: 'SmartMembrane', h: 'SM2W10129SB', i: '10', j: '', k: '', l:'김현일', m:'', n:'', o:''},
      {No: '2', a: '램브란트치과', b: '일반', c: 'C_02_006', d: '현대치과', e: '2201043708', f: 'Kavo', g: 'SmartMembrane', h: 'SM2W10129SB', i: '10', j: '', k: '', l:'김현일', m:'', n:'', o:''},
      {No: '3', a: '햇살치과의원', b: '일반', c: 'C_02_006', d: '현대치과', e: '2201043708', f: 'Kavo', g: 'SmartMembrane', h: 'SM2W10129SB', i: '10', j: '', k: '', l:'김현일', m:'', n:'', o:''},
    ]);

    return {
      checkboxGroup5,
      emptyGroup,
      releaseInspectionData
    };
  },
};
</script>

<style>
.clr-red {
  color: #f60808;
}
</style>
