<template>
  <div class="ow-flex-wrap dir-col" style="--gap: 10px">
    <div class="item">
      <div class="ow-flex-wrap">
        <div class="item size-fix" style="--gap-item: 6px">
          <div class="title-field">현황</div>
        </div>
        <div class="item">
          <div class="state">
            <div class="state-item">전체 : <strong>1360</strong>건</div>
            <div class="state-item">오스템 : <strong>360</strong>건</div>
            <div class="state-item">협력사합배송 : <strong>530</strong>건</div>
            <div class="state-item">협력사직배송 : <strong>470</strong>건</div>
            <div class="state-item" style="color: red">미출고 : <strong class="color-type-1">2</strong>건</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 배열을 이용한 동적 헤더  -->
    <div class="ow-flex-wrap item-size-content" style="--gap: 10px">
      <ow-filter-checkbox
        name="checkboxGp1"
        :items="checkboxGroup1"
        v-model:modelValue="checkboxGroup4"
        :label="`회사`"
      />
      <ow-filter-checkbox
        name="checkboxGp2"
        :items="checkboxGroup2"
        v-model:modelValue="checkboxGroup5"
        :label="`배송구분`"
      />
      <ow-filter-checkbox
        name="checkboxGp3"
        :items="checkboxGroup3"
        v-model:modelValue="checkboxGroup6"
        :label="`미출고`"
      />
      <div class="title-field">지점별 보기</div>
      <button class="ow-btn type-util">지점선택(전체)</button>

      <div class="item align-to-right" style="--gap-item: 6px">
        <div class="title-field">검색</div>
        <div class="ow-select" style="--width: 97px">
          <ow-select name="" id="">
            <option value="200">200건</option>
            <option value="500">500건</option>
            <option value="1000">1000건</option>
          </ow-select>
        </div>
        <div class="ow-input type-button" style="--width: 200px">
          <input type="text" placeholder="검색어를 입력하세요." />
          <input type="submit" class="btn-search" />
        </div>
      </div>
    </div>
  </div>

  <!-- 그리드 부분 -->
  <div class="ow-grid-wrap">
    <wj-flex-grid
      headersVisibility="Column"
      :allowMerging="'Cells'"
      selectionMode="None"
      :itemsSource="response"
      class="ow-grid type-header-group"
      :initialized="onInitialized"
      :autoRowHeights="true"
    >
      <wj-flex-grid-column-group header="주문">
        <wj-flex-grid-column-group
          binding="orderDate"
          header="주문일시"
          width="*"
          align="center"
          :allowMerging="true"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="orderNo"
          header="주문번호"
          width="*"
          align="center"
          :allowMerging="true"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="clientName"
          header="거래처"
          width="*"
          align="center"
          :allowMerging="true"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="itemName"
          header="품목명"
          width="*"
          align="center"
          wordWrap="true"
          multiLine="true"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="itemCode"
          header="품목코드"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="orderItemQuantity"
          header="주문수량"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="orderCategory"
          header="배송구분"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="vendorName"
          header="업체명"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="피킹지시">
        <wj-flex-grid-column-group
          binding="pickingDirectionAttempt"
          header="차수"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="pickingDirectionDate"
          header="지시일시"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="pickingDirectionQuantity"
          header="지시수량"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="pickingDirectionUnrelease"
          header="미출고"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="협력사">
        <wj-flex-grid-column-group
          binding="count3-1"
          header="배송방식"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="count3-2"
          header="주문확인일시"
          :width="100"
          align="center"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="count3-3"
          header="출고수량"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="count3-4"
          header="출고예정일자"
          :width="100"
          align="center"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="count3-4"
          header="수령일시"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="출고검수/패킹">
        <wj-flex-grid-column-group
          binding="count4-1"
          header="담당자"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="count4-2"
          header="검수일시"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="출고">
        <wj-flex-grid-column-group
          binding="count5-1"
          header="담당자"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="count5-2"
          header="출고일시"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group header="인계">
        <wj-flex-grid-column-group
          binding="count6-1"
          header="담당자"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="count6-2"
          header="인계일시"
          width="*"
          align="center"
          cssClassAll="border-right-sm"
        />
      </wj-flex-grid-column-group>
    </wj-flex-grid>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
import orderApi from '@/api/orderApi';
import { SimpleMergeManager } from '@/utils/wijmo.grid';
export default {
  name: 'Order',
  setup() {
    const state = reactive({
      flex: undefined,
    });

    const onInitialized = (flex) => {
      state.flex = flex;
      console.log('flex.onCellEditEnded', flex.onCellEditEnded);
      flex.onCellEditEnded = (...args) => {
        console.log('argsssssssssssssssssssss', args);
      };

      const config = {
        groupingColumns: ['orderDate'],
        mergedColumns: ['orderDate', 'orderNo', 'clientName'],
      };

      flex.mergeManager = new SimpleMergeManager(config);
    };

    const response = ref(null);

    async function getList() {
      const list = await orderApi.getAllList();
      response.value = list;
    }

    getList();

    return {
      ...toRefs(state),
      onInitialized,
      response,
    };
  },

  
  data() {
    return {
      checkboxGroup1: [
        { name: '오스템제품', value: '1' },
        { name: '오스템상품', value: '2' },
        { name: '협력사상품(합배송)', value: '3' },
        { name: '협력사상품(직배송)', value: '4' },
      ],
      checkboxGroup2: [
        { name: '긴급', value: '1' },
        { name: '일반', value: '2' },
      ],
      checkboxGroup3: [
        { name: '출고', value: '1' },
        { name: '미출고', value: '2' },
      ],
      checkboxGroup4: [],
      checkboxGroup5: [],
      checkboxGroup6: [],
      checkboxGroup7: [
        { a: '05-31 09:10', b: '2111293708', c: '현대치과\n이동현', d: 'SmartMembrane' },
        { a: '05-31 09:10', b: '2111293708', c: '현대치과\n이동현', d: 'SB Anchor' },
        { a: '05-31 09:10', b: '2111293708', c: '현대치과\n이동현', d: 'Cover Cap' },
        { a: '05-31 09:15', b: '2111293708', c: '현대치과 이동현', d: 'Cover Cap' },
      ],
    };
  },
};
</script>
<style scoped></style>
