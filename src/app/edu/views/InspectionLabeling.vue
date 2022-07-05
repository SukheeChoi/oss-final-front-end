<template>
  <div class="1 h-100">
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
      <div class="left h-100">
        <div class="d-flex justify-content-end mt-5 mb-5">
          <button class="ow-btn type-util">예정시간수정</button>
          <button class="ow-btn type-util" @click="getListByEmployeeName()">추가</button>
        </div>
        <ow-tree-grid
          :read="getTree"
          :childItemsPath="['child', 'childrennn']"
          :selectionChanged="onSelectionChanged"
          :initialized="treeInitialized"
          :visibleRowsCount="15"
        >
          <wj-flex-grid-column
            header="담당자/업체명"
            binding="employeeName"
            :width="130"
            align="center"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="수령일"
            binding="receiveHourMinute"
            :width="100"
            align="center"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="수령<br>품목"
            binding="receiveItem"
            :width="60"
            align="center"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="수령<br>수량"
            binding="receiveQuantity"
            :width="50"
            align="center"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="예정시간"
            binding="scheduledTime"
            :width="150"
            align="center"
          ></wj-flex-grid-column>
          <wj-flex-grid-column header="시작시간" binding="startTime" :width="50" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column header="작업시간" binding="workTime" :width="50" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column header="진행률" binding="progressRate" :width="50" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column header="상태" binding="status" :width="50" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column
            header="지연<br>시간"
            binding="lateTime"
            :width="50"
            align="center"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="검수<br>수량"
            binding="inspectionQuantity"
            :width="50"
            align="center"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="양품<br>수량"
            binding="passItemQuantity"
            :width="50"
            align="center"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="라벨링<br>수량"
            binding="labelingItemQuantity"
            :width="50"
            align="center"
          ></wj-flex-grid-column>
        </ow-tree-grid>
      </div>
      <!-- 오른쪽 화면 -->
      <div class="right flex-fill">
        <div class="d-flex justify-content-end mt-5 mb-5">
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
              <input type="submit" class="btn-search" @click="searchData()" />
            </div>
          </div>
        </div>
        <div class="ow-panel">
          <div class="ow-panel-header">
            <div class="ow-panel-title">
              ■<span v-if="employeeName">[{{ employeeName }}]</span>검품검수 및 라벨링 내역
            </div>
          </div>
          <div class="ow-panel-body1">
            <div class="ow-grid-wrap">
              <div v-if="!employeeName" style="font-size: 20px">담당자를 선택해주세요!</div>
              <ow-grid
                v-if="employeeName"
                headersVisibility="Column"
                :allowMerging="'Cells'"
                selectionMode="None"
                :read="getGrid"
                :key="keyData"
                :initialized="onInitialized"
              >
                <template #left>&nbsp;</template>
                <wj-flex-grid-column binding="vendorName" header="업체명" :width="100" align="center" />
                <wj-flex-grid-column binding="itemName" header="품목명" width="*" align="center" />
                <wj-flex-grid-column binding="itemCode" header="품목코드" :width="100" align="center" />
                <wj-flex-grid-column binding="placingOrderNo" header="발주번호" :width="100" align="center" />
                <wj-flex-grid-column binding="lotCode" header="LOT번호" :width="100" align="center" />
                <wj-flex-grid-column binding="recievedQuantity" header="수령<br>수량" :width="50" align="center" />
                <wj-flex-grid-column binding="inspectionQuantity" header="검수<br>수량" :width="50" align="center" />
                <wj-flex-grid-column binding="passedItemQuantity" header="양품<br>수량" :width="50" align="center" />
                <wj-flex-grid-column binding="missingItemQuantity" header="누락<br>수량" :width="50" align="center" />
                <wj-flex-grid-column binding="damagedItemQuantity" header="파손<br>수량" :width="50" align="center" />
                <wj-flex-grid-column binding="etcQuantity" header="기타<br>수량" :width="50" align="center" />
                <wj-flex-grid-column binding="accepted" header="승인<br>여부" :width="50" align="center" />
                <wj-flex-grid-column
                  binding="labelingItemQuantity"
                  header="라벨링<br>수량"
                  :width="50"
                  align="center"
                />
              </ow-grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, watch, computed, toRaw } from 'vue';
import inspectionLabelingApi from '@/api/inspectionLabelingApi';
import { TreeMergeManager, SimpleMergeManager } from '@/utils/wijmo.grid';

const childItemsPath = ['child', 'childrennn'];

