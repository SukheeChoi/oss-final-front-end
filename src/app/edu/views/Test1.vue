<template>
  <div class="1 h-100">
    <!-- 현황 화면 -->
    <div class="ow-flex-wrap">
      <div class="item size-fix" style="--gap-item: 6px">
        <div class="ow-flex-wrap">
          <div class="item size-fix" style="--gap-item: 6px">
            <ow-status-bar label="현황" :items="orderStatus"></ow-status-bar>
          </div>
        </div>
      </div>
      <div class="item size-fix" style="--gap-item: 6px">
        <div class="ow-flex-wrap">
          <div class="item size-fix" style="--gap-item: 6px">
            <ow-status-bar label="검품검수현황" :items="inspectionStatus"></ow-status-bar>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="d-flex">
      <!-- 왼쪽 화면 -->
      <div class="left h-100">
        <div class="d-flex justify-content-end mt-5 mb-5">
          <button class="ow-btn type-util" @click="openUpdateModal" :disabled="!updateDate">예정시간수정</button>
          <button class="ow-btn type-util" @click="openAddModal" :disabled="!addDate">추가</button>
        </div>
        <ow-tree-grid
          :read="getTree"
          :childItemsPath="['child', 'childrennn']"
          :selectionChanged="onSelectionChanged"
          :initialized="treeInitialized"
          :visibleRowsCount="20"
          :key="treeKeyData"
        >
          <wj-flex-grid-column header="담당자/업체명" binding="title" :width="130" align="left"></wj-flex-grid-column>
          <wj-flex-grid-column header="수령일" binding="receiveDate" :width="100" align="center"></wj-flex-grid-column>
          <wj-flex-grid-column
            header="수령<br>품목"
            binding="receiveItem"
            :width="40"
            align="right"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="수령<br>수량"
            binding="receiveQuantity"
            :width="50"
            align="right"
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
          <wj-flex-grid-column header="상태" binding="status" :width="70" align="center"></wj-flex-grid-column>
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
              ■ <span v-if="title">[{{ title }}]</span>검품검수 및 라벨링 내역
            </div>
          </div>
          <div class="ow-panel-body1">
            <b-row>
              <div v-if="!title" style="font-size: 20px">담당자를 선택해주세요!</div>
              <ow-grid v-if="title" :read="getGrid" :key="keyData" :initialized="onInitialized" :visibleRowsCount="15">
                <template #left>&nbsp;</template>
                <wj-flex-grid-column binding="vendorName" header="업체명" :width="100" align="left" />
                <wj-flex-grid-column binding="itemName" header="품목명" width="*" align="left" />
                <wj-flex-grid-column binding="itemCode" header="품목코드" :width="100" align="left" />
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
            </b-row>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 수정 모달모달 -->
  <ow-modal
    type="XS"
    :title="'[' + modalUpdateData.title + '] 예정시간 수정'"
    ref="childUpdateRef"
    v-if="modalUpdateData"
    :acceptButton="true"
  >
    <div>사원명 - {{ modalUpdateData.employeeName }}</div>
    <div>업체명 - {{ modalUpdateData.title }}</div>
    <span class="mt-5">
      <ow-input-time
        ref="startInputTime"
        v-if="modalUpdateData.scheduledStartTime"
        v-model="modalUpdateData.scheduledStartTime"
        :after="endInputTime"
        :min="modalUpdateData.min"
        :max="modalUpdateData.max"
        style="width: 100px"
      ></ow-input-time>
      <ow-input-time
        ref="endInputTime"
        v-if="modalUpdateData.scheduledEndTime"
        v-model="modalUpdateData.scheduledEndTime"
        :before="startInputTime"
        :min="modalUpdateData.min"
        :max="modalUpdateData.max"
        style="width: 100px"
      ></ow-input-time>
    </span>
  </ow-modal>
  <!-- 추가 모달모달 -->
  <ow-modal
    type="L"
    :title="'[' + modalAddData.title + '] 잔업시간 추가'"
    ref="childAddRef"
    v-if="modalAddData"
    :acceptButton="true"
  >
    <div>사원명 - {{ modalAddData.title }}</div>
    <table>
      <tr>
        <th class="table-title" style="width: 10%">선택</th>
        <th class="table-title" style="width: 20%">발주번호</th>
        <th class="table-title" style="width: 40%">업체명</th>
        <th class="table-title" style="width: 10%">수령일</th>
        <th class="table-title" style="width: 10%">수령품목</th>
        <th class="table-title" style="width: 10%">수령수량</th>
      </tr>
      <tr v-for="(order, index) in modalAddData.data" :key="index">
        <td class="table-body-center">
          <input type="radio" id="placingOrderNo" :value="order" v-model="picked" />
        </td>
        <td class="table-body-center">{{ order.placingOrderNo }}</td>
        <td class="table-body-center">{{ order.title }}</td>
        <td class="table-body-center">{{ order.receiveDate }}</td>
        <td class="table-body-center">{{ order.receiveItem }}</td>
        <td class="table-body-center">{{ order.receiveQuantity }}</td>
      </tr>
    </table>
  </ow-modal>
