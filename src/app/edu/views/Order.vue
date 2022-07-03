<template>
  <div class="ow-flex-wrap dir-col" style="--gap: 10px">
    <div class="item">
      <div class="ow-flex-wrap">
        <div class="item size-fix" style="--gap-item: 6px">
          <div class="title-field">현황</div>
        </div>
        <div class="item">
          <div class="state">
            <div class="state-item">
              전체 : <strong>{{ statusBar.total }}</strong
              >건
            </div>
            <div class="state-item">
              오스템 : <strong>{{ statusBar.osstem }}</strong
              >건
            </div>
            <div class="state-item">
              협력사합배송 : <strong>{{ statusBar.vendorShippingPlus }}</strong
              >건
            </div>
            <div class="state-item">
              협력사직배송 : <strong>{{ statusBar.vendorShippingDir }}</strong
              >건
            </div>
            <div class="state-item" style="color: red">
              미출고 : <strong class="color-type-1">{{ statusBar.unreleased }}</strong
              >건
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <!-- 배열을 이용한 동적 헤더  -->
    <div class="ow-flex-wrap item-size-content" style="--gap: 10px">
      <ow-filter-checkbox
        name="checkboxGp1"
        :items="companyCheckbox"
        v-model:modelValue="selectCompany"
        :label="`회사`"
      />
      <ow-filter-checkbox name="checkboxGp2" :items="shippingCheckbox" v-model="selectShipping" :label="`배송구분`" />
      <ow-filter-checkbox name="checkboxGp3" :items="unreleaseCheckbox" v-model="selectUnrelease" :label="`미출고`" />
      <div class="title-field">지점별 보기</div>
      <button class="ow-btn type-util">지점선택(전체)</button>

      <div class="item align-to-right" style="--gap-item: 6px">
        <div class="title-field">검색</div>
        <div class="ow-select" style="--width: 97px">
          <select name="" id="" v-model="searchSelected">
            <option value="" selected hidden>선택</option>
            <option value="주문번호">주문번호</option>
            <option value="거래처">거래처</option>
          </select>
        </div>
        <div class="ow-input type-button" style="--width: 200px">
          <input type="text" v-model="searchContent" placeholder="검색어를 입력하세요." />
          <input type="submit" class="btn-search" @click="getSearchList()" />
        </div>
      </div>
    </div>
  </div>

  <!-- 그리드 부분 -->
  <div class="ow-grid-wrap">
    <ow-grid
      :allowMerging="'Cells'"
      :key="keyData"
      :read="getData"
      :visibleRowsCount="15"
      :initialized="onInitialized"
    >
      <template #left>&nbsp;</template>
      <wj-flex-grid-column-group header="주문">
        <wj-flex-grid-column-group
          binding="orderDate"
          header="주문일시"
          :width="90"
          align="center"
          :allowMerging="true"
          cssClassAll="border-center"
        />
        <wj-flex-grid-column-group
          binding="orderNo"
          header="주문번호"
          :width="90"
          align="left"
          :allowMerging="true"
          cssClassAll="border-center"
        />
        <wj-flex-grid-column-group
          binding="clientName"
          header="거래처"
          :width="100"
          align="left"
          :allowMerging="true"
          cssClassAll="border-center"
        />
        <wj-flex-grid-column-group
          binding="itemName"
          header="품목명"
          :width="130"
          :wordWrap="true"
          :multiLine="true"
          cssClassAll="border-left"
        />
        <wj-flex-grid-column-group binding="itemCode" header="품목코드" :width="110" align="left" />
        <wj-flex-grid-column-group binding="orderItemQuantity" header="주문수량" :width="50" align="right" />
        <wj-flex-grid-column-group binding="shippingCategory" header="배송구분" :width="50" align="center" />
        <wj-flex-grid-column-group binding="vendorName" header="업체명" :width="90" align="left" />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="피킹지시">
        <wj-flex-grid-column-group binding="pickingDirectionAttempt" header="차수" :width="30" align="center" />
        <wj-flex-grid-column-group binding="pickingDirectionDate" header="지시일시" :width="90" align="center" />
        <wj-flex-grid-column-group binding="pickingDirectionQuantity" header="지시수량" :width="50" align="center" />
        <wj-flex-grid-column-group binding="pickingDirectionUnrelease" header="미출고" :width="50" align="center" />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="피킹">
        <wj-flex-grid-column-group binding="pickingEmployee" header="담당자" :width="60" align="center" />
        <wj-flex-grid-column-group binding="pickingQuantity" header="피킹수량" :width="50" align="center" />
        <wj-flex-grid-column-group binding="pickingDate" header="피킹일시" :width="90" align="center" />
        <wj-flex-grid-column-group binding="pickingUnrelease" header="미출고" :width="50" align="center" />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="협력사">
        <wj-flex-grid-column-group binding="orderShippingWay" header="배송방식" :width="60" align="center" />
        <wj-flex-grid-column-group binding="orderCheckDate" header="주문확인<br>일시" :width="100" align="center" />
        <wj-flex-grid-column-group binding="releaseQuantity" header="출고수량" :width="50" align="center" />
        <wj-flex-grid-column-group binding="releaseScheduleDate" header="출고예정<br>일자" :width="60" align="center" />
        <wj-flex-grid-column-group binding="recieveDate" header="수령일시" :width="100" align="center" />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="출고검수/패킹">
        <wj-flex-grid-column-group binding="packingInspectionEmployee" header="담당자" :width="60" align="center" />
        <wj-flex-grid-column-group binding="inspectionDate" header="검수일시" :width="90" align="center" />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="출고">
        <wj-flex-grid-column-group binding="releaseEmployee" header="담당자" :width="60" align="center" />
        <wj-flex-grid-column-group binding="releaseDate" header="출고일시" :width="90" align="center" />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="인계">
        <wj-flex-grid-column-group binding="transferEmployee" header="담당자" :width="60" align="center" />
        <wj-flex-grid-column-group binding="transferDate" header="인계일시" :width="90" align="center" />
      </wj-flex-grid-column-group>
    </ow-grid>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, watch, computed, toRaw } from 'vue';
