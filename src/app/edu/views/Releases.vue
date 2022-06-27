<template>
  <div class="ow-flex-wrap dir-col" style="--gap: 10px">
    <!-- <div class="item"> -->
      <div class="ow-flex-wrap item-size-content">
        <div class="item size-fix" style="--gap-item: 6px">
          <div class="title-field">현황</div>
        </div>
        <div class="item">
          <div class="state">
            <div class="state-item">주문 : <strong>{{summaryList.status.progressOrderNo}}</strong>건</div>
            <div class="state-item">피킹지시 : <strong>{{summaryList.status.pickingDirectionNo}}</strong>건</div>
            <div class="state-item">출고검수/패킹 : <strong>{{summaryList.status.releaseInspectionNo}}</strong>건</div>
            <div class="state-item color-type-1">미출고 : <strong class="color-type-1">{{summaryList.delivery.unreleasedNo}}</strong>건</div>
          </div>
        </div>

        <div class="item size-fix" style="--gap-item: 6px">
          <div class="title-field">배송구분</div>
        </div>
        <div class="item">
          <div class="state">
            <div class="state-item">
              출고검수(긴급/일반) : 
              <strong>{{summaryList.status.releaseInspectionNo}}</strong>
              건 (
              <strong>{{summaryList.delivery.expressShippingNo}}</strong>
              건/
              <strong>{{summaryList.delivery.normalShippingNo}}</strong>
              건)
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->

    <hr />

    <div class="item">
      <div class="ow-flex-wrap item-size-content">
        <!-- <div class="ow-flex-wrap item-size-content" style="--gap: 10px"> -->
        <!-- <div class="item"> -->
          <div>
            <div class="title-field" style="margin-right: 10px; margin-left: 5px">배송구분</div>
            <ow-filter-checkbox name="checkboxGp4" v-bind:items="checkboxGroup1" v-model="emptyGroup" />
          </div>
          <div>
            <div class="title-field" style="margin-right: 10px; margin-left: 5px">배송방식</div>
            <ow-filter-checkbox name="checkboxGp4" v-bind:items="checkboxGroup2" />
          </div>
          <div>
            <div class="title-field" style="margin-right: 10px; margin-left: 5px">미출고</div>
            <ow-filter-checkbox name="checkboxGp4" v-bind:items="checkboxGroup3" />
          </div>

          <div class="item align-to-right" style="--gap-item: 6px">
            <!-- 출고검수/패킹 담당자 필터링 드롭박스 -->
            <div style="--width: 90px">
              <ow-select :label="dropboxAssigneeLabel" :items="dropboxAssigneeList" :modelValue="selectedAssignee">
              </ow-select>
            </div>
            <!-- 검색기준 드롭박스 -->
            <div style="--width: 97px">
              <ow-select :label="selectSearchLabel" :items="selectSearchList" :modelValue="selectedSearchCategory">
              </ow-select>
            </div>
            <!-- 검색바 -->
            <div class="ow-input type-button" style="--width: 200px">
              <input type="text" placeholder="검색어를 입력하세요." />
              <input type="submit" class="btn-search" />
            </div>
          </div>
          <!-- </div> -->
      </div>
    </div>
  </div>

  <div class="ow-grid-wrap">
    <!-- <ow-grid> -->
    <wj-flex-grid
      headersVisibility="Column"
      allowSorting="None"
      selectionMode="None"
      class="ow-grid type-header-group"
      :items-source="releaseInspection_Packing_Data2"
      :initialized="onInitialized"
      :allowMerging="'Cells'"
      style="display: flex"
    >
      <!-- :allowResizing="Row" -->
      <!--화이팅 이라구요! 언니 힘내라구요! -->
      <!-- :loadedRows="onloadedRows" -->
      <!-- :autoGenerateColumns="false" -->
      <!-- :alternatingRowStep="0" -->
      <!-- :allowMerging="'Cells'" -->
      <!-- :autoRowHeights="true" -->
      <!-- 출고검수/패킹 탭 -->
      <wj-flex-grid-column-group header="출고검수/패킹" align="center" cssClassAll="border-right-sm">
        <wj-flex-grid-column-group
          binding="placingorderNo"
          header="출고번호"
          align="center"
          :width="85"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group binding="itemName" header="품목명" align="center" cssClassAll="ta-c border-right-sm">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell" align="left">
            <span align="left" style="justify-content: flex-start"> {{ cell.item['itemName'] || '-' }} </span><br />
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column-group>
        <wj-flex-grid-column-group
          binding="itemCode"
          header="품목코드"
          align="center"
          :width="110"
          cssClassAll="ta-c border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="pickingQty"
          header="피킹수량"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="inspectionQty"
          header="검수수량"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="packing_unrelease"
          header="미출고수량"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="orderClient"
          header="거래처"
          align="center"
          :width="100"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="shippingDest"
          header="배송지"
          align="center"
          :width="100"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="shippingCat"
          header="배송구분"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="shippingWay"
          header="배송방식"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="packing_personincharge"
          header="담당자"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="releaseprintDate"
          header="출고요청서 출력일시"
          align="center"
          :width="110"
          cssClassAll="ta-c border-right-sm"
          multiLine="true"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="transactionprintDate"
          header="거래명세서 출력일시"
          align="center"
          :width="110"
          cssClassAll="ta-c border-right-sm"
          multiLine="true"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="inspectionDate"
          header="검수일시"
          align="center"
          :width="100"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="boxQty"
          header="Box수량"
          width="*"
          cssClassAll="ta-c"
          :allowMerging="true"
        />
      </wj-flex-grid-column-group>
      <!-- 출고 탭 -->
      <wj-flex-grid-column-group header="출고" align="center">
        <wj-flex-grid-column-group
          binding="release_personincharge"
          header="담당자"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="deliveryCompany"
          header="택배사"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="invoiceNo"
          header="송장번호"
          width="*"
          cssClassAll="ta-c"
          :allowMerging="true"
        />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group
        binding="etc"
        header="비고"
        align="center"
        width="*"
        cssClassAll="ta-c"
        :allowMerging="true"
      >
        <!-- <wj-flex-grid-column-group binding="etc" :width="70" align="center" cssClassAll="ta-c" :allowMerging="true"/> -->
      </wj-flex-grid-column-group>
    </wj-flex-grid>
    <!-- </ow-grid> -->
  </div>
