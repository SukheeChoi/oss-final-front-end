<template>
  <div>
    <div class="row mb-4">
      <div class="ow-panel">
        <div class="ow-panel-header">
          <!-- 주문 단계를 누르면 해당 단계 관리 페이지로 이동 -->
          <div class="ow-panel-title" onclick="location.href='/edu/Order'">주문</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item">계획 대비 실적 달성률</div>
            <div class="progress-bar">
              <!-- 컴포넌트화 하기-->
              <!--  span 태그를 통해 progress바 위에 퍼센티지 수치를 나타냄 -->
              <span :data-value="percentOrd" :style="`width: ${percentOrd}%`">{{ percentOrd }}%</span>
              <!-- 퍼센트마다 progress바 다르게 적용 -->
              <progress class="low" v-if="percentOrd < 80" :value="percentOrd" :max="100"></progress>
              <progress class="mid" v-else-if="percentOrd < 100" :value="percentOrd" :max="100"></progress>
              <progress class="high" v-else :value="percentOrd" :max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">
              200건(<strong style="color: rgb(103, 146, 226)">잔여 {{ 200 - statusOrd }}건</strong> /
              <strong style="color: rgb(210, 57, 46)">미출고 5건</strong>)
            </div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ statusOrd }}건</div>
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
              <span :data-value="percentPick" :style="`width: ${percentPick}%`">{{ percentPick }}%</span>
              <progress class="low" v-if="percentPick < 80" :value="percentPick" max="100"></progress>
              <progress class="mid" v-else-if="percentPick < 100" :value="percentPick" max="100"></progress>
              <progress class="high" v-else :value="percentPick" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">{{ statusOrd }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ statusPick }}건</div>
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
              <span :data-value="percentPack" :style="`width: ${percentPack}%`">{{ percentPack }}%</span>
              <progress class="low" v-if="percentPack < 80" :value="percentPack" max="100"></progress>
              <progress class="mid" v-else-if="percentPack < 100" :value="percentPack" max="100"></progress>
              <progress class="high" v-else :value="percentPack" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">{{ statusPick }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ statusPack }}건</div>
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
              <span :data-value="percentRls" :style="`width: ${percentRls}%`">{{ percentRls }}%</span>
              <progress class="low" v-if="percentRls < 80" :value="percentRls" max="100"></progress>
              <progress class="mid" v-else-if="percentRls < 100" :value="percentRls" max="100"></progress>
              <progress class="high" v-else :value="percentRls" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">{{ statusPack }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ statusRls }}건</div>
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
              <span :data-value="percentTrf" :style="`width: ${percentTrf}%`">{{ percentTrf }}%</span>
              <progress class="low" v-if="percentTrf < 80" :value="percentTrf" max="100"></progress>
              <progress class="mid" v-else-if="percentTrf < 100" :value="percentTrf" max="100"></progress>
              <progress class="high" v-else :value="percentTrf" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">{{ statusRls }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ statusTrf }}건</div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="item mt-4 mb-4">
      <div class="ow-flex-wrap item-size-content">
        <!-- 배송구분(긴급/일반)으로 필터링 : 동시 선택 가능하기 때문에 checkbox -->
        <ow-filter-checkbox v-bind:items="checkboxGroup1" v-model="checkboxGroup2" :label="`배송구분`" />
        <!-- 주문 단계(주문확인/피킹/출고검수/출고/택배사 인계)로 필터링 : 하나의 단계만 선택 가능하기 때문에 radio -->
        <ow-filter-radio v-bind:items="checkboxGroup3" v-model="checkboxGroup4" :label="`단계`" />
        <!-- 미출고 필터링 : true, false -->
        <div class="item" style="--gap-item: 6px">
          <div class="ow-checkbox">
            <input type="checkbox" id="ow-chk" v-model="checkbox1" />
            <label for="ow-chk">미출고만 보기</label>
          </div>
        </div>
        <div class="item align-to-right" style="--gap-item: 6px">
          <div>
            <!-- hover 했을 때 범례 띄워줌 -->
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
            <ow-select v-bind:items="searchCategoryList" v-model="searchCategory"></ow-select>
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
        :itemsSource="items.value"
        :initialized="initialize"
        :read="read"
        :autoRowHeights="true"
        selectionMode="None"
        :visible-rows-count="state.visibleRowsCount"
      >
        <template #left>&nbsp;</template>
        <!-- formatitem-->
        <wj-flex-grid-column binding="client" header="거래처" width="*">
          <wj-flex-grid-cell-template cellType="Cell" let-cell="cell" v-slot="cell">
            <!-- 행 스타일을 미출고 값에 따라 다르게 적용 -->
            <span class="ow-tag type-category" :class="{ 'ow-tag-background': cell.item.unrelease }">
              <i class="u" v-if="cell.item.unrelease">미</i>
              <strong>{{ cell.item.client }}</strong>
            </span>
            <!-- <span class="ow-tag type-category" v-else
              ><i class="u">미</i><strong style="color: rgb(210, 57, 46)">{{ cell.item.client }}</strong></span
            > -->
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column binding="level" header="처리단계" width="1.5*" align="center">
          <wj-flex-grid-cell-template cellType="Cell" let-cell="cell" v-slot="cell">
            <!-- 주문 단계에 따라 아이콘 적용 -->
            <div :class="{ 'ow-tag-background': cell.item.unrelease }">
              <span class="ow-tag type-category"><i class="o">주</i></span>
              <span v-if="cell.item.level >= 2" class="ow-tag type-category"><i class="p">피</i></span>
              <span v-else class="ow-tag type-category"><i class="n">피</i></span>
              <span v-if="cell.item.level >= 3" class="ow-tag type-category"><i class="i">검</i></span>
              <span v-else class="ow-tag type-category"><i class="n">검</i></span>
              <span v-if="cell.item.level >= 4" class="ow-tag type-category"><i class="r">출</i></span>
              <span v-else class="ow-tag type-category"><i class="n">출</i></span>
              <span v-if="cell.item.level == 5" class="ow-tag type-category"><i class="t">인</i></span>
              <span v-else class="ow-tag type-category"><i class="n">인</i></span>
            </div>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
      </ow-n-grid>
    </div>
  </div>
