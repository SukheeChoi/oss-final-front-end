<template>
  <div class="ow-flex-wrap dir-col" style="--gap: 10px">
    <div class="ow-flex-wrap item-size-content">
        <!-- 수령/전달 -->
      <div class="item size-fix" style="margin-right: 6px;">
        <button class="ow-btn type-group" @click="handleChangeToReceipt" v-bind:class="{ active: showReceipt }"><span>수령</span></button>
        <button class="ow-btn type-group" @click="handleChangeToDelivery" v-bind:class="{ active: !showReceipt }"><span>전달</span></button>
      </div>
      <!-- 수령 대상 업체 필터링 -->
      <div v-if="showReceipt && vendorList != null && vendorList.length > 0" class="item size-fix" style="--gap-item: 6px">
        <div class="ow-filter" style="width: 370px;">
          <ow-filter-radio id="vendor-filter-radio"
            :items="vendorList"
            :step="5"
            v-model="selectedVendor"
            @update="selectedVendor = value('vendor-filter-radio').toString()"
          />
        </div>
      </div>

      <!-- 전달 담당자 이름 filter -->
      <div v-if="!showReceipt && assigneeList != null && assigneeList.length > 0" class="item size-fix" style="--gap-item: 6px">
        <div class="ow-filter" style="width: 270px;">
          <ow-filter-radio id="assignee-filter-radio"
            :items="assigneeList"
            :step="4"
            v-model="selectedAssignee"
            @update="selectedAssignee = value('assignee-filter-radio')"
          />
        </div>
      </div>

      <div class="item align-to-right" style="gap: 6px;">
        <!-- 할일/한일 -->
        <div>
          <button class="ow-btn type-group" @click="handleChangeToTodo" v-bind:class="{ active: toDo==1 }"><span>할일</span></button>
          <button class="ow-btn type-group" @click="handleChangeToDone" v-bind:class="{ active: toDo==0 }"><span>한일</span></button>
        </div>
        <!-- 날짜 선택 -->
        <div>
          <div class="ow-input">
            <ow-input-date :modelValue="startDate" @update:modelValue="updateStartDate" />
            <span style="margin: 4px;">~</span>
            <ow-input-date :modelValue="endDate" @update:modelValue="updateEndDate" />
          </div>
        </div>
        <div>
          <!-- 조회 -->
          <button class="ow-btn type-util" @click="handleClickSearch">조회</button>
          <!-- 품목수령(선택된 갯수) -->
          <button v-if="showReceipt && toDo===1" class="ow-btn type-util" @click="updateReceiptList()">품목수령({{receiptedList.length}})</button>  
          <!-- <button v-if="showReceipt && toDo===1" class="ow-btn type-util" @click="checkBeforeUpdateReceipt()">품목수령({{receiptedList.length}})</button>   -->
          <!-- 품목전달(선택된 갯수) -->
          <button v-if="!showReceipt && toDo===1" class="ow-btn type-util" @click="updateDeliveryList()">품목전달({{deliveredList.length}})</button>  
        </div>
      </div>

      </div>
  </div>

  <!-- ngrid -->
  <!-- '수령'탭이 선택된 경우. -->
  <ow-n-grid
    v-if="showReceipt"
    :initialized="onInitialized"
    :n="flexGridNum"
    :read="getReceiptList"
    :key="receiptKey"
    :visibleRowsCount="20"
    :totalCount="pager.totalCount"
  >
  <template #left>&nbsp;</template>
    <wj-flex-grid-column header="No" binding="rownum" align="center" :width="40"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목명" binding="item.itemName" align="left" width="3*"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목코드" binding="item.itemCode" align="center" width="*" wordWrap="true"></wj-flex-grid-column>
    <wj-flex-grid-column v-if="showReceipt==true && toDo==1" header="출고수량" binding="informationPartner.releaseQuantity" align="right" :width="70"></wj-flex-grid-column>
    <wj-flex-grid-column v-if="showReceipt==true && toDo==0" header="수령수량" binding="receiveQuantity" align="right" :width="70"></wj-flex-grid-column>
    <wj-flex-grid-column v-if="toDo==1" header="미출고" binding="receiveUnreleaseQuantity" align="right" :width="60">
      <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
        <div class="ow-input">
          <input id="receiptUnreleaseInput" type="text"
            style="text-align: right"
            v-model="cell.item.receiveUnreleaseQuantity"
            @input="checkReceiptUnreleaseInput($event, cell.item.rownum)"
            @change="changeReceiptUnrelease($event, cell.item.orderItem.orderItemNo, cell.item.receiveUnreleaseQuantity)"
          />
        </div>
      </wj-flex-grid-cell-template>
    </wj-flex-grid-column>
    <wj-flex-grid-column v-if="toDo==0" header="미출고" binding="receiveUnreleaseQuantity" :width="60" />
    <wj-flex-grid-column v-if="toDo==1" header="수령여부" binding="orderItem.orderItemNo" align="center" :width="70" wordWrap="true">
      <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
        <button id="receipt-check-btn" class="ow-btn type-icon check-state" @click="checkReceiptCheckBtn($event, cell.item.orderItem.orderItemNo)"></button>
      </wj-flex-grid-cell-template>
    </wj-flex-grid-column>
  </ow-n-grid>
  <!-- '전달'탭이 선택된 경우. -->
  <ow-n-grid
    v-if="!showReceipt"
    :initialized="onInitialized"
    :n="flexGridNum"
    :read="getDeliveryList"
    :key="deliveryKey"
    :visibleRowsCount="20"
    :totalCount="pager.totalCount"
  >
    <template #left>&nbsp;</template>
    <wj-flex-grid-column header="No" binding="rownum" align="center" :width="40"></wj-flex-grid-column>
    <wj-flex-grid-column header="주문/출고번호" binding="orderItem.orderNo" align="center" width="2*">
      <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
        <span>{{cell.item.orderItem.orderNo}}/{{cell.item.release.releaseCode}}</span>
      </wj-flex-grid-cell-template>
    </wj-flex-grid-column>
    <wj-flex-grid-column header="품목명" binding="item.itemName" align="left" width="3*"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목코드" binding="item.itemCode" align="center" width="*" wordWrap="true"></wj-flex-grid-column>
    <wj-flex-grid-column v-if="showReceipt==false && toDo==1" header="수령수량" binding="receiveQuantity" align="right" :width="70"></wj-flex-grid-column>
    <wj-flex-grid-column v-if="showReceipt==false && toDo==0" header="전달수량" binding="deliveryQuantity" align="right" :width="70"></wj-flex-grid-column>
    <wj-flex-grid-column header="미출고" binding="orderItem.unreleaseQuantity" align="right" :width="60">
      <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
        <span>{{cell.item.orderItem.unreleaseQuantity || 0}}</span>
      </wj-flex-grid-cell-template>
    </wj-flex-grid-column>
    <wj-flex-grid-column v-if="toDo==1" header="전달여부" binding="orderItem.orderItemNo" align="center" :width="70" wordWrap="true">
      <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
        <button class="ow-btn type-icon check-state" @click="handleDeliveryCheckBtn($event, cell.item.orderItem.orderItemNo)"></button>
      </wj-flex-grid-cell-template>
    </wj-flex-grid-column>
  </ow-n-grid>

  <!-- 수령 미출고 유효성 검사 후 알림 모달 -->
  <ow-modal type="XS" title="알 림"  ref="modalRef" :cancelButton="true" style="font-size: 130%;" >
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100px; max-height: calc(100vh - 36px - 62px) !important;">
      <span>미출고 수량은 출고 수량보다 클 수 없습니다!</span>
    </div>
  </ow-modal>

