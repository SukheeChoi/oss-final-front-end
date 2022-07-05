<template>
  <div>
    <div class="row mb-4">
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title" onclick="location.href='/edu/Order'">주문</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item">계획 대비 실적 달성률</div>
            <div class="progress-bar">
              <span :data-value="statusCount.percent.percentOrd" :style="`width: ${statusCount.percent.percentOrd}%`"
                >{{ statusCount.percent.percentOrd }}%</span
              >
              <progress
                class="low"
                v-if="statusCount.percent.percentOrd < 80"
                :value="statusCount.percent.percentOrd"
                :max="100"
              ></progress>
              <progress
                class="mid"
                v-else-if="statusCount.percent.percentOrd < 100"
                :value="statusCount.percent.percentOrd"
                :max="100"
              ></progress>
              <progress class="high" v-else :value="statusCount.percent.percentOrd" :max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">
              {{ statusCount.status.OrderPlan }}건(<strong style="color: rgb(103, 146, 226)"
                >잔여 {{ statusCount.status.OrderPlan - statusCount.status.statusOrd }}건</strong
              >
              / <strong style="color: rgb(210, 57, 46)">미출고 6건</strong>)
            </div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ statusCount.status.statusOrd }}건</div>
          </div>
        </div>
      </div>
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title">피킹</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item">계획 대비 실적 달성률</div>
            <div class="progress-bar">
              <span :data-value="statusCount.percent.percentPick" :style="`width: ${statusCount.percent.percentPick}%`"
                >{{ statusCount.percent.percentPick }}%</span
              >
              <progress
                class="low"
                v-if="statusCount.percent.percentPick < 80"
                :value="statusCount.percent.percentPick"
                max="100"
              ></progress>
              <progress
                class="mid"
                v-else-if="statusCount.percent.percentPick < 100"
                :value="statusCount.percent.percentPick"
                max="100"
              ></progress>
              <progress class="high" v-else :value="statusCount.percent.percentPick" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">{{ statusCount.status.statusOrd }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ statusCount.status.statusPick }}건</div>
          </div>
        </div>
      </div>
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title" onclick="location.href='/edu/ReleaseInspection'">출고검수/패킹</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item">계획 대비 실적 달성률</div>
            <div class="progress-bar">
              <span :data-value="statusCount.percent.percentPack" :style="`width: ${statusCount.percent.percentPack}%`"
                >{{ statusCount.percent.percentPack }}%</span
              >
              <progress
                class="low"
                v-if="statusCount.percent.percentPack < 80"
                :value="statusCount.percent.percentPack"
                max="100"
              ></progress>
              <progress
                class="mid"
                v-else-if="statusCount.percent.percentPack < 100"
                :value="statusCount.percent.percentPack"
                max="100"
              ></progress>
              <progress class="high" v-else :value="statusCount.percent.percentPack" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">{{ statusCount.status.statusPick }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ statusCount.status.statusPack }}건</div>
          </div>
        </div>
      </div>
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title" onclick="location.href='/edu/Releases'">출고</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item">계획 대비 실적 달성률</div>
            <div class="progress-bar">
              <span :data-value="statusCount.percent.percentRls" :style="`width: ${statusCount.percent.percentRls}%`"
                >{{ statusCount.percent.percentRls }}%</span
              >
              <progress
                class="low"
                v-if="statusCount.percent.percentRls < 80"
                :value="statusCount.percent.percentRls"
                max="100"
              ></progress>
              <progress
                class="mid"
                v-else-if="statusCount.percent.percentRls < 100"
                :value="statusCount.percent.percentRls"
                max="100"
              ></progress>
              <progress class="high" v-else :value="statusCount.percent.percentRls" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">{{ statusCount.status.statusPack }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ statusCount.status.statusRls }}건</div>
          </div>
        </div>
      </div>
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title">택배사 인계</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item">계획 대비 실적 달성률</div>
            <div class="progress-bar">
              <span :data-value="statusCount.percent.percentRls" :style="`width: ${statusCount.percent.percentRls}%`"
                >{{ statusCount.percent.percentRls }}%</span
              >
              <progress
                class="low"
                v-if="statusCount.percent.percentRls < 80"
                :value="statusCount.percent.percentRls"
                max="100"
              ></progress>
              <progress
                class="mid"
                v-else-if="statusCount.percent.percentRls < 100"
                :value="statusCount.percent.percentRls"
                max="100"
              ></progress>
              <progress class="high" v-else :value="statusCount.percent.percentRls" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">{{ statusCount.status.statusRls }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ statusCount.status.statusTrf }}건</div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="item mt-4 mb-4">
      <div class="ow-flex-wrap item-size-content">
        <ow-filter-checkbox v-bind:items="checkboxGroup1" v-model="checkboxGroup2" :label="`배송구분`" />
        <ow-filter-radio v-bind:items="checkboxGroup3" v-model="checkboxGroup4" :label="`회사`" />
        <div class="item" style="--gap-item: 6px">
          <div class="ow-checkbox">
            <input type="checkbox" id="ow-chk" v-model="checkbox1" />
            <label for="ow-chk">미출고만 보기</label>
          </div>
        </div>
        <div class="item align-to-right" style="--gap-item: 6px">
          <div>
            <!-- <button class="ow-btn type-icon arrow-down arrow_down"></button> -->
            <button type="button" class="ow-btn type-icon arrow_down">
              <img
                src="@/assets/images/icon/ico_list.svg"
                style="border: 0.8px solid gray; width: 20px; padding: 2px"
              />
            </button>
            <div class="explain">
              <h3>처리단계 범례</h3>
              <div>
                <span class="ow-tag type-category"><i class="o">주</i></span
                >피킹지시 내려야할 건
              </div>
              <div>
                <span class="ow-tag type-category"><i class="p">피</i></span
                >피킹해야할 건
              </div>
              <div>
                <span class="ow-tag type-category"><i class="i">검</i></span
                >출고검수/패킹해야할 건
              </div>
              <div>
                <span class="ow-tag type-category"><i class="r">출</i></span
                >출고(송장번호 생성)해야할 건
              </div>
              <div>
                <span class="ow-tag type-category"><i class="t">인</i></span
                >택배사로 인계해야할 건
              </div>
              <br />
              <h3>주문번호 범례</h3>
              <div>
                <span class="ow-tag type-category"><i class="u">미</i></span
                >주문품목 중 미출고품목이 존재하는 주문
              </div>
              <div>
                <span class="ow-tag type-category"><i class="n">처</i></span
                >처리하지 않은 단계
              </div>
            </div>
          </div>
          <div class="title-field">검색</div>
          <div style="--width: 97px">
            <ow-select :items="searchCategoryList" v-model="searchCategory"></ow-select>
          </div>
          <div class="ow-input type-button" style="--width: 200px">
            <input type="text" v-model="searchCategoryContent" placeholder="검색어를 입력하세요." />
            <input type="submit" class="btn-search" @click="search" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <ow-n-grid
        :n="9"
        :itemsSource="receiptList"
        :initialized="initialize"
        :read="read"
        :autoRowHeights="true"
        selectionMode="None"
        :visible-rows-count="state.visibleRowsCount"
      >
        <template #left>&nbsp;</template>
        <wj-flex-grid-column binding="client" header="거래처" width="*" align="center" />
        <wj-flex-grid-column binding="level" header="처리단계" width="1.5*" align="center">
          <wj-flex-grid-cell-template cellType="Cell" let-cell="cell" v-slot="cell">
            <span class="ow-tag type-category"><i class="o">주</i></span>
            <span v-if="cell.item.level >= 2" class="ow-tag type-category"><i class="p">피</i></span>
            <span v-else class="ow-tag type-category"><i class="n">피</i></span>
            <span v-if="cell.item.level >= 3" class="ow-tag type-category"><i class="i">검</i></span>
            <span v-else class="ow-tag type-category"><i class="n">검</i></span>
            <span v-if="cell.item.level >= 4" class="ow-tag type-category"><i class="r">출</i></span>
            <span v-else class="ow-tag type-category"><i class="n">출</i></span>
            <span v-if="cell.item.level == 5" class="ow-tag type-category"><i class="t">인</i></span>
            <span v-else class="ow-tag type-category"><i class="n">인</i></span>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <!-- <wj-flex-grid-column cssClass="unrelease" binding="client" header="거래처" width="*" align="center">
          <wj-flex-grid-cell-template cellType="Cell" let-cell="cell" v-slot="cell">
            <span class="ow-tag type-category"><i class="u">미</i><strong style="color : rgb(210, 57, 46);">{{ cell.item.client }}</strong></span>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column cssClass="unrelease" binding="level" header="처리단계" width="1.5*" align="center">
          <wj-flex-grid-cell-template cellType="Cell" let-cell="cell" v-slot="cell">
            <span class="ow-tag type-category"><i class="o">주</i></span>
            <span v-if="cell.item.level >= 2" class="ow-tag type-category"><i class="p">피</i></span>
            <span v-else class="ow-tag type-category"><i class="n">피</i></span>
            <span v-if="cell.item.level >= 3" class="ow-tag type-category"><i class="i">검</i></span>
            <span v-else class="ow-tag type-category"><i class="n">검</i></span>
            <span v-if="cell.item.level >= 4" class="ow-tag type-category"><i class="r">출</i></span>
            <span v-else class="ow-tag type-category"><i class="n">출</i></span>
            <span v-if="cell.item.level == 5" class="ow-tag type-category"><i class="t">인</i></span>
            <span v-else class="ow-tag type-category"><i class="n">인</i></span>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column> -->
      </ow-n-grid>
    </div>
  </div>