</template>

<script setup>
import OwNGrid from '@/components/grid/new/OwNGrid';
import { reactive, ref, watch } from 'vue';
import clientApi from '@/api/customerReceipt';

const items = ref([]);
const statusOrd = ref(null);
const statusPick = ref(null);
const statusRls = ref(null);
const statusPack = ref(null);
const statusTrf = ref(null);
const percentOrd = ref(null);
const percentPick = ref(null);
const percentPack = ref(null);
const percentRls = ref(null);
const percentTrf = ref(null);

//검색 카테고리
const searchCategory = ref(null);
//검색 내용
const searchCategoryContent = ref(null);

// const receiptList = ref([]);

const filterList = reactive({
  shippingCategory: '',
  status: '',
  unreleased: '',
  // orderNo: '',
  // clientName: '',
});

//ngrid 페이지 설정
const retrieve = (param) => {
  let filteredItems = _.cloneDeep(items.value); //cloneDeep : 객체 복사
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

//보여지는 행 수
const state = reactive({
  visibleRowsCount: 15,
});

//초기화
const initialize = (s) => {};

// let globalIndex = 0;

//배송구분
const checkboxGroup1 = ref([
  { name: '긴급', value: '긴급' },
  { name: '일반', value: '일반' },
]);

//주문 단계
const checkboxGroup3 = ref([
  { name: '전체', value: '0' },
  { name: '주문확인', value: '1' },
  { name: '피킹', value: '2' },
  { name: '출고검수', value: '3' },
  { name: '출고', value: '4' },
  { name: '택배사 인계', value: '5' },
]);

const searchCategoryList = [
  { name: '주문번호', value: '주문번호' },
  { name: '거래처', value: '거래처' },
];

// filter 초기값 : 배송구분 : '일반','긴급', 주문 단계 : '0', 미출고만 보기 : 'false'
const checkboxGroup2 = ref(['일반', '긴급']);
const checkboxGroup4 = ref('0');
const checkbox1 = ref('false');

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
    getFilterList().then(() => {});
  },
  { deep: true }
);

// function search() {
//   if (searchCategory.value === '주문번호') {
//     filterList.orderNo = searchCategoryContent.value;
//   } else if (searchCategory.value === '거래처') {
//     filterList.clientName = searchCategoryContent.value;
//   }
//   getFilterList(filterList).then(() => {});
// }

const getFilterList = async () => {
  const result = await clientApi.getFilterList(filterList).then((result) => {
    console.log('getFilterList - JSON.stringify(result) : ' + JSON.stringify(result));
    // receiptList.value = result.list;
    console.log('result.length : ' + result.length);
    console.log('Array.isArray(result) : ' + Array.isArray(result));
    for (let i = 0; i < result.length; i++) {
      items.value.push({
        client: result[i]['client']['clientName'],
        level: result[i]['status'],
        unrelease: result[i]['orderUnrelease'],
      });
    }
  });
};
getFilterList();

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

//주문 단계 별 건수 요청
async function getCnt() {
  const cnt = await clientApi.getStatusCnt();
  statusOrd.value = cnt[0] + cnt[1] + cnt[2] + cnt[3] + cnt[4];
  statusPick.value = cnt[1] + cnt[2] + cnt[3] + cnt[4];
  statusPack.value = cnt[2] + cnt[3] + cnt[4];
  statusRls.value = cnt[3] + cnt[4];
  statusTrf.value = cnt[4];
  //주문 단계마다 완료 퍼센트
  percentOrd.value = parseInt((statusOrd.value / 200) * 100);
  percentPick.value = parseInt((statusPick.value / statusOrd.value) * 100);
  percentPack.value = parseInt((statusPack.value / statusPick.value) * 100);
  percentRls.value = parseInt((statusRls.value / statusPack.value) * 100);
  percentTrf.value = parseInt((statusTrf.value / statusRls.value) * 100);

  return cnt;
}
getCnt();
</script>

<style>
.low {
  display: block;
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
  display: block;
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
  display: block;
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

.progress-bar {
  position: relative;
  background-color: white;
  width: 50%;
  height: 100%;
}

.progress-bar span {
  position: absolute;
  display: inline-block;
  color: white;
  text-align: center;
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
// .ow-grid {
//   .wj-cell {
//     &.ifUnrelease {
//       background-color: rgb(248, 229, 227);
//       color: rgb(210, 57, 46);
//     }
//   }
// }

.ow-tag-background::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(248, 229, 227, 0.5);
  // z-index: -1;
}
</style>