const getTree = ref([]);
const getGrid = ref([]);
const keyData = ref(0);

getTree.value = async function (query, pageNo, pageSize) {
  const treeList = await inspectionLabelingApi.getTreeList();

  const result = {
    totalCount: 1,
    data: treeList,
  };

  return result;
};

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
  });
}
getStatus();

//트리 그리드 셀렉션 핸들러
const onSelectionChanged = (grid, target) => {
  //반응형 변수 세팅(검색 조건 리셋)
  searchSelected.value = '';
  searchContent.value = '';

  //컴포넌트가 destroy될때도 실행되기 때문에 row가 -1일때는 실행하지 않도록 막는 설정
  if (target.row !== -1) {
    //childrenn이라는 key가 있으면 담당자이므로 api통신으로 오른쪽 그리드 띄우기
    if (typeof grid.selectedItems[0].childrennn == 'object') {
      employeeName.value = grid.selectedItems[0].employeeName;

      getGrid.value = async function (query, pageNo, pageSize) {
        //pageNo = "페이지번호"
        //pageSize = "한페이지 몇 행"
        //totalCount = "전체 행 수"
        const lee = await inspectionLabelingApi.getListByEmployeeName(
          employeeName.value,
          searchSelected.value,
          searchContent.value,
          pageNo,
          pageSize
        );

        const result = {
          ...lee,
          pageNo,
          pageSize,
        };
        return result;
      };
      keyData.value++;
    }
  }
};

function searchData() {
  keyData.value++;
}

//트리 그리드 설정
const treeInitialized = (grid) => {
  grid.autoSizeRow(0, true);

  const config = {
    groupingColumns: [],
    mergedColumns: [
      'startTime',
      'workTime',
      'progressRate',
      'status',
      'lateTime',
      'inspectionQuantity',
      'passItemQuantity',
      'labelingItemQuantity',
    ],
  };

  grid.mergeManager = new TreeMergeManager(config);

  grid.formatItem.addHandler((grid, e) => {
    //헤더에 html태그 사용하게 하는 설정
    if (e.panel == grid.columnHeaders) {
      e.cell.innerHTML = e.cell.textContent;
    }

    if (e.panel == grid.cells) {
      var col = grid.columns[e.col];
      var row = grid.rows[e.row];

      if ((e.row < 1 || row.dataItem.childrennn) && col.binding == 'startTime') {
        var vnow = grid.getCellData(e.row, e.col - 1);

        const receiveQuantity = row.dataItem.receiveQuantity; //진행률 전체 작업량
        const currentQuantity = row.dataItem.currentQuantity; //현재 달성률 전체 작업량

        const progressQuantity = row.dataItem.progressQuantity; //현재 작업량

        const receivePercent = Math.round((progressQuantity / receiveQuantity) * 100); //진행률 퍼센트(계산)
        const currentPercent = Math.round((progressQuantity / currentQuantity) * 100); //현재 달성률 퍼센트(계산)

        const LWTNine = row.dataItem.LWTNine;
        const LWTTen = row.dataItem.LWTTen;
        const LWTEleven = row.dataItem.LWTEleven;
        const LWTThirteen = row.dataItem.LWTThirteen;
        const LWTFourteen = row.dataItem.LWTFourteen;
        const LWTFifteen = row.dataItem.LWTFifteen;
        const LWTSixteen = row.dataItem.LWTSixteen;
        const LWTSeventeen = row.dataItem.LWTSeventeen;

        const startTime = row.dataItem.scheduledStartTime.slice(0, 2);
        const endTime = row.dataItem.scheduledEndTime.slice(0, 2);

        function timeCheckFunc(params) {
          let timeCheck = false;
          let paramTime = 0;
          switch (params) {
            case LWTNine:
              paramTime = 9;
              break;
            case LWTTen:
              paramTime = 10;
              break;
            case LWTEleven:
              paramTime = 11;
              break;
            case LWTThirteen:
              paramTime = 13;
              break;
            case LWTFourteen:
              paramTime = 14;
              break;
            case LWTFifteen:
              paramTime = 15;
              break;
            case LWTSixteen:
              paramTime = 16;
              break;
            case LWTSeventeen:
              paramTime = 17;
              break;
          }
          if (paramTime > startTime && paramTime < endTime) {
            timeCheck = true;
          }
          return timeCheck;
        }

        function createTag(params) {
          const timeCheck = timeCheckFunc(params);
          let html =
            '<td>' +
            '<div class="{progress}">' +
            '<div role="progressbar" aria-valuemin="0" aria-valuemax="4" aria-valuenow="1" class="progress-bar progress-bar-{paramsColor}" style="width: {params}%"/>' +
            '{params%}</div>' +
            '<div class="normal-text">{params}%</div></td>';
          if (params < 50) {
            html = html.replace('{paramsColor}', 'normal');
          } else if (params >= 50 && params < 80) {
            html = html.replace('{paramsColor}', 'warning');
          } else if (params >= 80 && params < 100) {
            html = html.replace('{paramsColor}', 'success');
          } else if (params == 100) {
            html = html.replace('{paramsColor}', 'done');
          }
          if (params < 50) {
            html = html.replace('{params%}', '');
          } else {
            html = html.replace('{params%}', params + '%');
            html = html.replace('<div class="normal-text">{params}%</div>', '');
          }
          html = html.replaceAll('{params}', params);

          if (timeCheck) {
            html = html.replaceAll('{progress}', 'progress');
          } else {
            html = html.replaceAll('{progress}', 'progress-none');
          }
          return html;
        }

        let html =
          '<div class="lee">' +
          '<div class="leeStatus">' +
          '<div class="item">' +
          '<div class="state">' +
          '<div class="state-item">' +
          '진행률 : <strong>{receiveItemQuantity}</strong> /' +
          '<strong>{progressQuantity}</strong> /' +
          '<strong>{receivePercent}%</strong>' +
          '</div>' +
          '<div class="state-item">' +
          '현재달성률 : <strong>{currentQuantity}</strong> /' +
          '<strong>{progressQuantity}</strong> /' +
          '<strong>{currentPercent}%</strong>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<table>' +
          '<tr>' +
          createTag(LWTNine) +
          createTag(LWTTen) +
          createTag(LWTEleven) +
          createTag(LWTThirteen) +
          createTag(LWTFourteen) +
          createTag(LWTFifteen) +
          createTag(LWTSixteen) +
          createTag(LWTSeventeen) +
          '</tr>' +
          '</table>' +
          '</div>';

        html = html.replace('{receiveItemQuantity}', receiveQuantity);
        html = html.replace('{currentQuantity}', currentQuantity);
        html = html.replaceAll('{progressQuantity}', progressQuantity);
        html = html.replace('{receivePercent}', receivePercent);
        html = html.replace('{currentPercent}', currentPercent);

        html = html.replaceAll('undefined%', '');
        e.cell.innerHTML = html;
      }
    }
  });
  //그리드 셀렉션모드 설정(Row)
  grid.selectionMode = 3;
};

