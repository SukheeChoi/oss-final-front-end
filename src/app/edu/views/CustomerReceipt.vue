<!-- 김예원 -->
<template>
  <div>
    <div class="row mb-4">
      <status-progress-bar :title="'주문'"/>
      <div class="ow-panel">
        <div class="ow-panel-header">
          <!-- 주문 단계를 누르면 해당 단계 관리 페이지로 이동 -->
          <div class="ow-panel-title" onclick="location.href='/edu/Order'">주문</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item txt-dot-square">계획 대비 실적 달성률</div>
            <div class="progress-bar">
              <!--  span 태그를 통해 progress바 위에 퍼센티지 수치를 나타냄 -->
              <span :data-value="percentOrd" :style="`width: ${percentOrd}%`">{{ percentOrd }}%</span>
              <!-- 퍼센트마다 progress바 다르게 적용 -->
              <progress class="low" v-if="percentOrd < 60" :value="percentOrd" :max="100"></progress>
              <progress class="mid" v-else-if="percentOrd < 80" :value="percentOrd" :max="100"></progress>
              <progress class="high" v-else :value="percentOrd" :max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item txt-dot-square">계획</div>
            <div class="align-to-right">
              {{ orderPlan }}건(<strong style="color: rgb(103, 146, 226)">잔여 {{ orderPlan - statusOrd }}건</strong> / <strong style="color: rgb(210, 57, 46)">미출고 {{ unreleaseCnt }}건</strong>)
            </div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item txt-dot-square">실적</div>
            <div class="align-to-right">{{ statusOrd - unreleaseCnt }}건</div>
          </div>
        </div>
      </div>
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title">피킹</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item txt-dot-square">계획 대비 실적 달성률</div>
            <div class="progress-bar">
              <span :data-value="percentPick" :style="`width: ${percentPick}%`">{{ percentPick }}%</span>
              <progress class="low" v-if="percentPick < 60" :value="percentPick" max="100"></progress>
              <progress class="mid" v-else-if="percentPick < 80" :value="percentPick" max="100"></progress>
              <progress class="high" v-else :value="percentPick" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item txt-dot-square">계획</div>
            <div class="align-to-right">{{ statusOrd }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item txt-dot-square">실적</div>
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
            <div class="item txt-dot-square">계획 대비 실적 달성률</div>
            <div class="progress-bar">
              <span :data-value="percentPack" :style="`width: ${percentPack}%`">{{ percentPack }}%</span>
              <progress class="low" v-if="percentPack < 60" :value="percentPack" max="100"></progress>
              <progress class="mid" v-else-if="percentPack < 80" :value="percentPack" max="100"></progress>
              <progress class="high" v-else :value="percentPack" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item txt-dot-square">계획</div>
            <div class="align-to-right">{{ statusPick }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item txt-dot-square">실적</div>
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
            <div class="item txt-dot-square">계획 대비 실적 달성률</div>
            <div class="progress-bar">
              <span :data-value="percentRls" :style="`width: ${percentRls}%`">{{ percentRls }}%</span>
              <progress class="low" v-if="percentRls < 60" :value="percentRls" max="100"></progress>
              <progress class="mid" v-else-if="percentRls < 80" :value="percentRls" max="100"></progress>
              <progress class="high" v-else :value="percentRls" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item txt-dot-square">계획</div>
            <div class="align-to-right">{{ statusPack }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item txt-dot-square">실적</div>
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
            <div class="item txt-dot-square">계획 대비 실적 달성률</div>
            <div class="progress-bar">
              <span :data-value="percentTrf" :style="`width: ${percentTrf}%`">{{ percentTrf }}%</span>
              <progress class="low" v-if="percentTrf < 60" :value="percentTrf" max="100"></progress>
              <progress class="mid" v-else-if="percentTrf < 80" :value="percentTrf" max="100"></progress>
              <progress class="high" v-else :value="percentTrf" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item txt-dot-square">계획</div>
            <div class="align-to-right">{{ statusRls }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item txt-dot-square">실적</div>
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
        <div class="item radiobtn">
          <div class="ow-checkbox">
            <input type="checkbox" id="ow-chk" v-model="checkbox1" />
            <label for="ow-chk">미출고만 보기</label>
          </div>
        </div>
        <div class="item align-to-right" style="--gap-item: 6px">
          <div>
            <!-- hover 했을 때 범례 띄워줌 -->
            <button type="button" class="ow-btn type-icon arrow_down">
              <img src="@/assets/images/icon/ico_list.svg" style="border: 0.8px solid gray; width: 20px; padding: 2px" />
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
      <ow-n-grid :n="10" :visible-rows-count="state.visibleRowsCount" :initialized="initialize" :key="keyData" :read="read" :autoRowHeights="true">
        <template #left>&nbsp;</template>
        <!-- formatitem-->
        <wj-flex-grid-column binding="client" header="거래처" width="*">
          <wj-flex-grid-cell-template cellType="Cell" let-cell="cell" v-slot="cell">
            <!-- 행 스타일을 미출고 값에 따라 다르게 적용 -->
            <p v-if="cell.item.unrelease >= 1" class="ow-tag type-category">
              <i class="u">미</i>
            </p>
            <span :style="cell.item.unrelease ? 'color: rgb(210, 57, 46)' : ''">
              {{ cell.item.client }}
            </span>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <!-- <wj-flex-grid-column v-if="!unrelease" binding="client" header="거래처" width="*">
        </wj-flex-grid-column> -->
        <wj-flex-grid-column binding="level" header="처리단계" width="1.5*" align="center">
          <wj-flex-grid-cell-template cellType="Cell" let-cell="cell" v-slot="cell">
            <!-- 주문 단계에 따라 아이콘 적용 -->
            <span class="ow-tag type-category"><i class="o">주</i></span>
            <span class="ow-tag type-category"><i :class="cell.item.level >= 2 ? 'p' : 'n'">피</i></span>
            <span class="ow-tag type-category"><i :class="cell.item.level >= 4 ? 'i' : 'n'">검</i></span>
            <span class="ow-tag type-category"><i :class="cell.item.level >= 5 ? 'r' : 'n'">출</i></span>
            <span class="ow-tag type-category"><i :class="cell.item.level >= 6 ? 't' : 'n'">인</i></span>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
      </ow-n-grid>
    </div>
  </div>
</template>

<script setup>
import OwNGrid from '@/components/grid/new/OwNGrid';
import StatusProgressBar from '@/components/progress/StatusProgressBar';
import { reactive, ref, watch } from 'vue';
import clientApi from '@/api/customerReceipt';

// const items = ref([]);
const orderPlan = ref(300);
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
const unreleaseCnt = ref(null);

const receiptList = ref([]);

//검색 카테고리
const searchCategory = ref('주문번호');
//검색 내용
const searchCategoryContent = ref(null);

const filterList = ref({
  shippingCategory: '',
  status: '',
  unrelease: '',
  orderNo: '',
  clientName: '',
  // pageSize: 320,
  // startRowIndex:0
});

//보여지는 행 수
const state = reactive({
  visibleRowsCount: 16,
});

//ngrid 페이지 설정
const retrieve = (param) => {
  let filteredItems = _.cloneDeep(receiptList.value); //cloneDeep : 객체 복사
  const totalCount = filteredItems.length;
  if (param.sort) {
    filteredItems = _.sortBy(filteredItems, param.sort);
    if (['desc', 'DESC'].includes(param.direction)) {
      filteredItems = filteredItems.reverse();
    }
  }
  if (param.pageNo) {
    filteredItems = filteredItems.splice((param.pageNo - 1) * param.pageSize ?? 16, param.pageSize ?? 16);
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
    pageSize: 16,
  });
  return result;
}

//배송구분
const checkboxGroup1 = ref([
  { name: '긴급', value: '긴급' },
  { name: '일반', value: '일반' },
]);

//주문 단계
const checkboxGroup3 = ref([
  { name: '전체', value: '-1' },
  { name: '주문확인', value: '1' },
  { name: '피킹', value: '2' },
  { name: '출고검수', value: '4' },
  { name: '출고', value: '5' },
  { name: '택배사 인계', value: '6' },
]);

const searchCategoryList = [
  { name: '주문번호', value: '주문번호' },
  { name: '거래처', value: '거래처' },
];

// filter 초기값 : 배송구분 : '긴급', '일반', 주문 단계 : '0', 미출고만 보기 : 'false'
const checkboxGroup2 = ref(['긴급', '일반']);
const checkboxGroup4 = ref('-1');
const checkbox1 = ref(false);

const keyData = ref(0);

watch(
  [checkboxGroup2, checkboxGroup4, checkbox1],
  ([new1, new2, new3], [old1, old2, old3]) => {
    if (new1.length == 2) {
      filterList.value.shippingCategory = ['긴급', '일반'];
    } else {
      filterList.value.shippingCategory = new1;
    }

    if (new2 == 0) {
      filterList.value.status = 0;
    } else {
      filterList.value.status = new2;
    }

    filterList.value.unrelease = new3;

    console.log('watch - new1 : ' + new1);
    console.log('watch - new2 : ' + new2);
    console.log('watch - new3 : ' + new3);
    console.log('watch - filterList.shippingCategory : ' + filterList.value.shippingCategory);
    console.log('watch - filterList.status : ' + filterList.value.status);
    console.log('watch - filterList.unrelease : ' + filterList.value.unrelease);
    keyData.value++;
    getFilterList(filterList.value);
  },
  { immediate: true, deep: true }
);

function search() {
  if (searchCategory.value === '주문번호') {
    filterList.value.clientName = '';
    filterList.value.orderNo = searchCategoryContent.value;
  } else if (searchCategory.value === '거래처') {
    filterList.value.orderNo = '';
    filterList.value.clientName = searchCategoryContent.value;
  }
  console.log('search - searchCategory.value : ', searchCategory.value);
  console.log('search - searchCategoryContent.value : ', searchCategoryContent.value);
  console.log('search - filterList.value.orderNo : ', filterList.value.orderNo);
  console.log('search - filterList.value.clientName : ', filterList.value.clientName);
  keyData.value++;
  getFilterList(filterList.value);
}

async function getFilterList(afterFilterList) {
  const result = await clientApi.getFilterList(afterFilterList).then((data) => {
    console.log('getFilterList - JSON.stringify(result) : ' + JSON.stringify(data));
    // receiptList.value = result.list;
    console.log('result.length : ' + data.length);
    console.log('result : ', data);
    console.log('Array.isArray(result) : ' + Array.isArray(data));
    receiptList.value = [];
    for (let i = 0; i < data.length; i++) {
      receiptList.value.push({
        client: data[i]['client']['clientName'],
        level: data[i]['status'],
        unrelease: data[i]['orderItem']['unreleaseQuantity'],
      });
    }
  });
}

//초기화
const initialize = (s) => {
  //flexGrid 선택 모드 설정 => 선택 안되도록
  s.selectionMode = 'None';

  //미출고일 때 cssClass 적용
  s.itemFormatter = (panel, r) => {
    //r번째 행 선언
    let row = panel.rows[r];
    //헤더가 아닌 경우
    if (row._idxData !== -1) {
      //미출고 값이 true인 경우
      if (row._data.unrelease >= 1) {
        //적용되어 있는 cssClass가 없을 때
        if (row.cssClass === null) {
          panel.rows[r].cssClass = 'ifUnrelease';
        }
      }
    }
  };
};

async function getunrlsCnt() {
  const unrlsCnt = await clientApi.getUnreleaseCnt();
  unreleaseCnt.value = unrlsCnt;
  console.log('unreleaseCnt : ' + unreleaseCnt.value);
}
getunrlsCnt();

//주문 단계 별 건수 요청
async function getStsCnt() {
  const stsCnt = await clientApi.getStatusCnt();
  statusOrd.value = stsCnt[1] + stsCnt[2] + stsCnt[3] + stsCnt[4] + stsCnt[5] + stsCnt[6];
  statusPick.value = stsCnt[2] + stsCnt[3] + stsCnt[4] + stsCnt[5] + stsCnt[6];
  statusPack.value = stsCnt[4] + stsCnt[5] + stsCnt[6];
  statusRls.value = stsCnt[5] + stsCnt[6];
  statusTrf.value = stsCnt[6];
  //주문 단계마다 완료 퍼센트
  percentOrd.value = parseInt((statusOrd.value / orderPlan.value) * 100);
  percentPick.value = parseInt((statusPick.value / statusOrd.value) * 100);
  percentPack.value = parseInt((statusPack.value / statusPick.value) * 100);
  percentRls.value = parseInt((statusRls.value / statusPack.value) * 100);
  percentTrf.value = parseInt((statusTrf.value / statusRls.value) * 100);

  // return stsCnt;
}
getStsCnt();
</script>

<style scoped lang="scss">
::v-deep {
  .ow-panel .ow-panel-header .ow-panel-title {
    justify-content: center;
    font-weight: 800;
  }

  .low,
  .mid,
  .high {
    display: block;
    border: 0 none;
    border-radius: 2px;
    background: gainsboro;
  }

  .low::-webkit-progress-bar,
  .mid::-webkit-progress-bar,
  .high::-webkit-progress-bar {
    background: transparent;
  }

  .low::-webkit-progress-value {
    border-radius: 2px;
    background: rgb(246, 193, 68);
  }

  .mid::-webkit-progress-value {
    border-radius: 2px;
    background: rgb(63, 132, 88);
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
    font-weight: 600;
  }

  .ow-flex-wrap .filter-checkbox-label,
  .filter-radio-label {
    margin-left: 5px;
    margin-right: 0;
  }

  .ow-flex-wrap .item .radiobtn {
    background-color: #e1e6ea;
    padding: 3px;
    border-radius: 2px;
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

  .ow-grid .wj-cell.wj-header {
    background-color: rgb(231, 234, 241);
  }

  .ow-grid .wj-cell.wj-alt {
    background-color: #fff;
  }

  .ow-grid {
    .wj-cell {
      &.ifUnrelease {
        background-color: rgb(248, 229, 227);
        color: rgb(210, 57, 46);
      }
    }
  }
}
</style>
