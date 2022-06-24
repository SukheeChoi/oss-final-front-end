<template>
  <div class="ow-flex-wrap dir-col" style="--gap: 10px">
    <div class="item">
      <div class="ow-flex-wrap">
        <div class="item size-fix" style="--gap-item: 6px">
          <div class="title-field">현황</div>
        </div>
        <div class="item">
          <div class="state">
            <div class="state-item">물품수령 : <strong>26</strong>품목/<string>538</string>개</div>
            <div class="state-item">검품검수 : <strong>8</strong>품목/<string>283</string>개</div>
            <div class="state-item">라벨링 : <strong>4</strong>품목/<string>120</string>개</div>
          </div>
        </div>
        <div class="item size-fix" style="--gap-item: 6px">
          <div class="title-field">검품검수현황</div>
        </div>
        <div class="item">
          <div class="state">
            <div class="state-item">양품 : <strong>8</strong>품목/<string>280</string>개</div>
            <div class="state-item">누락 : <strong>1</strong>품목/<string>1</string>개</div>
            <div class="state-item">파손 : <strong>4</strong>품목/<string>2</string>개</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex">
    <div class="left-side">
      <!-- Left -->
      <div class="d-flex justify-content-end">
        <button class="ow-btn type-util">예정시간수정</button>
        <button class="ow-btn type-util">추가</button>
      </div>
      <ow-tree-grid :initialized="initialize" :read="read" :query="['name']" :childItemsPath="childItemsPath">
        <!-- childitem 순서대로 입력하기 children(albert)아래 children(anton) -->
        <wj-flex-grid-column header="Name" binding="name" width="*"></wj-flex-grid-column>
        <wj-flex-grid-column header="Country" binding="country" width="2*" :is-required="true"></wj-flex-grid-column>
        <wj-flex-grid-column header="Sales" binding="sales" width="*" format="n2"></wj-flex-grid-column>
        <wj-flex-grid-column header="Expenses" binding="expenses" width="*" format="n2"></wj-flex-grid-column>
      </ow-tree-grid>
    </div>
    <!-- Right -->
    <div class="right-side">
      <div class="d-flex justify-content-end">
        <div class="item align-to-right" style="--gap-item: 6px">
          <div class="title-field">검색</div>
          <div class="ow-select" style="--width: 97px">
            <select name="" id="">
              <option value="" selected hidden>선택</option>
              <option value="주문번호">주문번호</option>
              <option value="거래처">거래처</option>
            </select>
          </div>
          <div class="ow-input type-button" style="--width: 200px">
            <input type="text" placeholder="검색어를 입력하세요." />
            <input type="submit" class="btn-search" />
          </div>
        </div>
      </div>
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title">■[이가을]검품검수 및 라벨링 내역</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-grid-wrap">
            <wj-flex-grid
              headersVisibility="Column"
              selectionMode="None"
              :itemsSource="data"
              class="ow-grid"
              :autoRowHeights="true"
            >
              <wj-flex-grid-column binding="id" header="아이디" :width="200" align="center" />
              <wj-flex-grid-column binding="country" header="국가" :width="200" align="center" />
              <wj-flex-grid-column binding="sales" header="가격" width="*" cssClassAll="ta-c" />
              <wj-flex-grid-column binding="expenses" header="판매" :width="200" align="center" Class="clr-red" />
            </wj-flex-grid>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const childItemsPath = ['children', 'children'];
const items = [
  {
    name: '전체',
    children: [
      {
        name: '이가을',
        sales: '20',
        children: [{ name: '오성엠엔디' }, { name: 'NSK 덴탈' }],
      },
      {
        name: '안병희',
        children: [
          {
            name: '태화메디칼',
            children: [{ name: 'Billy' }, { name: 'Bernard' }],
          },
          { name: '다온덴탈' },
          { name: 'Bob' },
        ],
      },
      {
        name: '최민정',
        children: [{ name: 'ivoclar vivadent' }, { name: 'Meisinger' }, { name: 'Carrie' }],
      },
      {
        name: 'Douglas',
        children: [{ name: 'Dinah' }, { name: 'Donald' }],
      },
    ],
  },
];

console.log(items);
const retrieve = (param) => {
  console.log('param', param);
  let filteredItems = _.cloneDeep(items);
  const totalCount = filteredItems.length;
  console.log('param', filteredItems);
  return Promise.resolve({
    data: filteredItems,
    status: 200,
    code: 'OK',
    message: 'Success',
    totalCount,
  });
};

async function read(query, pageNo, pageSize) {
  const result = await retrieve({
    ...query,
    pageNo,
    pageSize,
  });
  console.log('result', result);
  return result;
}

import WjFlexGrid from '@grapecity/wijmo.vue2.grid';
import TheActionPlan from '@@/tsk/components/TheActionPlan';
import TheApproval from '@@/eap/components/TheApproval';
import { CollectionView } from '@grapecity/wijmo';
import Test1 from '@@/edu/views/Test1';

export default {
  components: {
    WjFlexGrid,
    TheActionPlan,
    TheApproval,
  },
  setup() {
    const initialize = (s) => {};

    return {
      initialize,
      read,
    };
  },
};
</script>

<style>
.clr-red {
  color: #f60808;
}
.ow-panel .ow-panel-header {
  /* display: flex; */
  height: 26px;
  flex-shrink: 0;
  align-items: center;
  padding: 0 12px;
  background-color: #284077;
  border-radius: 4px 4px 0 0;
  color: #fff;
  font-size: 13px;
}
</style>