//그리드 설정
const onInitialized = (grid) => {

  grid.autoSizeRow(0, true);

  grid.formatItem.addHandler((flex, e) => {
    //헤더에 html태그 사용하게 하는 설정
    if (e.panel == flex.columnHeaders) {
      e.cell.innerHTML = e.cell.textContent;
    }
  });

  //-----------------------------------------------------
  const config = {
    groupingColumns: ['vendorName'],
    mergedColumns: ['vendorName', 'inspectionQuantity', 'passItemQuantity', 'labelingItemQuantity'],
  };
  grid.mergeManager = new SimpleMergeManager(config);
  //-----------------------------------------------------

  //그리드 셀렉션모드 설정(None)
  grid.selectionMode = 0;
};
</script>

<style>
.ow-panel .ow-panel-body1 {
  display: flex;
  /* flex-direction: column; */
  flex: 1;
  border: 2px solid #6980af;
  border-top: 0;
  background-color: #fff;
  padding: var(--ow-gutter);
}
.wj-cell.wj-header {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: inherit;
}

.progress-bar-success {
  background-color: #198754;
}

.progress-bar-warning {
  background-color: #ffc107;
}

.progress-bar-done {
  background-color: #0d6efd;
}

.progress-bar-normal {
  background-color: #495057;
}

.border {
  border: 1px solid black;
  background-color: grey;
  color: white;
  text-align: center;
}

table th,
table td {
  border: 1px solid #d7dce3;
  padding-right: 0;
  padding-left: 0;
  height: 0;
  vertical-align: middle;
}

.progress {
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: #e9ecef;
  border-radius: 0;
}

.progress-none {
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  border-radius: 0;
}

.progress-bar {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  overflow: hidden;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  transition: width 0.6s ease;
}

.normal-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: red;
  text-align: center;
  white-space: nowrap;
}
</style>
