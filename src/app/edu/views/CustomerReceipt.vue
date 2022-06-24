<template>
  <div>
    <div class="row mb-4">
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title">주문</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item">계획 대비 실적 달성률</div>
            <div class="progress-bar">
              <!-- <approval-grid :transportData="transportData" ref="animateEvent" /> -->
              <span data-value="85" style="width: 85%">85%</span>
              <progress :value="85" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">{{ status }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ status }}건</div>
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
              <span data-value="85" style="width: 85%">85%</span>
              <progress :value="85" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">{{ status }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ status }}건</div>
          </div>
        </div>
      </div>
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title">출고검수/패킹</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item">계획 대비 실적 달성률</div>
            <div class="progress-bar">
              <span data-value="85" style="width: 85%">85%</span>
              <progress :value="85" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">{{ status }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ status }}건</div>
          </div>
        </div>
      </div>
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title">출고</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item">계획 대비 실적 달성률</div>
            <div class="progress-bar">
              <span data-value="85" style="width: 85%">85%</span>
              <progress :value="85" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">{{ status }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ status }}건</div>
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
              <span data-value="85" style="width: 85%">85%</span>
              <progress :value="85" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="align-to-right">{{ status }}건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="align-to-right">{{ status }}건</div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="item mt-4 mb-4">
      <div class="ow-flex-wrap item-size-content" style="--gap: 10px">
        <ow-filter-checkbox
          name="checkboxGp2"
          :items="checkboxGroup1"
          v-model:modelValue="checkboxGroup2"
          :label="`배송구분`"
        />
        <ow-filter-checkbox
          name="checkboxGp1"
          :items="checkboxGroup3"
          v-model:modelValue="checkboxGroup4"
          :label="`회사`"
        />
        <div class="item" style="--gap-item: 6px">
          <div class="ow-checkbox">
            <input type="checkbox" id="ow-chk1" />
            <label for="ow-chk1">미출고만 보기</label>
          </div>
        </div>
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
    </div>
    <div>
      <ow-n-grid
        :n="8"
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

            <span class="ow-tag type-category">
              <i v-if="cell.item.level >= 2" class="p">피</i>
              <i v-else class="n">피</i>
            </span>

            <span v-if="cell.item.level >= 3" class="ow-tag type-category"><i class="i">검</i></span>
            <span v-else class="ow-tag type-category"><i class="n">검</i></span>

            <span v-if="cell.item.level >= 4" class="ow-tag type-category"><i class="r">출</i></span>
            <span v-else class="ow-tag type-category"><i class="n">출</i></span>

            <span v-if="cell.item.level == 5" class="ow-tag type-category"><i class="t">인</i></span>
            <span v-else class="ow-tag type-category"><i class="n">인</i></span>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
      </ow-n-grid>
    </div>
  </div>
</template>

<script>
import OwNGrid from '@/components/grid/new/OwNGrid';
import { reactive, ref } from 'vue';
import clientApi from '@/api/customerReceipt';

const items = [];
const status = ref(null);

//ngrid 페이지 설정
const retrieve = (param) => {
  //cloneDeep : 객체 복사
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
      checkboxGroup1: [
        { name: '긴급', value: '1' },
        { name: '일반', value: '2' },
      ],
      checkboxGroup2: [],
      checkboxGroup3: [
        { name: '주문확인', value: '1' },
        { name: '피킹', value: '2' },
        { name: '출고검수', value: '3' },
        { name: '출고', value: '4' },
        { name: '택배사 인계', value: '5' },
      ],
      checkboxGroup4: [],
    };
  },
  setup(props) {
    const state = reactive({
      visibleRowsCount: 15,
    });

    const initialize = (s) => {};

    let globalIndex = 0;

    async function getCnt() {
      const cnt = await clientApi.getStatusCnt();
      status.value = cnt;
      return cnt;
    }
    getCnt();

    return {
      initialize,
      read,
      state,
      status,
    };
  },
};

//db에서 데이터 불러오기
const dummy = async () => {
  let list = await clientApi.getClientInfo();
  console.log('list[0]["clientName"] : ' + list[0]['clientName']);
  console.log('list[0]["order"]["status"] : ' + list[0]['order']['status']);
  return list;
};

dummy().then((list) => {
  console.log('list[0] : ' + list[0]['clientName']);
  for (let i = 0; i < list.length; i++) {
    items.push({
      client: list[i]['clientName'],
      level: list[i]['order']['status'],
    });
    console.log('~~~~~~~~~~~~~~~~' + items);
  }
});
</script>

<style>
progress {
  display: block; /* default: inline-block */
  border: 0 none;
  border-radius: 2px;
  background: gainsboro;
}

progress::-webkit-progress-bar {
  background: transparent;
}

/* progress::-webkit-progress-value {
  border-radius: 2px;
  background: yellow;
} */
progress::-webkit-progress-value {
  border-radius: 2px;
  background: green;
}
/* progress::-webkit-progress-value {
  border-radius: 2px;
  background: blue;
} */

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
</style>