</template>

<script setup>
import OwNGrid from '@/components/grid/new/OwNGrid';
import { reactive, ref, watch } from 'vue';
import clientApi from '@/api/customerReceipt';
import { requestLogout } from '../../../api/login';

const items = [];

//검색 카테고리
const searchCategory = ref(null);
//검색 내용
const searchCategoryContent = ref(null);

const filterList = reactive({
  shippingCategory: '',
  status: '',
  unreleased: '',
  orderNo: '',
  clientName: '',
});

const statusCount = reactive({
  status: {
    OrderPlan: null,
    statusOrd: null,
    statusPick: null,
    statusPack: null,
    statusRls: null,
    statusTrf: null,
  },
  percent: {
    percentOrd: null,
    percentPick: null,
    percentPack: null,
    percentRls: null,
    percentTrf: null,
  },
});

const receiptList = ref([]);

// progress바 조회
const getStatusCnt = async () => {
  const result = await clientApi.getStatusCnt().then((result) => {
    statusCount.status.OrderPlan = 200;
    statusCount.status.statusOrd = result[0] + result[1] + result[2] + result[3] + result[4];
    statusCount.status.statusPick = result[1] + result[2] + result[3] + result[4];
    statusCount.status.statusPack = result[2] + result[3] + result[4];
    statusCount.status.statusRls = result[3] + result[4];
    statusCount.status.statusTrf = result[4];

    statusCount.percent.percentOrd = parseInt((statusCount.status.statusOrd / statusCount.status.OrderPlan) * 100);
    statusCount.percent.percentPick = parseInt((statusCount.status.statusPick / statusCount.status.statusOrd) * 100);
    statusCount.percent.percentPack = parseInt((statusCount.status.statusPack / statusCount.status.statusPick) * 100);
    statusCount.percent.percentRls = parseInt((statusCount.status.statusRls / statusCount.status.statusPack) * 100);
    statusCount.percent.percentTrf = parseInt((statusCount.status.statusTrf / statusCount.status.statusRls) * 100);
  });
};
getStatusCnt();

