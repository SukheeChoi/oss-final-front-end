<template>
  <div class="ow-flex-wrap dir-col" style="--gap: 10px">
    <div class="ow-flex-wrap item-size-content">
        <!-- 수령/전달 -->
      <div class="item size-fix" style="margin-right: 6px;">
        <button class="ow-btn type-group" @click="handleChangeToReceipt" v-bind:class="{ active: showReceipt }"><span>수령</span></button>
        <button class="ow-btn type-group" @click="handleChangeToDelivery" v-bind:class="{ active: !showReceipt }"><span>전달</span></button>
      </div>
      <!-- 수령 대상 업체 필터링 -->
      <div v-if="showReceipt && vendorList!=null" class="item size-fix" style="--gap-item: 6px">
        <div class="ow-filter" style="width: 370px;">
          <ow-filter-radio id="vendor-filter-radio" :items="vendorList" :step="5" v-model="selectedVendor" @update="selectedVendor = value('vendor-filter-radio')" :key="vendorKey"/>
          <!-- <ow-filter-radio :items="vendorList" :step="5" :modelValue="selectedVendor" @update:modelValue="updateVendor" :key="vendorKey"/> -->
        </div>
      </div>

      <!-- 전달 담당자 이름 filter -->
      <div v-if="!showReceipt && assigneeList!=null" class="item size-fix" style="--gap-item: 6px">
        <div class="ow-filter" style="width: 270px;">
          <!-- <ow-filter-radio id="assignee-filter-radio" :items="assigneeList" :step="4" v-model="selectedAssignee" @update:modelValue="updateSelectedAssignee" :key="assigneeKey"/> -->
          <ow-filter-radio id="assignee-filter-radio" :items="assigneeList" :step="4" v-model="selectedAssignee" @update="selectedAssignee = value('assignee-filter-radio')" :key="assigneeKey"/>
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
          <!-- 품목전달(선택된 갯수) -->
          <button v-if="showReceipt && toDo===1" class="ow-btn type-util" @click="updateReceiptList()">품목수령({{checkedReceiptCount}})</button>  
          <button v-if="!showReceipt && toDo===1" class="ow-btn type-util" @click="updateDeliveryList()">품목전달({{checkedDeliveryCount}})</button>  
        </div>
      </div>

      </div>
  </div>

  <!-- ngrid -->
  <!-- '수령'탭이 선택된 경우. -->
  <ow-n-grid
    v-if="showReceipt"
    :initialized="initialize"
    :n="2"
    :read="read"
    :key="receiptKey"
    :insert="insert"
    :update="update"
    :remove="remove"
    :visible-rows-count="state.visibleRowsCount"
  >
  <template #left>&nbsp;</template>
    <wj-flex-grid-column header="No" binding="rownum" align="center" :width="40"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목명" binding="item.itemName" width="3*"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목코드" binding="item.itemCode" align="center" width="*" wordWrap="true"></wj-flex-grid-column>
    <wj-flex-grid-column v-if="showReceipt==true && toDo==1" header="출고수량" binding="releaseQuantity" :width="70"></wj-flex-grid-column>
    <wj-flex-grid-column v-if="showReceipt==true && toDo==0" header="수령수량" binding="receiveQuantity" :width="70"></wj-flex-grid-column>
    <wj-flex-grid-column v-if="toDo==1" header="미출고" binding="release.unrelease" :width="60">
      <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
        <div class="ow-input">
          <input id="receiptUnreleaseInput" type="text" v-model="cell.item.release.unrelease"/>
        </div>
      </wj-flex-grid-cell-template>
    </wj-flex-grid-column>
    <wj-flex-grid-column v-if="toDo==0" header="미출고" binding="release.unrelease" :width="60" />
    <!-- <wj-flex-grid-column v-if="toDo==1" header="수령여부" binding="orderItemNo" align="center" :width="70" wordWrap="true"> -->
    <wj-flex-grid-column v-if="toDo==1" header="수령여부" binding="orderItemNo" align="center" :width="70" wordWrap="true">
      <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
        <!-- <button class="ow-btn type-icon check-state" @click="checkReceiptCheckBtn($event, cell.item.orderItemNo, cell.item.No)"></button> -->
        <button class="ow-btn type-icon check-state" @click="checkReceiptCheckBtn($event, cell.item.orderItemNo)"></button>
        <!-- <button type="button" class="ow-btn type-flat ml-5" @click="lookup(cell.item.~)">선택</button> -->
      </wj-flex-grid-cell-template>
    </wj-flex-grid-column>
  </ow-n-grid>
  <!-- '전달'탭이 선택된 경우. -->
  <ow-n-grid
    v-if="!showReceipt"
    :initialized="initialize"
    :n="2"
    :read="read"
    :key="deliveryKey"
    :insert="insert"
    :update="update"
    :remove="remove"
    :visible-rows-count="state.visibleRowsCount"
  >
    <template #left>&nbsp;</template>
    <wj-flex-grid-column header="No" binding="rownum" align="center" :width="40"></wj-flex-grid-column>
    <wj-flex-grid-column header="주문/출고번호" binding="orderItem.orderNo" align="center" width="2*"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목명" binding="item.itemName" width="3*"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목코드" binding="item.itemCode" align="center" width="*" wordWrap="true"></wj-flex-grid-column>
    <wj-flex-grid-column v-if="showReceipt==false && toDo==1" header="수령수량" binding="receiveQuantity" :width="70"></wj-flex-grid-column>
    <wj-flex-grid-column v-if="showReceipt==false && toDo==0" header="전달수량" binding="deliveryQuantity" :width="70"></wj-flex-grid-column>
    <wj-flex-grid-column header="미출고" binding="release.unrelease" :width="60"></wj-flex-grid-column>
    <wj-flex-grid-column v-if="toDo==1" header="전달여부" binding="orderItemNo" align="center" :width="70" wordWrap="true">
      <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
        <button class="ow-btn type-icon check-state" @click="handleDeliveryCheckBtn($event, cell.item.orderItemNo)"></button>
        <!-- <button type="button" class="ow-btn type-flat ml-5" @click="lookup(cell.item.~)">선택</button> -->
      </wj-flex-grid-cell-template>
    </wj-flex-grid-column>
  </ow-n-grid>