</template>

<script setup>
  // axios 통신 모듈
  import combineShippingApi from '../../../api/combineShippingApi';
  import { ref, reactive, watch } from 'vue';

  // NGrid 안에 포함될 FlexGrid의 갯수. NGrid콤포넌트의 n prop에 전달.
  const flexGridNum = 2;
  // 컴포넌트 리로드하기 위한 key속성.
  const receiptKey = ref(0);
  const deliveryKey = ref(0);
  // 수령/전달 탭 상태값.
  const showReceipt = ref(true);
  // 할일/한일 탭 상태값.
  const toDo = ref(1);
  // 기간 필처링 위한 시작일과 종료일.
  const startDate = ref(new Date());
  const endDate = ref(new Date());
  const dateList = ref([startDate.value, endDate.value]);
  // 
  const clickSearch = ref(false);
  // 협력사/담당자 필터링 위한 객체.
  const vendorList = ref(null);
  const selectedVendor = ref('전체');
  const assigneeList = ref([{
    name: '전체'
    , value: '전체'
  }]);
  const selectedAssignee = ref('전체');
  // 서버 사이드 페이지네이션 위한 객체.
  const pager = reactive({
    // 현재 페이지의 인덱스
    pageIndex: 0
    // 현재 페이지의 번호
    , pageNo: 1
    // 전체 행 수
    , totalCount: 0
    // 페이지 당 행 수
    , rowsPerPage: 40
    // flexGrid 개당 가질 행의 갯수.
    , pageSize: 20
  });
  // 수령/전달 목록 바인딩 객체.
  const receiptList = ref([]);
  const deliveryList = ref([]);
  // 수령/전달 업데이트할 객체 담는 리스트.
  const receiptedList = ref([]);
  const deliveredList = ref([]);

  // 모달 띄우기 위함.
  const modalRef = ref(null);

  /**
   * 선택된 날짜 || 당일의 수령 대상 업체 조회.
   * @author 최숙희
   */
  async function getVendorList() {
    const result = await combineShippingApi.getVendorList(toDo.value, dateList.value)
        .then((result) => {
          if(result != null && result.list != null) {
            let dbVendor = [{
              name: '전체'
              , value: '전체'
            }];
            for(let i=0; i<result.list.length; i++) {
              let vendorNo = result.list[i]['vendorNo'];
              dbVendor.push(
                {
                  name: result.list[i]['vendorName']
                  , value: String(vendorNo)
                  , disabled: false
                }
              );
            }
            vendorList.value = dbVendor;
          } else {
            vendorList.value = null;
          }
        });
  }

  /**
   * 선택된 날짜 || 당일의 전달 담당자 조회.
   * @author 최숙희
   */
  async function getAssigneeList() {
    const result = await combineShippingApi.getAssigneeList(toDo.value, dateList.value)
        .then((result) => {
          if(result != null && result.list != null) {
            let dbAssignee = [{
              name: '전체'
              , value: '전체'
            }];
            for(let i=0; i<result.list.length; i++) {
              dbAssignee.push(
                {
                  name: result.list[i]['employeeName']
                  , value: result.list[i]['employeeId']
                  , disabled: false
                }
              );
            }
            assigneeList.value = dbAssignee;
          } else {
            assigneeList.value = null;
          }
        });
  }

  /**
   * 서버로부터 받아온 데이터를 NGrid에 바인딩하기 위한 형태로 조절.
   * @author 최숙희
   * @param {Object} param 
   */
  const retrieve = (param) => {
    let filteredItems = _.cloneDeep(param.items);
    const totalCount = pager.totalCount;

    if(param.pageNo%2 !== 0) {// 페이지에서 왼쪽 flexGrid
      filteredItems = filteredItems.splice(0, param.pageSize);
    } else {// 페이지에서 오른쪽 flexGrid
      filteredItems = filteredItems.splice(param.pageSize, filteredItems.length-1);
    }

    return Promise.resolve({
      data: filteredItems
      , totalCount: totalCount
    });
  };

  async function read(query, pageNo) {
    let items = [];
    if(showReceipt.value === true) {
      items = receiptList.value;
    } else {
      items = deliveryList.value;
    }
    const result = await retrieve({
      ...query,
      // parameter로 넘어오는 pageNo은 NGrid 내부의 FlexGrid의 번호이므로 선언해둔 상수가 아닌 parameter를 이용.
      pageNo,
      pageSize: pager.pageSize,
      items: items,
    });
    return result;
  }

  /**
   * 수령 탭 상태에서
   * NGrid에 바인딩할 데이터를 반환함.
   * 
   * @author 최숙희
   * @param {Object} query 
   * @param {Number} pageNo FlexGrid의 번호
   * @param {Number} pageSize FlexGrid 별 행 수
   * @param {Number} pageIndex Ngrid
   */
  async function getReceiptList(query, pageNo, pageSize=20, pageIndex=0) {
    // 업데이트를 위한 수령체크 목록 초기화.
    receiptedList.value = [];

    pager.pageIndex = pageIndex;
    pager.pageNo = pageIndex + 1;

    const result = await combineShippingApi.getReceiptList(
      toDo.value
      , selectedVendor.value
      , Array.from(dateList.value)
      , pageIndex+1
      , pager.rowsPerPage
    );

    if(result != null && result.receiptList != null) {
      receiptList.value = result.receiptList;
      pager.pageNo = result.pager.pageNo;
      pager.totalCount = result.pager.totalRows;
      pager.rowsPerPage = result.pager.rowsPerPage;
    } else {
      receiptList.value = [];
    }
    const receiptResult = read(query, pageNo);

    return receiptResult;

  };
  getReceiptList();
  receiptKey.value++;

  /**
   * 수령 Update.
   * @author 최숙희
   */
  async function updateReceiptList() {
    const result = await combineShippingApi.updateReceiptList(Array.from(receiptedList.value))
      .then((result) => {
        getReceiptList();
        receiptKey.value++;
      });
  }
  
  /**
   * 전달 탭 상태에서
   * NGrid에 바인딩할 데이터를 반환함.
   * 
   * @author 최숙희
   * @param {Object} query 
   * @param {Number} pageNo FlexGrid의 번호
   * @param {Number} pageSize FlexGrid 별 행 수
   * @param {Number} pageIndex Ngrid
   */
  async function getDeliveryList(query, pageNo, pageSize=20, pageIndex=0) {
    // 업데이트를 위한 전달체크 목록 초기화.
    deliveredList.value = [];

    pager.pageIndex = pageIndex;
    pager.pageNo = pageIndex + 1;
    
    const result = await combineShippingApi.getDeliveryList(
      toDo.value
      , selectedAssignee.value
      , Array.from(dateList.value)
      , pageIndex+1
      , pager.rowsPerPage
    );

    if(result != null && result.deliveryList != null) {
      deliveryList.value = result.deliveryList;
      pager.pageNo = result.pager.pageNo;
      pager.totalCount = result.pager.totalRows;
      pager.rowsPerPage = result.pager.rowsPerPage;
    } else {
      deliveryList.value = [];
    }

    const deliveryResult = read(query, pageNo, pageSize);

    return deliveryResult;
  }

  /**
   * 전달 Update.
   * @author 최숙희
   */
  async function updateDeliveryList() {
    const result = await combineShippingApi.updateDeliveryList(deliveredList.value)
      .then(() => {
        getDeliveryList(toDo.value, '', dateList.value);
        deliveryKey.value++;
      });
  }