// //리스트 조회
// const getFilterList = async (filterList) => {
//   const result = await clientApi.getFilterList(filterList).then((result) => {
//     console.log('getFilterList - JSON.stringify(result) : ' + JSON.stringify(result));
//     // receiptList.value = result.list;
//     console.log("Array.isArray(result) : " + result);
//     console.log("Array.isArray(result) : " + Array.isArray(result));
//     for (let i = 0; i < result.length; i++) {
//       items.push({
//         client: result[i]['client']['clientName'],
//         level: result[i]['status'],
//       });
//     }
//   });
// };
// getFilterList(filterList);

//ngrid 페이지 설정
const retrieve = (param) => {
  let filteredItems = _.cloneDeep(items);
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
  return result;
}

const state = reactive({
  visibleRowsCount: 15,
});

const initialize = (s) => {};

let globalIndex = 0;

// //미출고
const checkbox1 = ref([]);

// filter 초기값 : 배송구분 = '일반','긴급', 회사 = '0', 미출고 = 'false'
const checkboxGroup2 = ref(['긴급', '일반']);
const checkboxGroup4 = ref([]);

//배송구분
const checkboxGroup1 = ref([
  { name: '긴급', value: '긴급' },
  { name: '일반', value: '일반' },
]);

//회사
const checkboxGroup3 = ref([
  { name: '전체', value: '0' },
  { name: '주문확인', value: '1' },
  { name: '피킹', value: '2' },
  { name: '출고검수', value: '3' },
  { name: '출고', value: '4' },
  { name: '택배사 인계', value: '5' },
]);

