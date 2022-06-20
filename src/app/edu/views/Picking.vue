<template>
  <div class="ow-flex-wrap dir-col" style="--gap: 10px">
    <div class="ow-flex-wrap item-size-content">
        <!-- 수령/전달 -->
      <div class="item size-fix" style="margin-right: 6px;">
        <button class="ow-btn type-group active"><span>수령</span></button>
        <button class="ow-btn type-group"><span>전달</span></button>
      </div>
      <!-- 담당자 이름 filter -->
      <div class="item size-fix" style="--gap-item: 6px">
        <div class="ow-filter" style="width: 270px;">
          <button class="ow-filter-btn-move prev">&lt;</button>
          <ul class="ow-filter-list">
            <li><input type="radio" id="btn-rd-2-1" name="btn-rd-group2" checked /><label class="ow-filter-button" for="btn-rd-2-1">이상욱</label></li>
            <li><input type="radio" id="btn-rd-2-2" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-2">박범희</label></li>
            <li><input type="radio" id="btn-rd-2-3" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-3">전규성</label></li>
            <li><input type="radio" id="btn-rd-2-4" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-4">소현우</label></li>
            <li><input type="radio" id="btn-rd-2-5" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-5">김수환</label></li>
            <li><input type="radio" id="btn-rd-2-6" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-6">이민기</label></li>
            <li><input type="radio" id="btn-rd-2-7" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-7">이동진</label></li>
            <li><input type="radio" id="btn-rd-2-8" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-8">김예원</label></li>
            <li><input type="radio" id="btn-rd-2-9" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-9">신현주</label></li>
            <li><input type="radio" id="btn-rd-2-10" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-10">이동현</label></li>
          </ul>
          <button class="ow-filter-btn-move next">></button>
        </div>
      </div>
      <div class="item align-to-right" style="gap: 6px;">
        <!-- 할일/한일 -->
        <div>
          <button class="ow-btn type-group active"><span>할일</span></button>
          <button class="ow-btn type-group"><span>한일</span></button>
        </div>
        <!-- 날짜 선택 -->
        <div>
          <div class="ow-input">
            <wj-input-date id="theDate" :initialized="initDate" class="ow-calendar"></wj-input-date>
            <span style="margin: 4px;">~</span>
            <wj-input-date id="theDate" :initialized="initDate" class="ow-calendar"></wj-input-date>
          </div>
        </div>
        <div>
          <!-- 조회 -->
          <button class="ow-btn type-util">조회</button>
          <!-- 품목전달(선택된 갯수) -->
          <button class="ow-btn type-util">품목전달(0)</button>  
        </div>
      </div>

      </div>
  </div>

  <!-- ngrid -->
  <ow-n-grid
    :initialized="initialize"
    :n="2"
    :read="read"
    :insert="insert"
    :update="update"
    :remove="remove"
    :visible-rows-count="state.visibleRowsCount"
  >
    <!-- draggable -->
    <wj-flex-grid-column header="No" binding="No" align="center" :width="40"></wj-flex-grid-column>
    <wj-flex-grid-column header="주문/출고번호" binding="order_release_no" align="center" width="2*"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목명" binding="itemName" width="3*"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목코드" binding="itemCode" align="center" width="*" wordWrap="true"></wj-flex-grid-column>
    <wj-flex-grid-column header="수량" binding="itemQuantity" :width="60"></wj-flex-grid-column>
    <wj-flex-grid-column header="미출고" binding="unreleased" :width="60"></wj-flex-grid-column>
    <wj-flex-grid-column header="전달여부" binding="delivered" align="center" :width="70" wordWrap="true">
      <wj-flex-grid-cell-template cellType="Cell">
        <button class="ow-btn type-icon check-state"></button>
        <!-- <button type="button" class="ow-btn type-flat ml-5" @click="lookup(cell.item.~)">선택</button> -->
      </wj-flex-grid-cell-template>
    </wj-flex-grid-column>
  </ow-n-grid>
  <!-- <div draggable="true" @dragstart="start">드래그 해보기</div> -->
</template>

