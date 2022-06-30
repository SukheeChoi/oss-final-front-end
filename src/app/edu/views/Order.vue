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
        :items="checkboxGroup1"
        v-model:modelValue="checkboxGroup4"
        :label="`회사`"
      />
      <ow-filter-checkbox name="checkboxGp2" :items="checkboxGroup2" v-model="checkboxGroup5" :label="`배송구분`" />
      <ow-filter-checkbox name="checkboxGp3" :items="checkboxGroup3" v-model="checkboxGroup6" :label="`미출고`" />
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
      headersVisibility="Column"
      :allowMerging="'Cells'"
      selectionMode="None"
      :read="read"
      class="ow-grid type-header-group"
      :initialized="onInitialized"
      :autoRowHeights="true"
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
          width="*"
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
        <wj-flex-grid-column-group binding="pickingEmployee" header="담당자" :width="50" align="center" />
        <wj-flex-grid-column-group binding="pickingQuantity" header="피킹수량" :width="50" align="center" />
        <wj-flex-grid-column-group binding="pickingDate" header="피킹일시" :width="50" align="center" />
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
        <wj-flex-grid-column-group binding="packingInspectionEmployee" header="담당자" :width="50" align="center" />
        <wj-flex-grid-column-group binding="inspectionDate" header="검수일시" :width="70" align="center" />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="출고">
        <wj-flex-grid-column-group binding="releaseEmployee" header="담당자" :width="50" align="center" />
        <wj-flex-grid-column-group binding="releaseDate" header="출고일시" :width="70" align="center" />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="인계">
        <wj-flex-grid-column-group binding="transferEmployee" header="담당자" :width="50" align="center" />
        <wj-flex-grid-column-group binding="transferDate" header="인계일시" :width="70" align="center" />
      </wj-flex-grid-column-group>
    </ow-grid>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch, computed, toRaw } from 'vue';
import orderApi from '@/api/orderApi';
import { SimpleMergeManager } from '@/utils/wijmo.grid';

export default {
  name: 'Order',
  setup() {
    const state = reactive({
      grid: undefined,
    });

    const checkboxGroup1 = ref([
      { name: '오스템제품', value: 'osstemItem' },
      { name: '오스템상품', value: 'osstemProduct' },
      { name: '협력사상품(합배송)', value: 'vendorproductPlus' },
      { name: '협력사상품(직배송)', value: 'vendorproductDir' },
    ]);

    const checkboxGroup2 = ref([
      { name: '긴급', value: 'emergency' },
      { name: '일반', value: 'normal' },
    ]);

    const checkboxGroup3 = ref([
      { name: '출고', value: 'released' },
      { name: '미출고', value: 'unreleased' },
    ]);

    const checkboxGroup4 = ref(['osstemItem', 'osstemProduct', 'vendorproductPlus', 'vendorproductDir']);
    const checkboxGroup5 = ref(['emergency', 'normal']);
    const checkboxGroup6 = ref(['released', 'unreleased']);

    const response = ref(null);
    const statusBar = reactive({
      total: null,
      osstem: null,
      vendorShippingPlus: null,
      vendorShippingDir: null,
      unreleased: null,
    });
    const searchSelected = ref(null);
    const searchContent = ref(null);
    const searchContent2 = ref(null);
    const dummy = ref(null);

    //필터 처리된 데이터 가져오는 함수

    //현황 가져오는 함수
    async function getStatus() {
      const result = await orderApi.getStatus().then((data) => {
        statusBar.total = data.total;
        statusBar.osstem = data.osstem;
        statusBar.vendorShippingPlus = data.vendorShippingPlus;
        statusBar.vendorShippingDir = data.vendorShippingDir;
        statusBar.unreleased = data.unreleased;
        console.log(data);
      });
    }

    //그리드에 바인딩 하는 함수
    async function read(query, pageNo, pageSize) {
      console.log(query, pageNo, pageSize, checkboxGroup4.value, checkboxGroup5.value, checkboxGroup6.value);

      const lee = await getFilterList();

      const result = {
        totalCount: 100,
        data: lee,
      };

      console.log('resultresultresultresultresultresultresultresultresultresultresultresultresultresult', result);
      return result;
    }

    async function getFilterList() {
      const result = await orderApi.getFilterList(
        checkboxGroup4.value,
        checkboxGroup5.value,
        checkboxGroup6.value,
        searchSelected.value,
        searchContent.value
      );
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', result);
      return result;
    }

    const onInitialized = (grid) => {
      state.grid = grid;
      console.log(state.grid);
      grid.autoSizeRow(0, true);

      const config = {
        groupingColumns: ['orderDate'],
        mergedColumns: ['orderDate', 'orderNo', 'clientName'],
      };

      grid.mergeManager = new SimpleMergeManager(config);

      grid.formatItem.addHandler((flex, e) => {
        if (e.panel == flex.columnHeaders) {
          e.cell.innerHTML = e.cell.textContent;
        }
      });
    };

    //체크된 데이터 감시해서 api요청
    watch(
      () => [checkboxGroup4, checkboxGroup5, checkboxGroup6, dummy],
      (newGroup, oldGroup) => {
        const query = null;
        const pageNo = null;
        const pageSize = null;
        
        read();
        onInitialized(state.grid);
        dummy.value = false;
      },
      { deep: true }
    );

    function getSearchList() {
      dummy.value = true;
    }

    getStatus();

    console.log('responseresponseresponse', response);
    return {
      ...toRefs(state),
      onInitialized,
      response,
      statusBar,
      read,
      searchSelected,
      searchContent,
      getSearchList,
      checkboxGroup1,
      checkboxGroup2,
      checkboxGroup3,
      checkboxGroup4,
      checkboxGroup5,
      checkboxGroup6,
    };
  },
};
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