</template>

<script setup>
import { ref, reactive, toRefs, watch, computed, toRaw } from 'vue';
import inspectionLabelingApi from '@/api/inspectionLabelingApi';
import OwStatusBar from '@/app/edu/components/OwStatusBar';
import { TreeMergeManager, SimpleMergeManager } from '@/utils/wijmo.grid';

const childItemsPath = ['child', 'childrennn'];

const getTree = ref([]);
const getGrid = ref([]);
const keyData = ref(0);
const treeKeyData = ref(0);

getTree.value = async function (query, pageNo, pageSize) {
  const treeList = await inspectionLabelingApi.getTreeList();

  const result = {
    totalCount: 1,
    data: treeList,
  };

  return result;
};

const title = ref(null);
const searchSelected = ref(null);
const searchContent = ref(null);

const orderStatus = ref([
  { name: '물품수령 : ', value: '', end: '품목', plusValue: '', plusend: '개' },
  { name: '검품검수 : ', value: '', end: '품목', plusValue: '', plusend: '개' },
  { name: '라벨링 : ', value: '', end: '품목', plusValue: '', plusend: '개' },
]);

const inspectionStatus = ref([
  { name: '양품 : ', value: '', end: '품목', plusValue: '', plusend: '개' },
  { name: '누락 : ', value: '', end: '품목', plusValue: '', plusend: '개' },
  { name: '파손 : ', value: '', end: '품목', plusValue: '', plusend: '개' },
]);

async function getStatus() {
  const result = await inspectionLabelingApi.getStatus().then((data) => {
    orderStatus.value[0].value = data.receiveItem;
    orderStatus.value[0].plusValue = data.receiveItemQuantity;

    orderStatus.value[1].value = data.inspectionItem;
    orderStatus.value[1].plusValue = data.inspectionItemQuantity;

    orderStatus.value[2].value = data.labelingItem;
    orderStatus.value[2].plusValue = data.labelingItemQuantity;

    inspectionStatus.value[0].value = data.passedItem;
    inspectionStatus.value[0].plusValue = data.passedItemQuantity;

    inspectionStatus.value[1].value = data.missingItem;
    inspectionStatus.value[1].plusValue = data.missingItemQuantity;

    inspectionStatus.value[2].value = data.damagedItem;
    inspectionStatus.value[2].plusValue = data.damagedItemQuantity;
  });
}
getStatus();

// --------------------------------------- 추가 모달에 띄울 잔업 -------------------------------------------------------
const childAddRef = ref(null);
const modalAddData = ref(null);
const addDate = ref(false);
const picked = ref(null);
const labelingWorkTimeNo = ref(null);
const startTime = ref(null);

const getOvertime = async function () {
  const overtime = await inspectionLabelingApi.getOvertime();
  return overtime;
};

const openAddModal = async function () {
  picked.value = null;
  const childAddRefData = await childAddRef.value.open();
  console.log(childAddRefData);
  if (childAddRefData.ok === true) {
    //작업 추가하는 로직
    console.log(picked.value);
    console.log(modalAddData.value);

    const requestData = {
      receiveItem: picked.value.receiveItem,
      receiveQuantity: picked.value.receiveQuantity,
      placingOrderNo: picked.value.placingOrderNo,
      labelingWorkTimeNo: labelingWorkTimeNo.value,
      startTime: startTime.value,
      endTime: '18:00',
    };
    const result = await inspectionLabelingApi.updateOvertime(requestData).then((result) => {
      console.log('updateReceiptList - result : ' + result);
      treeKeyData.value++;
    });
  }
};

// ----------------------------------------------------------------------------------------------------

// --------------------------------------- 수정 모달 update -------------------------------------------------------
const updateDate = ref(false);
const startInputTime = ref(null);
const endInputTime = ref(null);
const placingOrderNo = ref(null);