<script>
// const countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
const items = [
  {No: 1, order_release_no: "2201042337/C_02_005", itemName: "122 Taper Drill", itemCode: "122TDD3506", itemQuantity: 1, unreleased: 0 }
  , {No: 2, order_release_no: "22010423828/C_02_001", itemName: "122 Taper Drill", itemCode: "122TDD3506", itemQuantity: 1, unreleased: 0 }
  , {No: 3, order_release_no: "2201042337/C_02_005", itemName: "Surgical Guide Template", itemCode: "OGTU02", itemQuantity: 1, unreleased: 0 }
  , {No: 4, order_release_no: "2201041332/C_02_004", itemName: "Surgical Guide Template", itemCode: "OGTU02", itemQuantity: 2, unreleased: 0 }
  , {No: 5, order_release_no: "2201043708/C_02_006", itemName: "SB Anchor", itemCode: "SBAC4030TSR", itemQuantity: 5, unreleased: 0 }
  , {No: 6, order_release_no: "2201043708/C_02_006", itemName: "Cover Cap", itemCode: "SBCC4000", itemQuantity: 2, unreleased: 0 }
  , {No: 7, order_release_no: "2201041015/C_02_002", itemName: "Cover Cap", itemCode: "SBCC4000", itemQuantity: 3, unreleased: 0 }
  , {No: 8, order_release_no: "2201043708/C_02_006", itemName: "SmartMembrane", itemCode: "SM2W10129SB", itemQuantity: 10, unreleased: 0 }
  , {No: 9, order_release_no: "2201042337/C_02_005", itemName: "Membrane LIFTER TUBE", itemCode: "SNMT", itemQuantity: 9, unreleased: 0 }
  , {No: 10, order_release_no: "2201042337/C_02_004", itemName: "Membrane LIFTER TUBE", itemCode: "SNMT", itemQuantity: 1, unreleased: 0 }
  , {No: 11, order_release_no: "2201044479/E_02_001", itemName: "Membrane LIFTER TUBE", itemCode: "SNMT", itemQuantity: 3, unreleased: 0 }
  , {No: 12, order_release_no: "2201043828/C_02_001", itemName: "Membrane LIFTER TUBE", itemCode: "SNMT", itemQuantity: 3, unreleased: 0 }
  , {No: 13, order_release_no: "2201041332/C_02_004", itemName: "SS III SA Fixture_NoMount", itemCode: "SS3R4010S18", itemQuantity: 1, unreleased: 0 }
  , {No: 14, order_release_no: "2201040991/C_02_003", itemName: "SS III SA Fixture_NoMount", itemCode: "SS3R4010S18", itemQuantity: 4, unreleased: 0 }
  , {No: 15, order_release_no: "2201043828/C_02_001", itemName: "SS III SA Fixture_NoMount", itemCode: "SS3R4010S18", itemQuantity: 3, unreleased: 0 }
  , {No: 16, order_release_no: "2201040991/C_02_002", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 5, unreleased: 0 }
  , {No: 17, order_release_no: "2201041015/C_02_002", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 1, unreleased: 0 }
  , {No: 18, order_release_no: "2201044479/E_02_001", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 10, unreleased: 0 }
  , {No: 19, order_release_no: "2201043828/C_02_001", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 5, unreleased: 0 }
  // 
  , {No: 20, order_release_no: "2201043828/C_02_001", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 5, unreleased: 0 }
  , {No: 21, order_release_no: "2201043828/C_02_001", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 5, unreleased: 0 }
  , {No: 22, order_release_no: "2201043828/C_02_001", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 5, unreleased: 0 }
  , {No: 23, order_release_no: "2201043828/C_02_001", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 5, unreleased: 0 }
  , {No: 24, order_release_no: "2201043828/C_02_001", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 5, unreleased: 0 }
];
// for (let i = 0; i < 100; i += 1) {
//   const index = parseInt(Math.random() * 100) % countries.length;
//   items.push({
//     id: i + 1,
//     country: countries[index],
//     sales: Math.random() * 10000,
//     expenses: Math.random() * 5000,
//   });
// }
const retrieve = (param) => {
  console.log('param', param);
  let filteredItems = _.cloneDeep(items);
  // if (param.country) {
  //   filteredItems = filteredItems.filter(
  //     (item) => (item.country ?? '').toUpperCase().indexOf(param.country.toUpperCase()) > -1
  //   );
  // }
  // if (param.sales) {
  //   filteredItems = filteredItems.filter((item) => item.sales > param.sales);
  // }
  // if (param.expenses) {
  //   filteredItems = filteredItems.filter((item) => item.expenses > param.expenses);
  // }
  const totalCount = filteredItems.length;
  if (param.sort) {
    filteredItems = _.sortBy(filteredItems, param.sort);
    if (['desc', 'DESC'].includes(param.direction)) {
      filteredItems = filteredItems.reverse();
    }
  }
  if (param.pageNo) {
    filteredItems = filteredItems.splice((param.pageNo - 1) * param.pageSize ?? 10, param.pageSize ?? 10);
  }

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

async function insert(item) {
  items.push(item);
  return true;
}

async function update(item) {
  const at = items.findIndex((target) => target.id === item.id);
  items[at] = item;
  return true;
}

async function remove(item) {
  const at = items.findIndex((target) => target.id === item.id);
  items.splice(at, 1);
  return true;
}

console.log('items', items);
import OwNGrid from '@/components/grid/new/OwNGrid';
import { reactive } from 'vue';
export default {
  name: 'TheOwNewGrid',
  components: {
    OwNGrid,
  },
  setup() {
    const state = reactive({
      visibleRowsCount: 20,
    });

    const initialize = (s) => {};

    let globalIndex = 0;

    const start = (e) => {
      // const index = parseInt(Math.random() * 100) % countries.length;
      const item = 
        {No: 1, order_release_no: 142654, itemName: "CoverCap", itemCode: "BD72S643", itemQuantity: 10, unreleased: 0 };
      // const item = {
      //   id: 10000 + (globalIndex += 1),
      //   country: countries[index],
      //   sales: Math.random() * 10000,
      //   expenses: Math.random() * 5000,
      // };
      e.dataTransfer.setData(DragDataItemFormat, JSON.stringify(item));
    };

    return {
      initialize,
      read,
      insert,
      update,
      remove,
      state,
      start,
    };
  },
};
</script>

<style>

</style>