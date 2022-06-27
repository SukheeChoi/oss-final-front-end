<template>
  <div class="1">
    <!-- 현황 화면 -->
    <div class="ow-flex-wrap">
      <div class="item size-fix" style="--gap-item: 6px">
        <div class="title-field">현황</div>
        <div class="item">
          <div class="state">
            <div class="state-item">
              물품수령 : <strong>{{ statusBar.receiveItem }}</strong
              >품목/ <strong>{{ statusBar.receiveItemQuantity }}</strong
              >개
            </div>
            <div class="state-item">
              검품검수 : <strong>{{ statusBar.inspectionItem }}</strong
              >품목/<strong>{{ statusBar.inspectionItemQuantity }}</strong
              >개
            </div>
            <div class="state-item">
              라벨링 : <strong>{{ statusBar.labelingItem }}</strong
              >품목/<strong>{{ statusBar.labelingItemQuantity }}</strong
              >개
            </div>
          </div>
        </div>
      </div>
      <div class="item size-fix" style="--gap-item: 6px">
        <div class="title-field">검품검수현황</div>
        <div class="item">
          <div class="state">
            <div class="state-item">
              양품 : <strong>{{ statusBar.passedItem }}</strong
              >품목/<strong>{{ statusBar.passedItemQuantity }}</strong
              >개
            </div>
            <div class="state-item">
              누락 : <strong>{{ statusBar.missingItem }}</strong
              >품목/<strong>{{ statusBar.missingItemQuantity }}</strong
              >개
            </div>
            <div class="state-item">
              파손 : <strong>{{ statusBar.damagedItem }}</strong
              >품목/<strong>{{ statusBar.damagedItemQuantity }}</strong
              >개
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="d-flex">
      <!-- 왼쪽 화면 -->
      <div class="left">
        <div class="d-flex justify-content-end">
          <button class="ow-btn type-util">예정시간수정</button>
          <button class="ow-btn type-util">추가</button>
        </div>
        <ow-tree-grid :read="read" :childItemsPath="['child', 'childrennn']" :selectionChanged="selectLee(p, e)">
          <!-- childitem 순서대로 입력하기 children(albert)아래 children(anton) -->
          <wj-flex-grid-column header="담당자/업체명" binding="employeeName" :width="130"></wj-flex-grid-column>
          <wj-flex-grid-column header="수령일" binding="receiveHourMinute" :width="100" ></wj-flex-grid-column>
          <wj-flex-grid-column header="수령품목" binding="receiveItem" :width="60" :wordWrap="true" :multiline="true"></wj-flex-grid-column>
          <wj-flex-grid-column header="수령수량" binding="receiveQuantity" :width="50" :wordWrap="true" :multiline="true"></wj-flex-grid-column>
          <wj-flex-grid-column header="예정시간" binding="scheduledStartTime" :width="50"></wj-flex-grid-column>
          <wj-flex-grid-column header="시작시간" binding="startTime" :width="50" ></wj-flex-grid-column>
          <wj-flex-grid-column header="작업시간" binding="workTime" :width="50" ></wj-flex-grid-column>
          <wj-flex-grid-column header="진행률" binding="progressRate" :width="50"></wj-flex-grid-column>
          <wj-flex-grid-column header="상태" binding="status" :width="50"></wj-flex-grid-column>
          <wj-flex-grid-column header="지연시간" binding="lateTime" :width="50" :wordWrap="true" :multiline="true"></wj-flex-grid-column>
          <wj-flex-grid-column header="검수수량" binding="inspectionQuantity" :width="50" :wordWrap="true" :multiline="true"></wj-flex-grid-column>
          <wj-flex-grid-column header="양품수량" binding="passItemQuantity" :width="50" :wordWrap="true" :multiline="true"></wj-flex-grid-column>
          <wj-flex-grid-column header="라벨링수량" binding="labelingItemQuantity" :width="50" :wordWrap="true" :multiline="true"></wj-flex-grid-column>
        </ow-tree-grid>
      </div>
      <!-- 오른쪽 화면 -->
      <div class="right flex-fill">
        <div class="d-flex justify-content-end">
          <div class="item align-to-right" style="--gap-item: 6px">
            <div class="title-field">검색</div>
            <div class="ow-select" style="--width: 97px">
              <select name="" id="" v-model="searchSelected">
                <option value="" selected hidden>선택</option>
                <option value="업체명">업체명</option>
                <option value="발주번호">발주번호</option>
                <option value="품목명">품목명</option>
                <option value="품목코드">품목코드</option>
              </select>
            </div>
            <div class="ow-input type-button" style="--width: 200px">
              <input type="text" v-model="searchContent" placeholder="검색어를 입력하세요." />
              <input type="submit" class="btn-search" @click="getListByEmployeeName()"/>
            </div>
          </div>
        </div>
        <div class="ow-panel">
          <div class="ow-panel-header">
            <div class="ow-panel-title">■[이가을]검품검수 및 라벨링 내역</div>
          </div>
          <div class="ow-panel-body1">
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
                <wj-flex-grid-column
                  binding="vendorName"
                  header="업체명"
                  :width="100"
                  align="center"
                  cssClassAll="border-right-sm"
                />
                <wj-flex-grid-column
                  binding="itemName"
                  header="품목명"
                  :width="100"
                  align="center"
                  cssClassAll="border-right-sm"
                />
                <wj-flex-grid-column
                  binding="itemCode"
                  header="품목코드"
                  :width="100"
                  align="center"
                  cssClassAll="border-right-sm"
                />
                <wj-flex-grid-column
                  binding="placingOrderNo"
                  header="발주번호"
                  :width="100"
                  align="center"
                  cssClassAll="border-right-sm"
                />
                <wj-flex-grid-column
                  binding="lotCode"
                  header="LOT번호"
                  :width="100"
                  align="center"
                  cssClassAll="border-right-sm"
                />
                <wj-flex-grid-column
                  binding="recievedQuantity"
                  header="수령수량"
                  :width="50"
                  align="center"
                  cssClassAll="border-right-sm"
                />
                <wj-flex-grid-column
                  binding="inspectionQuantity"
                  header="검수수량"
                  :width="50"
                  align="center"
                  cssClassAll="border-right-sm"
                />
                <wj-flex-grid-column
                  binding="passedItemQuantity"
                  header="양품수량"
                  :width="50"
                  align="center"
                  cssClassAll="border-right-sm"
                />
                <wj-flex-grid-column
                  binding="missingItemQuantity"
                  header="누락수량"
                  :width="50"
                  align="center"
                  cssClassAll="border-right-sm"
                />
                <wj-flex-grid-column
                  binding="damagedItemQuantity"
                  header="파손수량"
                  :width="50"
                  align="center"
                  cssClassAll="border-right-sm"
                />
                <wj-flex-grid-column
                  binding="etcQuantity"
                  header="기타수량"
                  :width="50"
                  align="center"
                  cssClassAll="border-right-sm"
                />
                <wj-flex-grid-column
                  binding="accepted"
                  header="승인여부"
                  :width="50"
                  align="center"
                  cssClassAll="border-right-sm"
                />
                <wj-flex-grid-column
                  binding="labelingItemQuantity"
                  header="라벨링수량"
                  :width="50"
                  align="center"
                  cssClassAll="border-right-sm"
                />
              </wj-flex-grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch, computed, toRaw } from 'vue';
