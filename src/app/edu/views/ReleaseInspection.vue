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
  <div class="item ow-flex-wrap dir-col" style="--size: 80%;">
    <div class="container-fluid">
      <div class="ow-grid-wrap">
        <wj-flex-grid
          headersVisibility="Column"
          selectionMode="None"
          :itemsSource="releaseInspectionData"
          class="ow-grid"
          :allowMerging="'Cells'"
          :initialized="onInitialized"
          :autoRowHeights="true"
          :autoGenerateColumns="false"
        > <!-- :autoRowHeights="true" -->
          <wj-flex-grid-column :binding="'No'" :header="'No'" :allowMerging="true" :width=40 align="center" :autoRowHeights="true"/>
          <wj-flex-grid-column :binding="'orderClient'" :header="'거래처'" :allowMerging="true" :width=100 align="center"/>
          <wj-flex-grid-column :binding="'shippingCat'" :header="'배송구분'" :allowMerging="true" :width=65 align="center"/>
          <wj-flex-grid-column :binding="'releaseNo'" :header="'출고번호'" :allowMerging="true" :width=100 align="center"/>
          <wj-flex-grid-column :binding="'deliveryDest'" :header="'배송지'" :allowMerging="true" :width=100 align="center"/>
          <wj-flex-grid-column :binding="'orderNum'" :header="'주문번호'" :allowMerging="true" :width=100 align="center"/>
          <wj-flex-grid-column :binding="'companyName'" :header="'업체명'" :width=70 align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'itemName'" :header="'품목명'" :width=130 align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'itemCode'" :header="'품목코드'" :width=130 align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'pickingQty'" :header="'피킹수량'" :width=65 align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'inspectionQty'" :header="'검수수량'" :width=65 align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'personInCharge'" :header="'피킹담당자'" :width=100 align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'releasePrint'" :header="'출고요청서인쇄'" :allowMerging="true" :width=70 align="center" :wordWrap="true" :multiline="true"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'boxQty'" :header="'출고Box수량'" :width=70 align="center" :wordWrap="true" :multiline="true"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'inspection'" :header="'출고검수'" :width=70 align="center"></wj-flex-grid-column>           
          <wj-flex-grid-column :binding="'transactionPrint'" :header="'거래명세서인쇄'" :allowMerging="true" :width=70 align="center" :wordWrap="true" :multiline="true"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'note'" :header="'비고'" :width=70 align="center"></wj-flex-grid-column>           
          
        </wj-flex-grid>
      </div>
    </div>
  </div>

  <!-- 검수스캔 영역 -->
  <div class="item">
    <div class="ow-flex-wrap dir-col">
      <!-- 바코드 스캔(윗부분) -->
      <div class="item size-fix ow-flex-wrap dir-col">
        <div class="ow-flex-wrap">
          <div class="item size-fix" style="--gap-item:6px;">
            <div class="title-field">거래처명</div>
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
            <div class="title-field">총검수수량</div>
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
          <colgroup>
            <col style="width:160px" />
            <col style="width:auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">출고번호스캔</th>
              <td>
                <div class="ow-input">
                  <input type="text" value="C_02_002"/>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">바코드스캔</th>
              <td>
                <div class="ow-input">
                  <input type="text" value="default value"/>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">주문번호</th>
              <td>출하검수/패킹 보조가 없습니다.</td>
            </tr>
          </tbody>
        </table>
        <div class="container">
          <button class="ow-btn type-util float-right" style="float:right">미출고처리</button>
        </div>
               
      </div>

      <!-- 박스별 품목정보 -->
      <div class="item align-y-start">
        <div class="ow-flex-wrap">
          <div class="item size-fix" style="--gap-item:6px;">
            <div class="title-field">박스별품목정보</div>
          </div>
          <button class="ow-btn type-state">박스추가+</button>
        </div>
      </div>
      <div>
        <button class="ow-btn type-group active">박스1</button>
        <button class="ow-btn type-group">박스2</button>
        <button class="ow-btn type-group">박스3</button>
        <button class="ow-btn type-group">박스4</button>
        <button class="ow-btn type-group">박스5</button>
        <button class="ow-btn type-group">박스6</button>
        <button class="ow-btn type-group">박스7</button>
        <button class="ow-btn type-group">박스8</button>
        <div class="ow-grid-wrap">
          <wj-flex-grid
            headersVisibility="Column"
            :itemsSource="releaseInspectionData"
            class="ow-grid">
            <wj-flex-grid-column :binding="'No'" :header="'No'" :width=55 />
            <wj-flex-grid-column :binding="'No'" :header="'품목명'" :width=100 />
            <wj-flex-grid-column :binding="'No'" :header="'품목코드'" :width=100 />
            <wj-flex-grid-column :binding="'No'" :header="'주문수량'" :width=65 />
            <wj-flex-grid-column :binding="'No'" :header="'피킹수량'" :width=65 />
            <wj-flex-grid-column :binding="'No'" :header="'검수수량'" :width=65>
              <wj-flex-grid-cell-template cellType="Cell">
                <div class="ow-input mr-2" style="--width:50px">
                  <input type="text" />
                </div>
              </wj-flex-grid-cell-template>            
            </wj-flex-grid-column>
          </wj-flex-grid>
        </div>

      </div>

    </div>
  </div>
</div>

</template>