//검색
const searchCategoryList = [
  { name: '주문번호', value: '주문번호' },
  { name: '거래처', value: '거래처' },
];

watch(
  [checkboxGroup2, checkboxGroup4, checkbox1],
  ([new1, new2, new3], [old1, old2, old3]) => {
    console.log('new1 : ', new1);
    console.log('new2 : ', new2);
    console.log('new3 : ', new3);
    console.log('new1.length : ', new1.length);
    console.log('new1[0] : ', new1[0]);
    if (new1.length == 2) {
      filterList.shippingCategory = ['긴급', '일반'];
    } else {
      filterList.shippingCategory = new1[0];
    }

    if (new2 == 0) {
      filterList.status = '0';
    } else {
      filterList.status = new2[0];
    }

    if (new3 == 'true') {
      filterList.unreleased = 'true';
    } else {
      filterList.unreleased = 'false';
    }
    console.log(
      'watch([checkboxGroup2, checkboxGroup4, checkbox1] : ' +
        filterList.shippingCategory +
        filterList.status +
        filterList.unreleased
    );
    getFilterList(filterList).then(() => {});
  },
  { deep: true }
);

function search() {
  if (searchCategory.value === '주문번호') {
    filterList.orderNo = searchCategoryContent.value;
  } else if (searchCategory.value === '거래처') {
    filterList.clientName = searchCategoryContent.value;
  }
  getFilterList(filterList).then(() => {});
}

//리스트 조회
const getFilterList = async (filterList) => {
  const result = await clientApi.getFilterList(filterList).then((result) => {
    console.log('getFilterList - JSON.stringify(result) : ' + JSON.stringify(result));
    // receiptList.value = result.list;
    console.log("result.length : " + result.length);
    console.log("Array.isArray(result) : " + Array.isArray(result));
    for (let i = 0; i < result.length; i++) {
      items.push({
        client: result[i]['client']['clientName'],
        level: result[i]['status'],
      });
    }
  });
};
getFilterList(filterList);

// // db에 filter값 보내기
// const dummy = async () => {
//   let list = await clientApi.getFilterList(checkboxGroup2, checkboxGroup4, checkbox1);
//   return list;
// };

// dummy().then((list) => {
//   for (let i = 0; i < list.length; i++) {
//     items.value.push({
//       //데이터 정제
//       client: list[i]['client']['clientName'],
//       level: list[i]['status'],
//       unrelease: list[i]['orderUnrelease'],
//     });
//   }
// });
</script>

<style>
.low {
  display: block; /* default: inline-block */
  border: 0 none;
  border-radius: 2px;
  background: gainsboro;
}

.low::-webkit-progress-bar {
  background: transparent;
}

.low::-webkit-progress-value {
  border-radius: 2px;
  background: rgb(246, 193, 68);
}

.mid {
  display: block; /* default: inline-block */
  border: 0 none;
  border-radius: 2px;
  background: gainsboro;
}

.mid::-webkit-progress-bar {
  background: transparent;
}

.mid::-webkit-progress-value {
  border-radius: 2px;
  background: rgb(63, 132, 88);
}

.high {
  display: block; /* default: inline-block */
  border: 0 none;
  border-radius: 2px;
  background: gainsboro;
}

.high::-webkit-progress-bar {
  background: transparent;
}

.high::-webkit-progress-value {
  border-radius: 2px;
  background: rgb(44, 112, 244);
}

.progress-bar span {
  position: absolute;
  display: inline-block;
  color: white;
  text-align: center;
}

.progress-bar {
  position: relative;
  background-color: white;
  width: 50%;
  height: 100%;
}

.arrow_down {
  opacity: 1; /* 불투명도 */
  display: block; /* 줄바꿈 */
  height: auto;
  transition: 0.5s ease; /* 속도 조절 */
  backface-visibility: hidden; /* 요소의 뒷면이 사용자를 향할 때 보이면 안됨 */
}

.explain {
  z-index: 100;
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  background-color: white;
  padding: 1em;
  border: 1px solid black;
}

.arrow_down:hover + .explain {
  opacity: 1;
}
</style>

<style lang="scss">
.ow-grid {
  .wj-cell {
    &.unrelease {
      background-color: rgb(248, 229, 227);
      color: rgb(210, 57, 46);
    }
  }
}
</style>