</template>

<script setup>
  import afterPickingApi from '@/api/afterPickingApi.js';
  // 셀 병합 기준 조절 위함.
  import { SimpleMergeManager } from '@/utils/wijmo.grid';
  import { ref, reactive, toRefs } from 'vue';

  // 선택된 출고검수/패킹담당자
  const selectedAssignee = ref([null]);
  console.log('selectedAssignee.value : ' + selectedAssignee.value);
  // 선택된 검색기준
  const selectedSearchCategory = ref(null);
  // watch()

  const filterList =  reactive({
    // shippingCategory: null
    shippingCategory: '일반'
    , shippingWay: '합배송'
    , released: '출고'
    , assignee: '최'
    , orderNo: -1
    , clientName: null
    , shippingDestination: null
    , vendorName: null
  });
  const summaryList = reactive({
    status: {
      progressOrderNo: '100'
      // progressOrderNo: null
      , pickingDirectionNo: null
      , releaseInspectionNo: null
    }
    , delivery: {
      unreleasedNo: null
      , expressShippingNo: null
      , normalShippingNo: null
    }
  });
  const afterPickingList = ref([]);
      // 통신을 통한 데이터 바인딩.
  const releaseInspection_Packing_Data2 = ref([]);

  // 현황/배송구분 정보 불러오기.(새로고침 시에만 통신.)
  const getSummary = async () => {
    const result = await afterPickingApi.getSummary()
      .then((result) => {
        summaryList.status.progressOrderNo = result.summaryMap.progressOrderNo;
        summaryList.status.pickingDirectionNo = result.summaryMap.pickingDirectionNo;
        summaryList.status.releaseInspectionNo = result.summaryMap.releaseInspectionNo;
        summaryList.delivery.unreleasedNo = result.summaryMap.unreleasedNo;
        summaryList.delivery.expressShippingNo = result.summaryMap.expressShippingNo;
        summaryList.delivery.normalShippingNo = result.summaryMap.normalShippingNo;

        console.log('summaryList.status.progressOrderNo : ' + summaryList.status.progressOrderNo);
        console.log('summaryList.status.pickingDirectionNo : ' + summaryList.status.pickingDirectionNo);
        console.log('result.summaryMap.unreleasedNo : ' + result.summaryMap.unreleasedNo);
        console.log('result.summaryMap : ' + result.summaryMap);
        console.log('result.summaryMap.expressShippingNo : ' + result.summaryMap.expressShippingNo);
        console.log('result.summaryMap.normalShippingNo : ' + result.summaryMap.normalShippingNo);
        console.log('result.summaryMap.progressOrderNo : ' + result.summaryMap.progressOrderNo);
        console.log('result.summaryMap.pickingDirectionNo : ' + result.summaryMap.pickingDirectionNo);
        console.log('result.summaryMap.releaseInspectionNo : ' + result.summaryMap.releaseInspectionNo);
    });
  };
  getSummary();

  // 리스트 전체 조회.(페이지네이션 필요.)
  const getAfterPickingList = (filterList) => {
    const result = afterPickingApi.getAfterPickingList(filterList)
      .then((result) => {
        console.log('getAfterPickingList - JSON.stringify(result) : ' + JSON.stringify(result));
        afterPickingList.value = result.list;
        console.log('afterPickingList.value.length : ' + afterPickingList.value.length);
        // 출고번호
        console.log('afterPickingList.value[0]["release"]["releaseNo"] : ' + afterPickingList.value[0]["release"]["releaseNo"]);
        // 품목명
        console.log('afterPickingList.value[0]["item"]["itemName"] : ' + afterPickingList.value[0]["item"]["itemName"]);
        // 품목코드
        console.log('afterPickingList.value[0]["item"]["itemCode"] : ' + afterPickingList.value[0]["item"]["itemCode"]);
        // 피킹수량
        console.log('afterPickingList.value[0]["picking"]["pickingQty"] : ' + afterPickingList.value[0]["picking"]["pickingQty"]);
        // 검수수량
        console.log('afterPickingList.value[0]["releaseInspectionQuantity"] : ' + afterPickingList.value[0]["releaseInspectionQuantity"]);
        // 출고검수 - 미출고수량
        console.log('afterPickingList.value[0]["unReleased"] : ' + afterPickingList.value[0]["unReleased"]);
        // 패킹 - 미출고수량
        console.log('afterPickingList.value[0]["packing"]["unrelease"] : ' + afterPickingList.value[0]["packing"]["unrelease"]);
        // 거래처
        console.log('afterPickingList.value[0]["vendor"]["vendorName"] : ' + afterPickingList.value[0]["vendor"]["vendorName"]);
        // 배송지
        console.log('afterPickingList.value[0]["order"]["shippingDestination"] : ' + afterPickingList.value[0]["order"]["shippingDestination"]);
        // 배송구분
        console.log('afterPickingList.value[0]["order"]["shippingCategory"] : ' + afterPickingList.value[0]["order"]["shippingCategory"]);
        // 배송방식
        console.log('afterPickingList.value[0]["order"]["shippingWay"] : ' + afterPickingList.value[0]["order"]["shippingWay"]);
        // 출고검수 - 담당자
        console.log('afterPickingList.value[0]["employeeName"] : ' + afterPickingList.value[0]["employeeName"]);
        // 출고요청서 출력일시
        console.log('afterPickingList.value[0]["releasePrintDate"] : ' + afterPickingList.value[0]["releasePrintDate"]);
        // 거래명세서 출력일시
        console.log('afterPickingList.value[0]["receiptePrintDate"] : ' + afterPickingList.value[0]["receiptePrintDate"]);
        // 검수일시
        console.log('afterPickingList.value[0]["releaseInspectionDate"] : ' + afterPickingList.value[0]["releaseInspectionDate"]);
        // 출고 - 담당자
        console.log('afterPickingList.value[0]["release"]["employeeName"] : ' + afterPickingList.value[0]["release"]["employeeName"]);
        // 택배사
        console.log('afterPickingList.value[0]["release"]["shippingCompany"] : ' + afterPickingList.value[0]["release"]["shippingCompany"]);
        // 송장번호
        console.log('afterPickingList.value[0]["release"]["invoiceCode"] : ' + afterPickingList.value[0]["release"]["invoiceCode"]);
        // 출고검수 - 비고
        console.log('afterPickingList.value[0]["releaseInspectionNote"] : ' + afterPickingList.value[0]["releaseInspectionNote"]);
        // 패킹 - 비고
        console.log('afterPickingList.value[0]["packing"]["note"] : ' + afterPickingList.value[0]["packing"]["note"]);
        // 출고 - 비고
        console.log('afterPickingList.value[0]["release"]["note"] : ' + afterPickingList.value[0]["release"]["note"]);

///////
        console.log('*******afterPickingList.value.length : ' + afterPickingList.value.length);
        for(let i=0; i<afterPickingList.value.length; i++) {
            releaseInspection_Packing_Data2.value.push(
              {
                placingorderNo: afterPickingList.value[i]["release"]["releaseNo"]
                , itemName: afterPickingList.value[i]["item"]["itemName"]
                , itemCode: afterPickingList.value[i]["item"]["itemCode"]
                , pickingQty: afterPickingList.value[i]["picking"]["pickingQty"]
                , inspectionQty: afterPickingList.value[i]["releaseInspectionQuantity"]
                , packing_unrelease: (
                  afterPickingList.value[i]["unReleased"]
                  + afterPickingList.value[i]["packing"]["unrelease"]
                )
                , orderClient: afterPickingList.value[i]["vendor"]["vendorName"]
                , shippingDest: afterPickingList.value[i]["order"]["shippingDestination"]
                , shippingCat: afterPickingList.value[i]["order"]["shippingCategory"]
                , shippingWay: afterPickingList.value[i]["order"]["shippingWay"]
                , packing_personincharge: afterPickingList.value[i]["employeeName"]
                , releaseprintDate: afterPickingList.value[i]["releasePrintDate"]
                , transactionprintDate: afterPickingList.value[i]["receiptePrintDate"]
                , inspectionDate: afterPickingList.value[i]["releaseInspectionDate"]
                , boxQty: ' '
                // , boxQty: afterPickingList.value[i]["release"]["boxQuantity"]
                // 출고~/
                , release_personincharge: afterPickingList.value[i]["release"]["employeeName"]
                , deliveryCompany: afterPickingList.value[i]["release"]["shippingCompany"]
                , invoiceNo: afterPickingList.value[i]["release"]["invoiceCode"]
                , etc: ' '
                // , etc: afterPickingList.value[i]["packing"]["note"]
              }
            );
          }
/////
      });
    // return result;
  };
  getAfterPickingList(filterList);

  const state = reactive({
    flex: undefined,
    //
  });

  const onInitialized = (flex) => {
    const config = {
      groupingColumns: [0],
      mergedColumns: [0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    };

    flex.mergeManager = new SimpleMergeManager(config);
  };

  //
  const dropboxAssigneeLabel = '출고검수/패킹담당자';
  const dropboxAssigneeList = [
    { name: '전체', value: '0' }
    , { name: '최숙희', value: '1' }
    , { name: '이동현', value: '2' }
    , { name: '김예원', value: '3' }
    , { name: '신현주', value: '4' }
  ];
  const selectSearchLabel = '검색';
  const selectSearchList = [
    { name: '주문번호', value: '1' }
    , { name: '거래처', value: '2' }
    , { name: '배송지', value: '3' }
    , { name: '업체명', value: '4' }
  ];

  const emptyGroup = ref([]);
  const checkboxGroup1 = ref([
    { name: '긴급', value: '긴급' },
    { name: '일반', value: '일반' },
  ]);
  const checkboxGroup2 = ref([
    { name: '오스템', value: '오스템' },
    { name: '합배송', value: '합배송' },
  ]);
  const checkboxGroup3 = ref([
    { name: '출고', value: '출고' },
    { name: '미출고', value: '미출고' },
  ]);

</script>

<style lang="scss">
.ow-grid {
  .wj-cell {
    &.clr-red {
      color: #f60808;
    }
  }
}
</style>

<style>
/* use flex display to center-align cells vertically */
.wj-flexgrid .wj-cell {
  display: flex;
  align-items: center;
}
.wj-flexgrid .wj-cell.wj-align-left {
  justify-content: flex-start;
}
.wj-flexgrid .wj-cell.wj-align-right {
  justify-content: flex-end;
}

.wj-flexgrid .wj-cell.wj-align-center {
  justify-content: center;
}

.span.align-left {
  justify-content: flex-start;
}
</style>