<script>
import WjFlexGrid from '@grapecity/wijmo.vue2.grid';
import { CollectionView } from '@grapecity/wijmo';
import { ref, reactive, toRefs } from 'vue';
import OwFlexGrid from '../../../components/grid/OwFlexGrid.vue';
import { SimpleMergeManager } from '@/utils/wijmo.grid';

export default {
  setup() {
    const state = reactive({
      flex: undefined,  //wj-flex-grid의 정보를 flex에 담아서 사용
    });
    //숙희 언니 화이텡
    const onInitialized = (flex) => {
      const config = {
        groupingColumns: [1],
        mergedColumns: [0,1,2,3,4,5],
      };
      flex.mergeManager = new SimpleMergeManager(config);
    };
    return {
      ...toRefs(state),
      onInitialized
    }
  },

  components: {
    WjFlexGrid,
  },
  
  data() {
    // OwFlexGrid
    return {
      checkboxGroup5: [ 
        { name : '긴급', value : '긴급'} ,
        { name : '일반', value : '일반'} ,
      ]
      , emptyGroup: []
      , releaseInspectionData: [
        {No: '1', orderClient : '현대치과', shippingCat: '일반', releaseNo: 'C_02_006', deliveryDest: '현대치과', orderNum: '2201043708', companyName: 'Kavo', itemName: 'SmartMembrane', itemCode: 'SM2W10129SB', pickingQty: '10', inspectionQty:'10', personInCharge: '김현일', releasePrint:'', boxQty:'',inspection:'',transactionPrint:'', note:''},
        {No: '1', orderClient : '현대치과', shippingCat: '일반', releaseNo: 'C_02_006', deliveryDest: '현대치과', orderNum: '2201043708', companyName: 'Kavo', itemName: 'SmartMembrane', itemCode: 'SM2W10129SB', pickingQty: '10', inspectionQty:'10', personInCharge: '김현일', releasePrint:'', boxQty:'',inspection:'',transactionPrint:'', note:''},
        {No: '1', orderClient : '현대치과', shippingCat: '일반', releaseNo: 'C_02_006', deliveryDest: '현대치과', orderNum: '2201043708', companyName: 'Kavo', itemName: 'SmartMembrane', itemCode: 'SM2W10129SB', pickingQty: '10', inspectionQty:'10', personInCharge: '김현일', releasePrint:'', boxQty:'',inspection:'',transactionPrint:'', note:''},
        {No: '2', orderClient : '램브란트치과', shippingCat: '일반', releaseNo: 'C_02_006', deliveryDest: '현대치과', orderNum: '2201043708', companyName: 'Kavo', itemName: 'SmartMembrane', itemCode: 'SM2W10129SB', pickingQty: '10', inspectionQty:'10', personInCharge: '김현일', releasePrint:'', boxQty:'',inspection:'',transactionPrint:'', note:''},
        {No: '2', orderClient : '램브란트치과', shippingCat: '일반', releaseNo: 'C_02_006', deliveryDest: '현대치과', orderNum: '2201043708', companyName: 'Kavo', itemName: 'SmartMembrane', itemCode: 'SM2W10129SB', pickingQty: '10', inspectionQty:'10', personInCharge: '김현일', releasePrint:'', boxQty:'',inspection:'',transactionPrint:'', note:''},
        {No: '2', orderClient : '램브란트치과', shippingCat: '일반', releaseNo: 'C_02_006', deliveryDest: '현대치과', orderNum: '2201043708', companyName: 'Kavo', itemName: 'SmartMembrane', itemCode: 'SM2W10129SB', pickingQty: '10', inspectionQty:'10', personInCharge: '김현일', releasePrint:'', boxQty:'',inspection:'',transactionPrint:'', note:''},
        {No: '3', orderClient : '햇살치과의원', shippingCat: '일반', releaseNo: 'C_02_006', deliveryDest: '현대치과', orderNum: '2201043708', companyName: 'Kavo', itemName: 'SmartMembrane', itemCode: 'SM2W10129SB', pickingQty: '10', inspectionQty:'10', personInCharge: '김현일', releasePrint:'', boxQty:'',inspection:'',transactionPrint:'', note:''},
      ]

    }

    // return {
    //   checkboxGroup5,
    //   emptyGroup,
    //   releaseInspectionData
    // };
  },
};
</script>

<style>
.clr-red {
  color: #f60808;
}
.wj-cell.wj-header.wj-align-center {
    max-height: 300px;
}

.wj-cell.wj-header.wj-wrap.wj-align-center {
    line-height: inherit;
}

/* .wj-cell.wj-align-center {
    max-height: 300px;
}

.wj-cell.wj-header {
    max-height: 300px;
} */

/* .wj-header{
  height: 300px;
}

.wj-cell.wj-header.wj-align-center {
    height: 50px;
}

.wj-cell.wj-align-center {
    height: 30px;
} */


    /* .wj-header {
      color: nth($clrs-achromatic, 2);
      background-color: #fff;
      &:not(:last-child) { 
        border-right : 0 ; 
        &:after {
          content :"" ; 
          display: block;
          width: 1px ; 
          position: absolute;
          right : 0 ; top: 7px; bottom: 7px ;  
          background-color: nth($clrs-border, 1);
        }
      }
      // 헤더 정렬 클래스 ( 태그에 cssClassAll="" 로 적용 필요 )
      &.ta-c { text-align: center ; }
      &.ta-l { text-align: left ; }
      &.ta-r { text-align: right ; }
    } */
</style>
