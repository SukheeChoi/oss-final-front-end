<template>
  <div class="ow-flex-wrap dir-col" style="--gap: 10px">
      <div class="ow-flex-wrap item-size-content">
        <div class="item size-fix" style="--gap-item: 6px">
          <div class="title-field">현황</div>
        </div>
        <div class="item">
          <div class="state">
            <div class="state-item">주문 : <strong>{{summaryList.status.progressOrderNo}}</strong>건</div>
            <div class="state-item">피킹지시 : <strong>{{summaryList.status.pickingDirectionNo}}</strong>건</div>
            <div class="state-item">출고검수/패킹 : <strong>{{summaryList.status.releaseInspectionNo}}</strong>건</div>
            <div class="state-item color-type-1" style="color: red">미출고 : <strong class="color-type-1">{{summaryList.delivery.unreleasedNo}}</strong>건</div>
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

    <hr />

    <div class="item">
      <div class="ow-flex-wrap item-size-content">
          <div>
            <ow-filter-checkbox
              style="margin-right: 10px; margin-left: 5px"
              name="checkboxGroup1"
              v-bind:items="checkboxGroup1"
              v-model="checkedGroup1"
              :label="`배송구분`"
            />
          </div>
          <div>
            <ow-filter-checkbox
              name="checkboxGroup2"
              v-bind:items="checkboxGroup2"
              v-model="checkedGroup2"
              :label="`배송방식`"
            />
          </div>
          <div>
            <ow-filter-checkbox
              name="checkboxGroup3"
              style="margin-right: 10px; margin-left: 5px"
              v-bind:items="checkboxGroup3"
              :label="`미출고`"
              v-model="checkedGroup3"
            />
          </div>

          <div class="item align-to-right" style="--gap-item: 6px">
            <!-- 출고검수/패킹 담당자 필터링 드롭박스 -->
            <div style="--width: 90px">
              <ow-select :label="dropboxAssigneeLabel" :items="dropboxAssigneeList" v-model="selectedAssignee">
              </ow-select>
            </div>
            <!-- 검색기준 드롭박스 -->
            <div style="--width: 97px">
              <ow-select :label="selectSearchLabel" :items="selectSearchList" v-model="selectedSearchCategory">
              </ow-select>
            </div>
            <!-- 검색바 -->
            <div class="ow-input type-button" style="--width: 200px">
              <input type="text" v-model="inputKeyword" placeholder="검색어를 입력하세요." />
              <input type="submit" class="btn-search" @click="search" />
            </div>
          </div>
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
      :items-source="afterPickingList"
      :initialized="onInitialized"
      :allowMerging="7"
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
          binding="release.releaseNo"
          header="출고번호"
          align="center"
          :width="85"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="item.itemName"
          header="품목명"
          align="center"
          cssClassAll="ta-c border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="item.itemCode"
          header="품목코드"
          align="center"
          :width="110"
          cssClassAll="ta-c border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="picking.pickingQuantity"
          header="피킹수량"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="releaseInspection.releaseInspectionQuantity"
          header="검수수량"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
        />
        <!-- 합산 불필요(로직변경) -->
        <wj-flex-grid-column-group
          binding="strAfterPickingUnreleased"
          header="미출고수량"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="client.clientName"
          header="거래처"
          align="center"
          :width="100"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="order.shippingDestination"
          header="배송지"
          align="center"
          :width="100"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="order.shippingCategory"
          header="배송구분"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="order.shippingWay"
          header="배송방식"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="releaseInspection.employeeName"
          header="담당자"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="releaseInspection.releasePrintDate"
          header="출고요청서 출력일시"
          align="center"
          :width="110"
          cssClassAll="ta-c border-right-sm"
          multiLine="true"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="releaseInspection.receiptPrintDate"
          header="거래명세서 출력일시"
          align="center"
          :width="110"
          cssClassAll="ta-c border-right-sm"
          multiLine="true"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="releaseInspection.releaseInspectionDate"
          header="검수일시"
          align="center"
          :width="100"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="packing.boxQuantity"
          header="Box수량"
          width="*"
          cssClassAll="ta-c"
          :allowMerging="true"
        />
      </wj-flex-grid-column-group>
      <!-- <wj-flex-grid-column-group header="출고검수/패킹" align="center" cssClassAll="border-right-sm">
        <wj-flex-grid-column-group
          binding="releaseNo"
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
          binding="packingUnrelease"
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
          binding="packingPersonincharge"
          header="담당자"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="releasePrintDate"
          header="출고요청서 출력일시"
          align="center"
          :width="110"
          cssClassAll="ta-c border-right-sm"
          multiLine="true"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="receiptPrintDate"
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
      </wj-flex-grid-column-group> -->
      <!-- 출고 탭 -->
      <wj-flex-grid-column-group header="출고" align="center">
        <wj-flex-grid-column-group
          binding="release.employeeName"
          header="담당자"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="release.shippingCompany"
          header="택배사"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="release.invoiceCode"
          header="송장번호"
          width="*"
          cssClassAll="ta-c"
          :allowMerging="true"
        />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group
        binding="packing.note"
        header="비고"
        align="center"
        width="*"
        cssClassAll="ta-c"
        :allowMerging="true"
      >
      </wj-flex-grid-column-group>
      <!-- <wj-flex-grid-column-group header="출고" align="center">
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
      </wj-flex-grid-column-group> -->
    </wj-flex-grid>
    <!-- </ow-grid> -->
  </div>