</template>

<script setup>
  import combineShippingApi from '../../../api/combineShippingApi';
  import { ref, reactive, watch } from 'vue';
  import OwNGrid from '@/components/grid/new/OwNGrid';

  const receiptKey = ref(0);
  const deliveryKey = ref(0);
  const showReceipt = ref(true);
  const toDo = ref(1);
  const startDate = ref(new Date());
  const endDate = ref(new Date());
  const clickSearch = ref(false);
  const vendorList = ref({
    name: '전체'
    , value: '전체'
  });
  const selectedVendor = ref('전체');
  const assigneeList = ref({
    name: '전체'
    , value: '전체'
  });
  const selectedAssignee = ref('전체');
  const dateList = ref([startDate.value, endDate.value]);
  const receiptList = ref([]);
  const receiptedList = ref([]);
  const deliveryList = ref([]);
  const deliveredList = ref([]);
  const checkedReceiptCount = ref(0);
  const checkedDeliveryCount = ref(0);

  const vendorKey = ref(1);

  //수령 탭
  // 선택된 날짜 || 당일의 수령 대상 업체명 조회.
  const getVendorList = async () => {
    const result = await combineShippingApi.getVendorList(toDo.value, dateList.value)
        .then((result) => {
          if(result != null && result.list != null) {
            let dbVendor = [{
              name: '전체'
              , value: '전체'
            }];
            for(let i=0; i<result.list.length; i++) {
              console.log('## result.list[i] : ', result.list[i]);
              dbVendor.push(
                {
                  name: result.list[i]['vendorName']
                  , value: result.list[i]['vendorName']
                  // , value: result.list[i]['vendorCode']
                  // , disabled: false
                }
              );
            }
            vendorList.value = dbVendor;
          } else {
            vendorList.value = null;
          }
        });
    // return result;
  };
  getVendorList();

  //담당자 조회. 페이지네이션 고려X.
  // 할 일: 해당기간에 수령완료된 이력의 담당자. -> 사실상 '수령 한 일'의 담당자와 같음.
  // 한 일: 해당기간에 전달이력의 담당자.
  const getAssigneeList = async () => {
    const result = await combineShippingApi.getAssigneeList(toDo.value, dateList.value)
        .then((result) => {
          console.log('## getAssigneeList result : ', result);
          if(result != null && result.list != null) {
            let dbAssignee = [{
              name: '전체'
              , value: '전체'
            }];
            for(let i=0; i<result.list.length; i++) {
              console.log('## result.list[i] : ', result.list[i]);
              dbAssignee.push(
                {
                  name: result.list[i]
                  , value: result.list[i]
                  , disabled: false
                }
              );
            }
            assigneeList.value = dbAssignee;
          } else {
            assigneeList.value = null;
          }
        });
  };
  getAssigneeList();

  const retrieve = (param) => {
    console.log('@@ param', param);
    console.log('@@ param.items.length : ' + param.items.length);
    let items = _.cloneDeep(param.items);
    // let filteredItems = items.receiptList;
    let filteredItems = items;
    // let filteredItems = [];

    // if(param.label === 'receipt') {
    //   for(let i=0; i<items.length; i++) {
    //     filteredItems.push({
    //       'No': i+1  //pagination할 때 rowNum 함께 받아서 이용할 것.
    //       , 'itemName': receiptList.value[i]["item"]["itemName"]
    //       , 'itemCode': receiptList.value[i]["item"]["itemCode"]
    //       , 'releaseQuantity': receiptList.value[i]["releaseQuantity"]
    //       , 'receiveQuantity': receiptList.value[i]["receiveQuantity"]
    //       , 'unreleased': receiptList.value[i]["receiveUnrelease"]
    //       , 'receipted': receiptList.value[i]["receiveCheck"]

    //       , 'orderItemNo': receiptList.value[i]["orderItemNo"]
    //     });
    //   }
    // } else {
    //   console.log('#### deliveryList.value', deliveryList.value);
    //   console.log('#### deliveryList.value.length', deliveryList.value.length);
    //   for(let i=0; i<items.length; i++) {
    //     filteredItems.push({
    //       // ROWNUM 사용할 것.
    //       'No': i+1
    //       // 주문번호/출고번호
    //       , 'order_release_no': deliveryList.value[i]["orderItem"]["orderNo"] + '/' + deliveryList.value[i]["release"]["releaseNo"]
    //       // 품목명
    //       , 'itemName': deliveryList.value[i]["item"]["itemName"]
    //       // 품목코드
    //       , 'itemCode': deliveryList.value[i]["item"]["itemCode"]
    //       // 수령수량
    //       , 'receiveQuantity': deliveryList.value[i]["receiveQuantity"]
    //       // 전달수량
    //       , 'deliveryQuantity': deliveryList.value[i]["deliveryQuantity"]
    //       // 미출고
    //       , 'unreleased': deliveryList.value[i]["deliveryUnrelease"]
    //       // PK용 orderItemNo
    //       , 'orderItemNo': deliveryList.value[i]["orderItemNo"]
    //     });
    //   }
    // }
    const totalCount = filteredItems.length;
    // if (param.sort) {
    //   filteredItems = _.sortBy(filteredItems, param.sort);
    //   if (['desc', 'DESC'].includes(param.direction)) {
    //     filteredItems = filteredItems.reverse();
    //   }
    // }
    // if (param.pageNo) {
    //   filteredItems = filteredItems.splice((param.pageNo - 1) * param.pageSize ?? 10, param.pageSize ?? 10);
    // }

    return Promise.resolve({
      data: filteredItems,
      status: 200,
      code: 'OK',
      message: 'Success',
      totalCount,
    });
  };
  async function read(query, pageNo, pageSize) {
    let label = '';
    let items = [];
    if(showReceipt.value === true) {
      // label = 'receipt';
      // getReceiptList() 호출
      items = receiptList.value;
    } else {
      // label = 'delivery';
      // getDeliveryList();
      items = deliveryList.value;
    }
    const result = await retrieve({
      ...query
      , pageNo
      , pageSize
      // label: label
      , items: items
    });
    console.log('@@ result', result);
    // initialize();
    return result;
  }

  // '수령'탭에 바인딩할 데이터를 불러옴.
  // employeeId에는 필터에서 선택된 담당자의 id가 들어감.
  // 로드시에 필터에는 담당자 정보를 이름순으로 정렬한 첫번째 값이 선택된 상태.
  const getReceiptList = async () => {
    const result = await combineShippingApi.getReceiptList(toDo.value, '', Array.from(dateList.value))
        // .then((result) => {
        //   if(result.receiptList != null) {
        //     receiptList.value = result.receiptList;
        //     // read();
        //     // 반드시 통신 메소드(정확히는 read()메소드) 다음 순서로 실행해야 함!!
        //     // receiptKey.value++; // 자동으로 read() 실행? 그러면 :read에 getReceiptList(), getDeliveryList()를 할당하면 되나?
        //   } else {
        //     receiptList.value = [];
        //     // read();
        //     // 반드시 통신 메소드(정확히는 read()메소드) 다음 순서로 실행해야 함!!
        //     // receiptKey.value++;
        //   }
        //   // getVendorList(toDo.value, dateList.values);


        // });
    console.log('@@ resulttt : ', result);
    receiptList.value = result.receiptList;
    const result2 = await retrieve({
      // ...query
      pageNo: 1
      , pageSize: 10
      , items: result
      // , items: result.receiptList
      // , items: receiptList.value
    });
  // receiptKey.value++;
    console.log('@@ result2 : ', result2);


    // return {
    //   data: result.receiptList,
    //   status: 200,
    //   code: 'OK',
    //   message: 'Success',
    //   totalCount: result.receiptList.length,
    // };

    return result2;
    // return result;
  };
  // getReceiptList();

  // 수령 Update.
  console.log('before updateReceiptList');
  const updateReceiptList = async () => {
    const result = await combineShippingApi.updateReceiptList(Array.from(receiptedList.value))
      .then((result) => {
        console.log('updateReceiptList - result : ' + result);
        checkedReceiptCount.value = 0;
        // 수령 update한 결과를 보여주기.
        getReceiptList();
      });
    // return result;
  };

  // '전달' 탭에서 바인딩할 데이터를 불러옴.
  // const getDeliveryList = async (toDo=1, employeeId='', dateList=[]) => {
  async function getDeliveryList() {
    const result = await combineShippingApi.getDeliveryList(toDo.value, selectedAssignee.value, Array.from(dateList.value))
        .then((result) => {
          if(result != null && result.deliveryList != null) {
            deliveryList.value = result.deliveryList;
            read();
            deliveryKey.value++;
          } else {
            deliveryList.value = [];
            read();
            deliveryKey.value++;
          }
          // getAssigneeList();
      });
    // return result;
  };

  // 전달된 항목 정보 update.
  // deliveredList.value.push(
  //   {
  //       "orderItemNo": 2,
  //       "orderCheckDate": null,
  //       "receiveCheck": true,
  //       "receiveUnrelease": 0,
  //       "deliveryUnrelease": 0,
  //       "deliverCheck": true,
  //       "employeeId": null,
  //       "releaseScheduleDate": null,
  //       "receiveDate": null,
  //       "releaseQuantity": 2,
  //       "deliveryQuantity": 2
  //   }
  // );
  // deliveredList.value.push(
  //   {
  //       "orderItemNo": 3,
  //       "orderCheckDate": null,
  //       "receiveCheck": true,
  //       "receiveUnrelease": 0,
  //       "deliveryUnrelease": 0,
  //       "deliverCheck": true,
  //       "employeeId": null,
  //       "releaseScheduleDate": null,
  //       "receiveDate": null,
  //       "releaseQuantity": 10,
  //       "deliveryQuantity": 10
  //   }
  // );

  const updateDeliveryList = async () => {
    const result = await combineShippingApi.updateDeliveryList(deliveredList.value)
      .then(() => {
        checkedDeliveryCount.value = 0;
        // 전달 update한 결과를 보여주기.
        getDeliveryList(toDo.value, '', dateList.value);
      });
    // return result;
  };
  //수령/전달 탭 전환 관리.
  watch(() => showReceipt.value
  , (newShowReceipt, oldShowReceipt) => {
    // 수령/전달 탭 변경시에 담당업체/담당자 목록 초기화.
    assigneeList.value = [];
    vendorList.value = [];

    // update용 count변수 초기화.
    checkedReceiptCount.value = 0;
    checkedDeliveryCount.value = 0;
    // update용 list 초기화.
    receiptedList.value = [];
    deliveredList.value = [];

    if(newShowReceipt === true) {
      getReceiptList();
      getVendorList();
    } else {
      getDeliveryList();
      getAssigneeList();
    }
  });
  // 할일/한일 초기화 관리.
  watch(() => toDo.value
  , (newToDo, oldToDo) => {
    // update용 count변수 초기화.
    checkedReceiptCount.value = 0;
    checkedDeliveryCount.value = 0;
    // update용 list 초기화.
    receiptedList.value = [];
    deliveredList.value = [];

    if(showReceipt.value === true) {
      getReceiptList();
      getVendorList();
      // 담당업체 조회.
    } else {
      getDeliveryList();
      getAssigneeList();
    }
  });
  // 조회 감시.
  watch(() => clickSearch.value
  , (newClickSearch, oldClickSearch) => {
    // update용 count변수 초기화.
    checkedReceiptCount.value = 0;
    checkedDeliveryCount.value = 0;

    if(showReceipt.value === true) {
      // read();
    // receiptKey++;
      // getReceiptList();
      getVendorList();
    } else {
      getDeliveryList();
      getAssigneeList();
    }
    clickSearch.value = false;
  });
  // function updateVendor(vendor) {
  //   // vendorKey.value++;
  //   console.log('## vendor : ', vendor);
  //   selectedVendor.value = vendor;
  //   console.log('## selectedVendor.value : ', selectedVendor.value);
  //   vendorKey.value++;
  // }

  // selectedVendor
  watch(() => selectedVendor.value
    , (newSelectedVendor, oldSelectedVendor) => {
      console.log('## selectedVendor.value : ', selectedVendor.value);
      console.log('## newSelectedVendor : ', newSelectedVendor);
    }
  );
  // selectedAssignee
  watch(() => selectedAssignee.value
    , (newSelectedAssignee, oldSelectedAssignee) => {
      console.log('## selectedAssignee.value : ', selectedAssignee.value);
      console.log('## newSelectedAssignee : ', newSelectedAssignee);
    }
  );

  // watch(
  //   () => [selectedEmployeeId, showReceipt, toDo, clickSearch]
  //   , (newGroup, oldGroup) => {
  //     console.log('selectedEmployeeId.value : ' + selectedEmployeeId.value);
  //     console.log('showReceipt.value : ' + showReceipt.value);
  //     console.log('newGroup.length : ' + newGroup.length);
  //     console.log('toDo.value : ' + toDo.value);
  //     console.log('clickSearch.value : ' + clickSearch.value);
  //   }
  //   , {deep: true}
  // );

  // watch([selectedEmployeeId, showReceipt, toDo, clickSearch]
  //   , ([newSelectedEmployeeId, newShowReceipt, newTodo, newClickSearch]
  //   , [oldSelectedEmployeeId, oldShowReceipt, oldTodo, oldClickSearch]) => {
  //     console.log('watch');
  //     console.log('showReceipt.value : ' + showReceipt.value);
  //     console.log('toDo.value : ' + toDo.value);
  //     console.log('selectedEmployeeId.value : ' + selectedEmployeeId.value);
  //     console.log('dateList.value : ' + dateList.value);
  //     if(showReceipt.value === true) {
  //       getReceiptList(toDo.value, selectedEmployeeId.value, dateList.value);
  //       receiptKey.value++;
  //     }
  //     if(showReceipt.value === false) {
  //       getDeliveryList(toDo.value, selectedEmployeeId.value, dateList.value);
  //       receiptKey.value++;
  //     }
  //   }
  //   // , {deep:true}
  // );

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

  // console.log('items', items);

  const state = reactive({
    visibleRowsCount: 20,
  });

  const initialize = (s) => {};

  let globalIndex = 0;

  const start = (e) => {
    // const index = parseInt(Math.random() * 100) % countries.length;
    if(showReceipt.value === true) {
      const item = 
        e.dataTransfer.setData(DragDataItemFormat, JSON.stringify(receiptList.value));
    } else {
      const item = 
        e.dataTransfer.setData(DragDataItemFormat, JSON.stringify(deliveryList.value));
    }
  };

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
    console.log('event - startDate.value : ' + startDate.value);
    console.log('event : ' + event);
    // console.log('event.target : ' + event.target);
    // console.log('event.target.value' + event.target.value);
    console.log('event - startDate.value : ' + startDate.value);
    // 할당해주지 않으면 바인딩 객체의 값이 바뀌진 않음.
    startDate.value = event;
    dateList.value[0] = startDate.value;
  }
  function updateEndDate(event) {
    endDate.value = event;
    dateList.value[1] = endDate.value;
  }

  function handleClickSearch() {
    clickSearch.value = true;
  }

  // 수령여부 체크 버튼 클릭시.
  function checkReceiptCheckBtn(event, orderItemNo) {
    console.log('## event.target.parentElement: ', event.target.parentElement);
    console.log('## event.target.parentNode.parentNode.parentNode.parentNode: ', event.target.parentNode.parentNode.parentNode.parentNode);
    console.log('## event.target.parentNode.parentNode.parentNode.parentNode.firstChild: ', event.target.parentNode.parentNode.parentNode.parentNode.firstChild);
    console.log('## event.target.parentNode.parentNode.parentNode.parentNode.querySelector("input"): ', event.target.parentNode.parentNode.parentNode.parentNode.querySelector("input"));
    console.log('## event.target.parentNode.parentNode.parentNode.parentNode.querySelector("input").value: ', event.target.parentNode.parentNode.parentNode.parentNode.querySelector("input").value);
    let targetRow = event.target.parentNode.parentNode.parentNode.parentNode;
    let unreleaedTarget = targetRow.querySelector("input");
    let targetObject = {
      orderItemNo: orderItemNo
      , receiveUnrelease: unreleaedTarget.value
    };
    // 수령여부 체크해제.
    if(event.target.classList.contains('active')) {
      // 수령여부 체크된 개수 감소.
      checkedReceiptCount.value--;
      // 수령객체에서 체크 해제된 객체 삭제.
      receiptedList.value.pop(targetObject);
    // 수령여부 체크.
    } else {
      // 수령여부 체크된 개수 증가.
      checkedReceiptCount.value++;
      // 수령객체에 update할 객체 추가.
      receiptedList.value.push(targetObject);
    }
    // 활성화 클래스 toggle.
    event.target.classList.toggle('active');
    console.log('## receiptedList.value : ', receiptedList.value);
  }
  // 전달여부 체크 버튼 클릭시.
  function handleDeliveryCheckBtn(event, orderItemNo) {
    console.log('handleDeliveryCheckBtn');
    console.log('handleDeliveryCheckBtn - orderItemNo : ' + orderItemNo);
    console.log('handleDeliveryCheckBtn - event.target : ', event.target);
    console.log('handleDeliveryCheckBtn - event.target.classList : ', event.target.classList);
    if(event.target.classList.contains('active')) {
      // 전달여부 체크해제.
      checkedDeliveryCount.value--;
      // 전달객체에서 해당하는 객체 삭제.
      deliveredList.value.pop(orderItemNo);
    } else {
      // 전달여부 체크.
      checkedDeliveryCount.value++;
      // 전달객체에 객체 추가.
      deliveredList.value.push(orderItemNo);
    }
    console.log('handleDeliveryCheckBtn - deliveredList.value : ', deliveredList.value);
    console.log('handleDeliveryCheckBtn - checkedDeliveryCount.value : ', checkedDeliveryCount.value);
    // 활성화 클래스 toggle.
    event.target.classList.toggle('active');
  }

</script>

<style>

</style>