let modalUpdateData = reactive({
  title: '',
  employeeName: '',
  scheduledStartTime: '',
  scheduledEndTime: '',
  min: '',
  max: '',
});
const childUpdateRef = ref(null);

const openUpdateModal = async function () {
  picked.value = null;
  const childUpdateRefData = await childUpdateRef.value.open();
  console.log(childUpdateRefData);

  if (childUpdateRefData.ok === true) {
    console.log(modalUpdateData.scheduledStartTime);
    console.log(modalUpdateData.scheduledEndTime);
    console.log(labelingWorkTimeNo);
    const requestData = {
      placingOrderNo: placingOrderNo.value,
      labelingWorkTimeNo: labelingWorkTimeNo.value,
      startTime: modalUpdateData.scheduledStartTime,
      endTime: modalUpdateData.scheduledEndTime,
    };
    console.log(requestData);
    const result = await inspectionLabelingApi.updateWorktime(requestData).then((result) => {
      console.log('updateReceiptList - result : ' + result);
      treeKeyData.value++;
    });
  }
};
// ----------------------------------------------------------------------------------------------------

//트리 그리드 셀렉션 핸들러
const onSelectionChanged = (grid, target) => {
  //반응형 변수 세팅(검색 조건 리셋)
  searchSelected.value = '';
  searchContent.value = '';
  addDate.value = false;
  updateDate.value = false;
  //컴포넌트가 destroy될때도 실행되기 때문에 row가 -1일때는 실행하지 않도록 막는 설정
  if (target.row !== -1) {
    //childrenn이라는 key가 있으면 담당자이므로 api통신으로 오른쪽 그리드 띄우기
    if (grid.selectedItem.childrennn != null) {
      addDate.value = true;
      title.value = grid.selectedItem.title;
      labelingWorkTimeNo.value = grid.selectedItem.labelingWorkTimeNo;
      startTime.value = grid.selectedItem.childrennn.at(-1).scheduledEndTime;
      console.log(grid.selectedItem);
      //------
      getOvertime().then((data) => {
        modalAddData.value = {
          data: data,
          title: title.value,
        };
        console.log('modalAddDatamodalAddData', modalAddData);
      });
      //---------

      getGrid.value = async function (query, pageNo, pageSize) {
        //pageNo => "페이지번호" pageSize => "한페이지 몇 행" totalCount => "전체 행 수"
        const lee = await inspectionLabelingApi.getListByLWTNo(
          labelingWorkTimeNo.value,
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

    if (!grid.selectedItem.childrennn && !grid.selectedItem.child && !grid.selectedItem.startTime) {
      updateDate.value = true;

      modalUpdateData.title = grid.selectedItem.title;
      modalUpdateData.employeeName = grid.selectedItem.employeeName;
      modalUpdateData.scheduledStartTime = grid.selectedItem.scheduledStartTime;
      modalUpdateData.scheduledEndTime = grid.selectedItem.scheduledEndTime;

      const testGrid = grid.itemsSource.items[0].child;
      testGrid.map((data) => {
        if (data.title === grid.selectedItem.employeeName) {
          console.log(data);
          console.log(data.childrennn);
          console.log(grid.selectedItem.placingOrderNo);
          console.log(data.childrennn.length);
          labelingWorkTimeNo.value =data.labelingWorkTimeNo;
          
          //선택한 발주번호가 상위 배열의 어떤 인덱스에 있는지
          const index = data.childrennn.findIndex((i) => i.placingOrderNo === grid.selectedItem.placingOrderNo);
          placingOrderNo.value = grid.selectedItem.placingOrderNo;
          //인덱스가 0인 경우
          if (index === 0) {
            const afterArray = data.childrennn[index + 1];
            modalUpdateData.min = '09:00';
            modalUpdateData.max = afterArray.scheduledStartTime;
          } else if (index === data.childrennn.length - 1) {
            // 인덱스가 마지막(인덱스 == 배열길이)인 경우
            const beforeArray = data.childrennn[index - 1];
            modalUpdateData.min = beforeArray.scheduledEndTime;
            modalUpdateData.max = '18:00';
          } else {
            //나머지 일반 경우
            const beforeArray = data.childrennn[index - 1];
            const afterArray = data.childrennn[index + 1];
            modalUpdateData.min = beforeArray.scheduledEndTime;
            modalUpdateData.max = afterArray.scheduledStartTime;
          }
        }
      });
      console.log(testGrid);
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
        const receiveQuantity = row.dataItem.receiveQuantity; //진행률 전체 작업량
        const currentQuantity = row.dataItem.currentQuantity; //현재 달성률 전체 작업량

        const progressQuantity = row.dataItem.progressQuantity; //현재 작업량

        const receivePercent = Math.round((progressQuantity / receiveQuantity) * 100); //진행률 퍼센트(계산)
        const currentPercent = Math.round((progressQuantity / currentQuantity) * 100); //현재 달성률 퍼센트(계산)

        const LWTNine = row.dataItem.lwtnine;
        const LWTTen = row.dataItem.lwtten;
        const LWTEleven = row.dataItem.lwteleven;
        const LWTThirteen = row.dataItem.lwtthirteen;
        const LWTFourteen = row.dataItem.lwtfourteen;
        const LWTFifteen = row.dataItem.lwtfifteen;
        const LWTSixteen = row.dataItem.lwtsixteen;
        const LWTSeventeen = row.dataItem.lwtseventeen;

        const startTime = row.dataItem.scheduledStartTime.slice(0, 2); //예정 시작 시간
        const endTime = row.dataItem.scheduledEndTime.slice(0, 2); //예정 완료 시간

        // 예정시간안에 있는 시간인지 체크하는 메소드(배경색 흰색, 회색 설정)
        function timeCheckFunc(paramTime) {
          let timeCheck = false;

          if (paramTime >= startTime && paramTime <= endTime - 1) {
            timeCheck = true;
          }
          return timeCheck;
        }

        //진행률 progress bar html 생성하는 메소드
        function createTag(params, paramTime) {
          const timeCheck = timeCheckFunc(paramTime);
          let html =
            '<td>' +
            '<div class="{progress}">' +
            '<div role="progressbar" aria-valuemin="0" aria-valuemax="4" aria-valuenow="1" class="progress-bar progress-bar-{paramsColor}" style="width: {params}%"/>' +
            '{params%}</div>' +
            '<div class="normal-text">{params}%</div></td>';

          //진행률 수치에 따라서 색 넣기
          if (params <= 50) {
            html = html.replace('{paramsColor}', 'normal');
          } else if (params > 50 && params < 80) {
            html = html.replace('{paramsColor}', 'warning');
          } else if (params >= 80 && params < 100) {
            html = html.replace('{paramsColor}', 'success');
          } else if (params == 100) {
            html = html.replace('{paramsColor}', 'done');
          }

          //50%이하이면 빨간색 글씨로 바꾸고 progress div태그에 글씨 넣기
          //50%이상이면 하얀색 글씨로 바꾸고 progress-bar div태그에 글씨 넣기
          if (params < 50) {
            html = html.replace('{params%}', '');
          } else {
            html = html.replace('{params%}', params + '%');
            html = html.replace('<div class="normal-text">{params}%</div>', '');
          }
          html = html.replaceAll('{params}', params);

          //시간 체크해서 true이면 회색 배경 false이면 하얀색 배경
          if (timeCheck) {
            html = html.replace('{progress}', 'progress');
          } else {
            html = html.replace('{progress}', 'progress-none');
          }
          return html;
        }

        //최종 html 산출물
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
          createTag(LWTNine, 9) +
          createTag(LWTTen, 10) +
          createTag(LWTEleven, 11) +
          createTag(LWTThirteen, 13) +
          createTag(LWTFourteen, 14) +
          createTag(LWTFifteen, 15) +
          createTag(LWTSixteen, 16) +
          createTag(LWTSeventeen, 17) +
          '</tr>' +
          '</table>' +
          '</div>';

        html = html.replace('{receiveItemQuantity}', receiveQuantity);
        html = html.replace('{currentQuantity}', currentQuantity);
        html = html.replaceAll('{progressQuantity}', progressQuantity);
        html = html.replace('{receivePercent}', receivePercent);
        html = html.replace('{currentPercent}', currentPercent);

        html = html.replaceAll('null%', '');
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

  //그리드 셀렉션모드 설정(None)
  grid.selectionMode = 0;
};
</script>

<style scoped lang="scss">
::v-deep {
  .ow-panel .ow-panel-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 2px solid #6980af;
    border-top: 0;
    background-color: #fff;
    padding: var(--ow-gutter);
    margin-bottom: 10%;
  }

  .wj-cell.wj-header {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: inherit;
  }

  .ow-grid .wj-cell.wj-header {
    color: #333333;
    background-color: #e9ecef;
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

  // 모달
  .table-title {
    background-color: rgb(231, 234, 241);
    text-align: center;
  }

  .table-body-center {
    text-align: center;
  }

  .table-body-right {
    text-align: right;
  }
}
</style>