import orderApi from '@/api/orderApi';
import { SimpleMergeManager } from '@/utils/wijmo.grid';

const companyCheckbox = ref([
  { name: '오스템제품', value: 'osstemItem' },
  { name: '오스템상품', value: 'osstemProduct' },
  { name: '협력사상품(합배송)', value: 'vendorproductPlus' },
  { name: '협력사상품(직배송)', value: 'vendorproductDir' },
]);

const shippingCheckbox = ref([
  { name: '긴급', value: 'emergency' },
  { name: '일반', value: 'normal' },
]);

const unreleaseCheckbox = ref([
  { name: '출고', value: 'released' },
  { name: '미출고', value: 'unreleased' },
]);

const selectCompany = ref(['osstemItem', 'osstemProduct', 'vendorproductPlus', 'vendorproductDir']);
const selectShipping = ref(['emergency', 'normal']);
const selectUnrelease = ref(['released', 'unreleased']);

const getData = ref([]);
const keyData = ref(0);

const searchSelected = ref(null);
const searchContent = ref(null);

const selectButton = ref(null);

//현황 Bar
const statusBar = reactive({
  total: null,
  osstem: null,
  vendorShippingPlus: null,
  vendorShippingDir: null,
  unreleased: null,
});

//현황 가져오는 함수
async function getStatus() {
  
  //현황 api 호출
  const result = await orderApi.getStatus().then((data) => {
    statusBar.total = data.total;
    statusBar.osstem = data.osstem;
    statusBar.vendorShippingPlus = data.vendorShippingPlus;
    statusBar.vendorShippingDir = data.vendorShippingDir;
    statusBar.unreleased = data.unreleased;
    console.log(data);
  });
}
getStatus();


//그리드에 바인딩 하는 함수
getData.value = async function (query, pageNo, pageSize) {
  console.log(pageNo, pageSize, selectCompany.value, selectShipping.value, selectUnrelease.value);
  //pageNo = "페이지번호", pageSize = "한페이지 몇 행", totalCount = "전체 행 수"

  //그리드 데이터 api 호출
  const list = await orderApi.getFilterList(
    selectCompany.value, selectShipping.value, selectUnrelease.value, searchSelected.value, searchContent.value
    , pageNo, pageSize);
  
  const result = {
    ...list,
    pageNo,
    pageSize,
  };

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', result);
  return result;
}

//그리드 초기화 및 세팅
const onInitialized = (grid) => {

  //병합 기준 컬럼과, 병합 컬럼 설정
  const config = {
    groupingColumns: ['orderDate'],
    mergedColumns: ['orderDate', 'orderNo', 'clientName'],
  };

  //그리드 병합 세팅
  grid.mergeManager = new SimpleMergeManager(config);

  //그리드 헤더에 <br>태그 넣는 세팅
  grid.formatItem.addHandler((flex, e) => {
    console.log(flex);
    console.log(e);
    if (e.panel == flex.columnHeaders) {
      e.cell.innerHTML = e.cell.textContent;
    }
  });
};

//체크박스, 검색버튼 감시해서 read 재호출
watch(
  () => [selectCompany, selectShipping, selectUnrelease, selectButton],
  (newGroup, oldGroup) => {

    keyData.value++;
    selectButton.value = false;
  },
  { deep: true }
);

//검색 클릭 버튼
function getSearchList() {
  selectButton.value = true;
}

</script>
<style>
.wj-cell.wj-header {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: inherit;
}

.wj-cell.border-left {
  display: flex;
  align-items: center;
  line-height: inherit;
}

.wj-cell.border-center {
  display: flex;
  align-items: center;
  line-height: inherit;
}
</style>
