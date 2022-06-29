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
              <span :data-value="percentOrd" :style="`width: ${percentOrd}%`">{{ percentOrd }}%</span>
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
              <strong style="color: rgb(210, 57, 46)">미출고 6건</strong>)
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
        <ow-filter-checkbox v-bind:items="checkboxGroup1" v-model="checkboxGroup2" :label="`배송구분`" />
        <ow-filter-radio v-bind:items="checkboxGroup3" v-model="checkboxGroup4" :label="`회사`" />
        <div class="item" style="--gap-item: 6px">
          <div class="ow-checkbox">
            <input type="checkbox" id="ow-chk" />
            <label for="ow-chk">미출고만 보기</label>
          </div>
        </div>
        <div class="item align-to-right" style="--gap-item: 6px">
          <div>
            <button class="ow-btn type-icon arrow-down arrow_down"></button>
            <div class="explain">
              <h3>처리단계 범례</h3>
              <div>
                <span class="ow-tag type-category"><i class="o">주</i></span>
                피킹지시 내려야할 건
              </div>
              <div>
                <span class="ow-tag type-category"><i class="p">피</i></span>
                피킹해야할 건
              </div>
              <div>
                <span class="ow-tag type-category"><i class="i">검</i></span>
                출고검수/패킹해야할 건
              </div>
              <div>
                <span class="ow-tag type-category"><i class="r">출</i></span>
                출고(송장번호 생성)해야할 건
              </div>
              <div>
                <span class="ow-tag type-category"><i class="t">인</i></span>
                택배사로 인계해야할 건
              </div>
              <h3>주문번호 범례</h3>
              <div>
                <span class="ow-tag type-category"><i class="u">미</i></span>
                주문품목 중 미출고품목이 존재하는 주문
              </div>
              <div>
                <span class="ow-tag type-category"><i class="n">처</i></span>
                처리하지 않은 단계
              </div>
            </div>
          </div>
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
    </div>
    <div>
      <ow-n-grid
        :n="9"
        :initialized="initialize"
        :read="read"
        :autoRowHeights="true"
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

<script>
import OwNGrid from '@/components/grid/new/OwNGrid';
import { reactive, ref, onMounted } from 'vue';
import clientApi from '@/api/customerReceipt';

const items = [];
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

// filter 초기값 : '일반', '1'
const checkboxGroup2 = ref(['일반','긴급']);
const checkboxGroup4 = ref('0');

//db에 filter값 보내기
const dummy = async () => {
  let list = await clientApi.getClientInfo(checkboxGroup2, checkboxGroup4);
  return list;
};

dummy().then((list) => {
  for (let i = 0; i < list.length; i++) {
    items.push({
      client: list[i]['client']['clientName'],
      level: list[i]['status'],
    });
  }
});

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

export default {
  name: 'TheOwNewGrid',
  components: {
    OwNGrid,
  },
  data() {
    return {
      //체크박스
      checkboxGroup1: [
        { name: '일반', value: '일반' },
        { name: '긴급', value: '긴급' },
      ],
      checkboxGroup3: [
        { name: '전체', value: '0'},
        { name: '주문확인', value: '1' },
        { name: '피킹', value: '2' },
        { name: '출고검수', value: '3' },
        { name: '출고', value: '4' },
        { name: '택배사 인계', value: '5' },
      ],
    };
  },
  setup(props) {
    const state = reactive({
      visibleRowsCount: 15,
    });

    const initialize = (s) => {};

    let globalIndex = 0;

    //주문 단계 카운트
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

    return {
      initialize,
      read,
      state,
      statusOrd,
      statusPick,
      statusPack,
      statusRls,
      statusTrf,
      percentOrd,
      percentPick,
      percentPack,
      percentRls,
      percentTrf,
      checkboxGroup2,
      checkboxGroup4,
    };
  },
};
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