import WjFlexGrid from '@grapecity/wijmo.vue2.grid';
import { CollectionView } from '@grapecity/wijmo';
import inspectionLabelingApi from '@/api/inspectionLabelingApi';

const childItemsPath = ['child', 'childrennn'];

const items = [
  {
    name: '전체',
    receiveHourMinute: '03-23 09:00',
    receiveItem: '20',
    receiveQuantity: '479',

    child: [
      {
        name: '이가을',
        receiveHourMinute: '03-23 09:00',
        receiveItem: '20',
        receiveQuantity: '479',
        LEE: 'LEE',
        childrennn: [
            { name: '오성엠엔디',       
              receiveHourMinute: '03-23 09:00',
              receiveItem: '4',
              receiveQuantity: '244',
            }, 
            { name: 'NSK 덴탈',
              receiveHourMinute: '03-23 09:00',
              receiveItem: '2',
              receiveQuantity: '70', 
            }
          ],
      },
      {
        name: '안병희',
        childrennn: [
          { name: '다온덴탈' },
          { name: 'Bob' },
        ],
      },
      {
        name: '최민정',
        childrennn: [{ name: 'ivoclar vivadent' }, { name: 'Meisinger' }, { name: 'Carrie' }],
      },
      {
        name: 'Douglas',
        childrennn: [{ name: 'Dinah' }, { name: 'Donald' }],
      },
    ],
  },
];

console.log(items);

async function read(query, pageNo, pageSize) {
  const treeList = await inspectionLabelingApi.getTreeList();
  console.log('queryqueryqueryquery', query);
  console.log('result', result);
  const result = {
    totalCount: 1,
    data: treeList,
  };
  return result;
}

async function getListByEmployeeName() {
  employeeName.value = '이동현';
  const result = await inspectionLabelingApi.getListByEmployeeName(employeeName.value, searchSelected.value, searchContent.value)
  .then((data) => {
    response.value = data.data;
    console.log('datadatadatadatadatadatadatadatadatadatadatadatadata', data);
    console.log(response.value);
  });
}

function selectLee(props, event) {
  console.log(props);
  console.log(event);
}

const response = ref(null);
const treeResponse = ref(null);
const employeeName = ref(null);
const searchSelected = ref(null);
const searchContent = ref(null);

const statusBar = reactive({
  receiveItem: null,
  receiveItemQuantity: null,

  inspectionItem: null,
  inspectionItemQuantity: null,

  labelingItem: null,
  labelingItemQuantity: null,

  passedItem: null,
  passedItemQuantity: null,

  missingItem: null,
  missingItemQuantity: null,

  damagedItem: null,
  damagedItemQuantity: null,
});

async function getStatus() {
  const result = await inspectionLabelingApi.getStatus().then((data) => {
    statusBar.receiveItem = data.receiveItem;
    statusBar.receiveItemQuantity = data.receiveItemQuantity;

    statusBar.inspectionItem = data.inspectionItem;
    statusBar.inspectionItemQuantity = data.inspectionItemQuantity;

    statusBar.labelingItem = data.labelingItem;
    statusBar.labelingItemQuantity = data.labelingItemQuantity;

    statusBar.passedItem = data.passedItem;
    statusBar.passedItemQuantity = data.passedItemQuantity;

    statusBar.missingItem = data.missingItem;
    statusBar.missingItemQuantity = data.missingItemQuantity;

    statusBar.damagedItem = data.damagedItem;
    statusBar.damagedItemQuantity = data.damagedItemQuantity;
    console.log(data);
  });
}

export default {
  setup() {
    const initialize = (s) => {};

    getStatus();
    getListByEmployeeName();

    return {
      initialize,
      read,
      statusBar,
      response,
      employeeName,
      searchSelected, 
      searchContent,
      childItemsPath,
      getListByEmployeeName,
      selectLee
    };
  },
};
</script>

<style scoped>
.ow-panel .ow-panel-body1 {
  display: flex;
  /* flex-direction: column; */
  flex: 1;
  border: 2px solid #6980af;
  border-top: 0;
  background-color: #fff;
  padding: var(--ow-gutter);
}
</style>
