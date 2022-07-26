<template>
  <div class="ow-flex-wrap dir-col" style="--gap: 10px">
    <div class="ow-flex-wrap item-size-content">
      <div class="item size-fix" style="--gap-item: 6px">
        <div class="title-field">현황</div>
      </div>
      <div class="item">
        <div class="state">
          <div class="state-item">
            주문 : <strong>{{ summaryList.status.progressOrderNum }}</strong
            >건
          </div>
          <div class="state-item">
            피킹지시 : <strong>{{ summaryList.status.pickingDirectionNum }}</strong
            >건
          </div>
          <div class="state-item">
            출고검수/패킹 : <strong>{{ summaryList.status.releaseInspectionNum }}</strong
            >건
          </div>
          <div class="state-item color-type-1" style="color: red">
            미출고 : <strong class="color-type-1">{{ summaryList.delivery.unreleasedNum }}</strong
            >건
          </div>
        </div>
      </div>

      <div class="item size-fix" style="--gap-item: 6px">
        <div class="title-field">배송구분</div>
      </div>
      <div class="item">
        <div class="state">
          <div class="state-item">
            출고검수(긴급/일반) :
            <strong>{{ summaryList.status.releaseInspectionNum }}</strong>
            건 (
            <strong>{{ summaryList.delivery.expressShippingNum }}</strong>
            건/
            <strong>{{ summaryList.delivery.normalShippingNum }}</strong>
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
          <div style="--width: 130px">
            <ow-select :label="dropboxAssigneeLabel" :items="dropboxAssigneeList" v-model="selectedAssignee">
            </ow-select>
          </div>
          <!-- 검색기준 드롭박스 -->
          <div style="--width: 130px">
            <ow-select :label="selectSearchLabel" :items="selectSearchList" v-model="selectedSearchCategory">
            </ow-select>
          </div>
          <!-- 검색바 -->
          <div class="ow-input type-button" style="--width: 200px">
            <input type="text" v-model="inputKeyword" placeholder="입력" />
            <input type="submit" class="btn-search" @click="search" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
  <!-- <div class="ow-flex-wrap ow-grid-wrap"> -->
    <ow-grid
      headersVisibility="Column"
      allowSorting="None"
      selectionMode="RowRange"
      :visibleRowsCount="18"
      :autoGenerateColumns="false"
      class="ow-grid type-header-group"
      :read="getAfterPickingList"
      :initialized="onInitialized"
      style="display: flex"
      :key="afterPickingKey"
    >
      <!-- :allowMerging="All" -->
      <!-- 출고검수/패킹 탭 -->
      <wj-flex-grid-column-group header="출고검수/패킹" align="center" cssClassAll="border-right-sm border-center">
        <wj-flex-grid-column-group
          binding="RLS_CODE"
          header="출고번호"
          align="center"
          :width="80"
          cssClassAll="border-right-sm border-center"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="ITM_NAME"
          header="품목명"
          align="left"
          width="*"
          cssClassAll="border-right-sm border-center"
        />
        <wj-flex-grid-column-group
          binding="ITM_CODE"
          header="품목코드"
          align="left"
          :width="110"
          cssClassAll="border-right-sm border-center"
        />
        <wj-flex-grid-column-group
          binding="PIC_QTY"
          header="피킹수량"
          align="right"
          :width="50"
          cssClassAll="border-right-sm border-center"
        />
        <wj-flex-grid-column-group
          binding="RI_QTY"
          header="검수수량"
          align="right"
          :width="50"
          cssClassAll="ta-c border-right-sm border-center"
        />
        <!-- 합산 불필요(로직변경) -->
        <wj-flex-grid-column-group
          binding="OI_URLS_QTY"
          header="미출고수량"
          align="right"
          :width="55"
          cssClassAll="border-right-sm border-center"
        />
        <wj-flex-grid-column-group
          binding="CLT_NAME"
          header="거래처"
          align="left"
          :width="100"
          cssClassAll="border-right-sm border-center"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="ORD_SHP_DEST"
          header="배송지"
          align="left"
          :width="100"
          cssClassAll="border-right-sm border-center"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="ORD_SHP_CAT"
          header="배송구분"
          align="center"
          :width="70"
          cssClassAll="border-right-sm border-center"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="ORD_SHP_WAY"
          header="배송방식"
          align="center"
          :width="70"
          cssClassAll="border-right-sm border-center"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="RI_EMP_NAME"
          header="담당자"
          align="center"
          :width="60"
          cssClassAll="border-right-sm border-center"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="RI_RLS_PRT_DT"
          header="출고요청서
          출력일시          "
          align="center"
          :width="100"
          cssClassAll="border-right-sm border-center"
          multiLine="true"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="RI_RCPT_PRT_DT"
          header="거래명세서
          출력일시          "
          align="center"
          :width="100"
          cssClassAll="border-right-sm border-center"
          multiLine="true"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="RI_DT"
          header="검수일시"
          align="center"
          :width="90"
          cssClassAll="border-right-sm border-center"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="RLS_BX_QTY"
          header="Box수량"
          align="right"
          :width="60"
          cssClassAll="border-right-sm border-center"
          :allowMerging="true"
        />
      </wj-flex-grid-column-group>
      <!-- 출고 탭 -->
      <wj-flex-grid-column-group header="출고" align="center">
        <wj-flex-grid-column-group
          binding="R_EMP_NAME"
          header="담당자"
          align="center"
          :width="60"
          cssClassAll="border-right-sm border-center"
        />
          <!-- :allowMerging="true" -->
        <wj-flex-grid-column-group
          binding="RLS_SHP_CPN"
          header="택배사"
          align="center"
          :width="70"
          cssClassAll="border-right-sm border-center"
        />
          <!-- :allowMerging="true" -->
        <wj-flex-grid-column-group
          binding="RLS_IVC_CODE"
          header="송장번호"
          align="left"
          :width="100"
          cssClassAll="border-center"
          :allowMerging="true"
        />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group
        binding="OI_NT"
        header="비고"
        align="center"
        :width="100"
        cssClassAll="border-center"
        :allowMerging="true"
      >
      <wj-flex-grid-column-group
        binding="OI_NT"
        header="비고"
        align="center"
        :width="100"
        cssClassAll="border-center"
        :allowMerging="true"
      >
      </wj-flex-grid-column-group>
      </wj-flex-grid-column-group>
    </ow-grid>
  </div>
</template>

<script setup>
import afterPickingApi from '@/api/afterPickingApi.js';
// 셀 병합 기준 조절 위함.
import { SimpleMergeManager } from '@/utils/wijmo.grid';
// import { SimMergeManager } from '@/utils/wijmo.grid';
import { ref, reactive, watch } from 'vue';

const dropboxAssigneeLabel = '출고검수/패킹담당자';
//출고검수/패킹 담당자 필터링 드롭박스 바인딩 객체.
const dropboxAssigneeList = ref([]);
// 선택된 출고검수/패킹담당자
const selectedAssignee = ref('');
// 선택된 검색기준
const selectedSearchCategory = ref('주문번호');
// 검색 키워드
const inputKeyword = ref(null);

const filterList = reactive({
  shippingCategory: null,
  shippingWay: null,
  released: null,
  assignee: null,
  orderNo: null,
  clientName: null,
  shippingDestination: null,
  vendorName: null,

  pageNo: 1,
  pageSize: 18
});
const summaryList = reactive({
  status: {
    progressOrderNum: null,
    pickingDirectionNum: null,
    releaseInspectionNum: null,
  },
  delivery: {
    unreleasedNum: null,
    expressShippingNum: null,
    normalShippingNum: null,
  },
});
// 통신을 통한 데이터 바인딩.
const afterPickingList = ref([]);
const afterPickingKey = ref(1);

// 현황/배송구분 정보 불러오기.(새로고침 시에만 통신.)
const getSummary = async () => {
  const result = await afterPickingApi.getSummary().then((result) => {
    summaryList.status.progressOrderNum = result.ORD_NUM;
    summaryList.status.pickingDirectionNum = result.PIC_DIR_NUM;
    summaryList.status.releaseInspectionNum = result.RLS_INSP_NUM;
    summaryList.delivery.unreleasedNum = result.URLS_NUM;
    summaryList.delivery.expressShippingNum = result.EX_NUM;
    summaryList.delivery.normalShippingNum = result.NM_NUM;
  });
};
getSummary();

// 출고검수/패킹담당자 필터링용 드롭박스에 바인딩할 객체 조회.
async function getAssigneeList() {
  const result = await afterPickingApi.getAssigneeList(filterList).then((result) => {
    if (result != null && result.list != null) {
      let dbAssigneeList = [];
      dbAssigneeList.push({
        name: '전체',
        value: null,
      });
      for (let i = 0; i < result.list.length; i++) {
        dbAssigneeList.push({
          name: result.list[i],
          value: result.list[i],
        });
      }
      dropboxAssigneeList.value = dbAssigneeList;
    } else {
      dropboxAssigneeList.value = [];
    }
  });
}
getAssigneeList(filterList);

// 리스트 전체 조회.
const getAfterPickingList = async (query, pageNo, pageSize) => {
  // filterList.pageNo = pageNo;
  console.log('@@ const getAfterPickingList - pageNo : ', pageNo);
  let filter = JSON.parse(JSON.stringify(filterList));
  filter.pageNo = pageNo;
  console.log('!!! filter : ', filter);
  const result = await afterPickingApi.getAfterPickingList(filter);
  // const result = await afterPickingApi.getAfterPickingList(filterList);
  // const result = await afterPickingApi.getAfterPickingList(filterList, pageNo, pageSize=18);
  if (result != null && result.list != null) {
    afterPickingList.value = result.list;
    console.log('## afterPickingList.value.length : ' + afterPickingList.value.length);
    // 필터값이 바뀔 때만 담당자 목록 새로 조회해야 하는거 아닌가?
    // 리스트를 조회할 때 마다, 조회되는 리스트에 맞는 출고검수/패킹 담당자 목록을 조회해서 동적으로 드롭박스에 할당.
    // getAssigneeList(filterList);
  } else {
    // 조회된 목록이 없는 경우:
    // 그리드의 셀을 비우고 && 출고검수/패킹 담당자 드롭박스 비우기.
    afterPickingList.value = [];
    // dropboxAssigneeList.value = []; // 담당자 드롭박스 안 비우는게 낫나?
  }
  const result2 = {
    data: afterPickingList.value,
    pageNo: result.pager.pageNo,
    pageSize: result.pager.rowsPerPage,
    totalCount: result.pager.totalRows,
  };
  console.log('$$ result2 : ', result2);
  return result2;
};

const onInitialized = (flex) => {
  const config = {
    groupingColumns: [0],
    mergedColumns: [0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  };

  flex.mergeManager = new SimpleMergeManager(config);
  // flex.mergeManager = new SimMergeManager(config);

};

const selectSearchLabel = '검색';
const selectSearchList = [
  { name: '주문번호', value: '주문번호' },
  { name: '거래처', value: '거래처' },
  { name: '배송지', value: '배송지' },
  { name: '업체명', value: '업체명' },
];

const checkedGroup1 = ref(['긴급', '일반']);
const checkedGroup2 = ref(['오스템', '합배송']);
const checkedGroup3 = ref(['출고', '미출고']);
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
watch(filterList,
(newFilterList, oldFilterList) => {
  afterPickingKey.value++;
  getAssigneeList(filterList);
  }
  , {deep: true}
);

// 체크된 값을 기준으로 필터링한 데이터를 받아오는 API요청.
watch(
  [checkedGroup1, checkedGroup2, checkedGroup3],
  ([new1, new2, new3], [old1, old2, old3]) => {
    // '배송구분' 체크박스의 체크된 값을 필터링용 반응형 객체에 대입.
    if (new1.length == 2) {
      filterList.shippingCategory = null;
    } else {
      filterList.shippingCategory = new1[0];
    }
    // '배송방식' 체크박스의 체크된 값을 필터링용 반응형 객체에 대입.
    if (new2.length == 2) {
      filterList.shippingWay = null;
    } else {
      filterList.shippingWay = new2[0];
    }
    // '미출고' 체크박스의 체크된 값을 필터링용 반응형 객체에 대입.
    if (new3.length == 2) {
      filterList.released = null;
    } else {
      filterList.released = new3[0];
    }
  },
  { deep: true }
);
// 출고검수/패킹담담자가 선택된 경우, 드롭박스의 값을 필터링용 반응형 객체에 대입.
watch(
  () => selectedAssignee.value,
  (newSelectedAssignee, oldSelectedAssignee) => {
    console.log('watch selectedAssignee.value : ' + selectedAssignee.value);
    filterList.assignee = newSelectedAssignee;
  }
);

// 필터링 키워드를 입력해서 조회한 경우.
function search() {
  if (selectedSearchCategory.value === '주문번호') {
    filterList.orderNo = inputKeyword.value;
    filterList.clientName = null;
    filterList.shippingDestination = null;
    filterList.vendorName = null;
  } else if (selectedSearchCategory.value === '거래처') {
    filterList.orderNo = null;
    filterList.clientName = inputKeyword.value;
    filterList.shippingDestination = null;
    filterList.vendorName = null;
  } else if (selectedSearchCategory.value === '배송지') {
    filterList.orderNo = null;
    filterList.clientName = null;
    filterList.shippingDestination = inputKeyword.value;
    filterList.vendorName = null;
  } else if (selectedSearchCategory.value === '업체명') {
    filterList.orderNo = null;
    filterList.clientName = null;
    filterList.shippingDestination = null;
    filterList.vendorName = inputKeyword.value;
  }
}
</script>

<style lang="scss" scoped>
:deep {
  .wj-cell.wj-header {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: inherit;

    color: #333333;
    background-color: #E8ECF1;
    // background-color: #E1E7EE;
  }

  .wj-flexgrid .wj-cell.wj-align-center {
    justify-content: center;
  }

  .wj-cell.border-center {
    display: flex;
    align-items: center;
    line-height: inherit;
  }
}
</style>