</template>

<script setup>
  import afterPickingApi from '@/api/afterPickingApi.js';
  // 셀 병합 기준 조절 위함.
  import { SimpleMergeManager } from '@/utils/wijmo.grid';
  import { ref, reactive, toRefs, watch } from 'vue';

  // 선택된 출고검수/패킹담당자
  const selectedAssignee = ref(null);
  // 선택된 검색기준
  const selectedSearchCategory = ref(null);
  // 검색 키워드
  const inputKeyword = ref(null);

  const filterList =  reactive({
    shippingCategory: ''
    , shippingWay: ''
    , released: ''
    , assignee: ''
    , orderNo: -1
    , clientName: ''
    , shippingDestination: ''
    , vendorName: ''
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
  const releaseInspection_Packing_Data = ref(null);
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
  const getAfterPickingList = async () => {
    const result = await afterPickingApi.getAfterPickingList(filterList)
      .then((result) => {
        console.log('getAfterPickingList - JSON.stringify(result) : ' + JSON.stringify(result));
        afterPickingList.value = result.list;
        console.log('afterPickingList.value.length : ' + afterPickingList.value.length);
        
        // for(let i=0; i<afterPickingList.value.length; i++) {
        //     releaseInspection_Packing_Data2.value.push(
        //       {
        //         releaseNo: afterPickingList.value[i]["release"]["releaseNo"]
        //         , itemName: afterPickingList.value[i]["item"]["itemName"]
        //         , itemCode: afterPickingList.value[i]["item"]["itemCode"]
        //         , pickingQty: afterPickingList.value[i]["picking"]["pickingQty"]
        //         , inspectionQty: afterPickingList.value[i]["releaseInspectionQuantity"]
        //         , packingUnrelease: (
        //           parseInt(afterPickingList.value[i]["unReleased"])
        //           +
        //           parseInt(afterPickingList.value[i]["packing"]["unrelease"])
        //         )
        //         , orderClient: afterPickingList.value[i]["vendor"]["vendorName"]
        //         , shippingDest: afterPickingList.value[i]["order"]["shippingDestination"]
        //         , shippingCat: afterPickingList.value[i]["order"]["shippingCategory"]
        //         , shippingWay: afterPickingList.value[i]["order"]["shippingWay"]
        //         , packingPersonincharge: afterPickingList.value[i]["employeeName"]
        //         , releasePrintDate: afterPickingList.value[i]["releasePrintDate"]
        //         , receiptPrintDate: afterPickingList.value[i]["receiptPrintDate"]
        //         , inspectionDate: afterPickingList.value[i]["releaseInspectionDate"]
        //         , boxQty: ' '
        //         // , boxQty: afterPickingList.value[i]["release"]["boxQuantity"]
        //         // 출고~/
        //         , release_personincharge: afterPickingList.value[i]["release"]["employeeName"]
        //         , deliveryCompany: afterPickingList.value[i]["release"]["shippingCompany"]
        //         , invoiceNo: afterPickingList.value[i]["release"]["invoiceCode"]
        //         , etc: ' '
        //         // , etc: afterPickingList.value[i]["packing"]["note"]
        //       }
        //     );
        //   }
          // releaseInspection_Packing_Data.value = releaseInspection_Packing_Data2.value;
      });
    // return result;
  };
  getAfterPickingList();

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
    { name: '전체', value: '' }
    , { name: '최숙희', value: '최숙희' }
    , { name: '이동현', value: '이동현' }
    , { name: '김예원', value: '김예원' }
    , { name: '신현주', value: '신현주' }
  ];
  const selectSearchLabel = '검색';
  const selectSearchList = [
    { name: '주문번호', value: '주문번호' }
    , { name: '거래처', value: '거래처' }
    , { name: '배송지', value: '배송지' }
    , { name: '업체명', value: '업체명' }
  ];

  const checkedGroup1 = ref([]);
  const checkedGroup2 = ref([]);
  const checkedGroup3 = ref([]);
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

  // 체크된 값을 기준으로 필터링한 데이터를 받아오는 API요청.
  watch([checkedGroup1, checkedGroup2, checkedGroup3]
    , ([new1, new2, new3], [old1, old2, old3]) => {
      console.log('new1 : ', new1);
      console.log('new2 : ', new2);
      console.log('new3 : ', new3);
      console.log('new1.length : ', new1.length);
      console.log('new1[0] : ', new1[0]);
      // '배송구분' 체크박스의 체크된 값을 필터링용 반응형 객체에 대입.
      if(new1.length == 2) {
        filterList.shippingCategory = '전체';
      } else {
        filterList.shippingCategory = new1[0];
      }
      // '배송방식' 체크박스의 체크된 값을 필터링용 반응형 객체에 대입.
      if(new2.length == 2) {
        filterList.shippingWay = '전체';
      } else {
        filterList.shippingWay = new2[0];
      }
      // '미출고' 체크박스의 체크된 값을 필터링용 반응형 객체에 대입.
      if(new3.length == 2) {
        filterList.released = '전체';
      } else {
        filterList.released = new3[0];
      }
      console.log('watch([checkedGroup1, checkedGroup2, checkedGroup3] : ', filterList);
      getAfterPickingList()
        .then(() => {
          // releaseInspection_Packing_Data.value = afterPickingList.value;
        });
    }
    , {deep:true}
  );
  // 출고검수/패킹담담자가 선택된 경우, 드롭박스의 값을 필터링용 반응형 객체에 대입.
  watch(() => selectedAssignee.value
  , (newSelectedAssignee, oldSelectedAssignee) => {
    console.log('newSelectedAssignee : ', newSelectedAssignee);
    filterList.assignee = newSelectedAssignee;
    console.log('watch(() => selectedAssignee.value : ' + filterList);
    getAfterPickingList()
      .then(() => {
        // releaseInspection_Packing_Data.value = afterPickingList.value;
    });
  });

  // 필터링 키워드를 입력해서 조회한 경우.
  function search() {
    if(selectedSearchCategory.value === '주문번호') {
      filterList.orderNo = inputKeyword.value;
    } else if(selectedSearchCategory.value === '거래처') {
      filterList.clientName = inputKeyword.value;
    } else if(selectedSearchCategory.value === '배송지') {
      filterList.shippingDestination = inputKeyword.value;
    } else if(selectedSearchCategory.value === '업체명') {
      filterList.vendorName = inputKeyword.value;
    }
    console.log('function search() : ', filterList);
    getAfterPickingList()
      .then(() => {
        // releaseInspection_Packing_Data.value = afterPickingList.value;
    });
  }

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