/**
 * 그리드 초기설정
 * @author 최숙희
 * @param {FlexGrid} flex FlexGrid 프록시 객체.
 */
const onInitialized = (flex) => {
  // 그리드 선택모드 해제
  flex.selectionMode = 0;
};

  // 모달 이용하기 위한 함수
  async function openModal() {
    const config = {
      data: {},
      cancelButtonText: '확인',
    };
    const childRefData = await modalRef.value.open('accept', config);
  }

  //수령/전달 탭 전환 관리.
  watch(() => showReceipt.value
  , (newShowReceipt, oldShowReceipt) => {
    // 수령/전달 탭 변경시에 담당업체/담당자 목록 초기화.
    assigneeList.value = [];
    vendorList.value = [];

    // update용 list 초기화.
    receiptedList.value = [];
    deliveredList.value = [];

    if(newShowReceipt === true) {
      getReceiptList();
      receiptKey.value++;
      getVendorList();
    } else {
      getDeliveryList();
      deliveryKey.value++;
      getAssigneeList();
    }
  });
  // 할일/한일 초기화 관리.
  watch(() => toDo.value
  , (newToDo, oldToDo) => {
    // update용 list 초기화.
    receiptedList.value = [];
    deliveredList.value = [];

    if(showReceipt.value === true) {
      // 선택된 담당업체 초기화.
      selectedVendor.value = '전체';
      getReceiptList(); // 내부에서 getVendorList() 호출.
      receiptKey.value++;
    } else {
      // 선택된 담당자 초기화.
      selectedAssignee.value = '전체';
      getDeliveryList(); // 내부에서 getAssigneeList() 호출.
      deliveryKey.value++;
    }
  });
  // 조회 감시.
  watch(() => clickSearch.value
  , (newClickSearch, oldClickSearch) => {
    if(showReceipt.value === true) {
      getReceiptList();
      receiptKey.value++;
      getVendorList();
    } else {
      getDeliveryList();
      deliveryKey.value++;
      getAssigneeList();
    }
    clickSearch.value = false;
  });

  // 담당업체 선택을 감시.
  watch(() => selectedVendor.value
    , (newSelectedVendor, oldSelectedVendor) => {
      selectedVendor.value = newSelectedVendor;
      getReceiptList();
      receiptKey.value++;
      console.log('watch(() => selectedVendor.value : ', selectedVendor.value);
    }
  );
  // 담당자 선택을 감시.
  watch(() => selectedAssignee.value
    , (newSelectedAssignee, oldSelectedAssignee) => {
      selectedAssignee.value = newSelectedAssignee;
      getDeliveryList();
      deliveryKey.value++;
    }
  );

  // 수령 탭 클릭시.
  function handleChangeToReceipt() {
    showReceipt.value = true;
  }
  // 전달 탭 클릭시.
  function handleChangeToDelivery() {
    showReceipt.value = false;
  }

  // 할 일 탭 클릭시.
  function handleChangeToTodo() {
    toDo.value = 1;
  }
  // 한 일 탭 클릭시.
  function handleChangeToDone() {
    toDo.value = 0;
  }

  // 날짜 변경 핸들러.
  function updateStartDate(event) {
    // 할당해주지 않으면 바인딩 객체의 값이 바뀌진 않음.
    startDate.value = event;
    dateList.value[0] = startDate.value;
  }
  function updateEndDate(event) {
    endDate.value = event;
    dateList.value[1] = endDate.value;
  }

  // 조회 버튼 클릭시.
  function handleClickSearch() {
    clickSearch.value = true;
  }

  // 사용자로부터 입력받는 수령 미출고 값에 대한 유효성 검사.
  function checkReceiptUnreleaseInput(event, rownum) {
    let inputUnreleasedQuantity = event.target.value;
    // 미출고값에 자연수만 입력받을 수 있도록 정규식을 이용. 문자나 특수기호가 입력 불가능하게 만듦.
    // inputUnreleasedQuantity = inputUnreleasedQuantity.replace(/[^0-9]/g, '');
    event.target.value = inputUnreleasedQuantity.replace(/[^0-9]/g, '');
  
    receiptList.value[(rownum-1) - (pager.rowsPerPage * pager.pageIndex)]['receiveUnreleaseQuantity'] = inputUnreleasedQuantity;
    // 미출고 수량은 출고 수량(주문수량과 같거나 작음)보다 커질 수 없음.
    if(parseInt(inputUnreleasedQuantity) > parseInt(receiptList.value[(rownum-1) - (pager.rowsPerPage * pager.pageIndex)]['informationPartner']['releaseQuantity'])) {
      // 입력된 미출고 수량이 출고 수량보다 큰 경우, 해당 미출고값을 0으로 초기화 하고, alert 띄움.
      receiptList.value[rownum-1]['receiveUnreleaseQuantity'] = 0;
      event.target.value = 0;
      // 모달 열어서 '미출고 수량은 출고 수량 보다 클 수 없습니다!'라는 알림을 띄움.
      openModal();
    }

  }

  // ReceiptList의 unreleased update에 대한 handler.
  function changeReceiptUnrelease(event, orderItemNo, unreleased) {
    let btnTag = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('#receipt-check-btn');
    if(btnTag.classList.contains('active')) { // 수령여부 체크된 상태. -> 수정.
      for(let i=0; i<receiptedList.value.length; i++) {
        if(receiptedList.value[i]['orderItemNo'] === orderItemNo) {
          receiptedList.value[i]['receiveUnreleaseQuantity'] = parseInt(unreleased);
          
          break;
        }
      }
    }
  }

  // 수령여부 체크 버튼 클릭시.
  function checkReceiptCheckBtn(event, orderItemNo) {
    let targetTag = event.target.parentNode.parentNode.parentNode.parentNode;
    let unreleaedTarget = targetTag.querySelector("input");
    let targetObject = {
      orderItemNo: orderItemNo
      , receiveUnreleaseQuantity: unreleaedTarget.value
    };
    // 수령여부 체크해제.
    if(event.target.classList.contains('active')) {
      // 수령객체에서 체크 해제된 객체 삭제.
      receiptedList.value.pop(targetObject);
    // 수령여부 체크.
    } else {
      // 수령객체에 update할 객체 추가.
      receiptedList.value.push(targetObject);
    }
    // 활성화 클래스 toggle.
    event.target.classList.toggle('active');
  }
  // 전달여부 체크 버튼 클릭시.
  function handleDeliveryCheckBtn(event, orderItemNo) {
    if(event.target.classList.contains('active')) {
      // 전달객체에서 해당하는 객체 삭제.
      deliveredList.value.pop(orderItemNo);
    } else {
      // 전달객체에 객체 추가.
      deliveredList.value.push(orderItemNo);
    }
    // 활성화 클래스 toggle.
    event.target.classList.toggle('active');
  }

</script>

<style lang="scss" scoped>
:deep {
  .wj-cell.wj-header {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: inherit;

    color: #333333;
    background-color: #E8ECF1;
    // background-color: #E1E7EE;
  }

  .wj-flexgrid .wj-cell.wj-align-center {
    justify-content: center;
  }

  .wj-cell.border-center {
    display: flex;
    align-items: center;
    line-height: inherit;
  }
}
</style>