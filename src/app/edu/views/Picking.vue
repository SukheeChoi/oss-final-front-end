<template>
  <div class="ow-flex-wrap dir-col" style="--gap: 10px">
    <div class="ow-flex-wrap item-size-content">
        <!-- 수령/전달 -->
      <div class="item size-fix" style="margin-right: 6px;">
        <button class="ow-btn type-group" @click="handleChangeToReceipt" v-bind:class="{ active: showReceipt }"><span>수령</span></button>
        <button class="ow-btn type-group" @click="handleChangeToDelivery" v-bind:class="{ active: !showReceipt }"><span>전달</span></button>
      </div>
      <!-- 담당자 이름 filter -->
      <div class="item size-fix" style="--gap-item: 6px">
        <div class="ow-filter" style="width: 270px;">
          <OwFilterRadio>
            <button class="ow-filter-btn-move prev" :step="5" @click="move">&lt;</button>
              <ul class="ow-filter-list">
              <!-- <ul class="ow-filter-list assignee-list"> -->
                <template v-for="({ name, value, disabled = false }, index) in assigneeList" :key="value">
                  <li>
                    <input
                      type="radio"
                      :id="`${unique}-${index}`"
                      :name="unique"
                      :value="value"
                      :disabled="disabled"
                      v-model="checkedValue"
                    />
                    <label :for="`${unique}-${index}`" class="ow-filter-button">
                      {{ name }}
                    </label>
                  </li>
                </template>
              </ul>
            <button class="ow-filter-btn-move next" :step="5" @click="move">></button>
          </OwFilterRadio>
//////

        <!-- <div v-show="assigneeList != null" class="ow-filter" style="width: 270px;"> -->
          <button class="ow-filter-btn-move prev" :step="5" @click="move">&lt;</button>
          <ul class="ow-filter-list assignee-list">
            <template v-for="({ name, value, disabled = false }, index) in assigneeList" :key="value">
              <li>
                <input
                  type="radio"
                  :id="`${unique}-${index}`"
                  :name="unique"
                  :value="value"
                  :disabled="disabled"
                  v-model="checkedValue"
                />
                <label :for="`${unique}-${index}`" class="ow-filter-button">
                  {{ name }}
                </label>
              </li>
            </template>
            <!-- <li><input type="radio" id="btn-rd-2-1" name="btn-rd-group2" checked /><label class="ow-filter-button" for="btn-rd-2-1">이상욱</label></li>
            <li><input type="radio" id="btn-rd-2-2" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-2">박범희</label></li>
            <li><input type="radio" id="btn-rd-2-3" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-3">전규성</label></li>
            <li><input type="radio" id="btn-rd-2-4" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-4">소현우</label></li>
            <li><input type="radio" id="btn-rd-2-5" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-5">김수환</label></li>
            <li><input type="radio" id="btn-rd-2-6" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-6">이민기</label></li>
            <li><input type="radio" id="btn-rd-2-7" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-7">이동진</label></li>
            <li><input type="radio" id="btn-rd-2-8" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-8">김예원</label></li>
            <li><input type="radio" id="btn-rd-2-9" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-9">신현주</label></li>
            <li><input type="radio" id="btn-rd-2-10" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-10">이동현</label></li> -->
          </ul>
          <button class="ow-filter-btn-move next" :step="5" @click="move">></button>
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
            <!-- <wj-input-date id="theDate" :initialized="initDate" class="ow-calendar" @change="handleStartDate"></wj-input-date>
            <span style="margin: 4px;">~</span>
            <wj-input-date id="theDate" :initialized="initDate" class="ow-calendar" @change="handleEndDate"></wj-input-date> -->
          </div>
        </div>
        <div>
          <!-- 조회 -->
          <button class="ow-btn type-util" @click="handleClickSearch">조회</button>
          <!-- 품목전달(선택된 갯수) -->
          <button class="ow-btn type-util">품목전달(0)</button>  
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
    <wj-flex-grid-column header="No" binding="No" align="center" :width="40"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목명" binding="itemName" width="3*"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목코드" binding="itemCode" align="center" width="*" wordWrap="true"></wj-flex-grid-column>
    <wj-flex-grid-column v-if="toDo==1" header="출고수량" binding="releaseQuantity" :width="70"></wj-flex-grid-column>
    <wj-flex-grid-column v-if="toDo==0" header="수령수량" binding="receiptQuantity" :width="70"></wj-flex-grid-column>
    <wj-flex-grid-column header="미출고" binding="unreleased" :width="60"></wj-flex-grid-column>
    <wj-flex-grid-column header="수령여부" binding="receipted" align="center" :width="70" wordWrap="true">
      <wj-flex-grid-cell-template cellType="Cell">
        <button class="ow-btn type-icon check-state"></button>
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
    <wj-flex-grid-column header="No" binding="No" align="center" :width="40"></wj-flex-grid-column>
    <wj-flex-grid-column header="주문/출고번호" binding="order_release_no" align="center" width="2*"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목명" binding="itemName" width="3*"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목코드" binding="itemCode" align="center" width="*" wordWrap="true"></wj-flex-grid-column>
    <wj-flex-grid-column header="수량" binding="itemQuantity" :width="60"></wj-flex-grid-column>
    <wj-flex-grid-column header="미출고" binding="unreleased" :width="60"></wj-flex-grid-column>
    <wj-flex-grid-column header="전달여부" binding="delivered" align="center" :width="70" wordWrap="true">
      <wj-flex-grid-cell-template cellType="Cell">
        <button class="ow-btn type-icon check-state"></button>
        <!-- <button type="button" class="ow-btn type-flat ml-5" @click="lookup(cell.item.~)">선택</button> -->
      </wj-flex-grid-cell-template>
    </wj-flex-grid-column>
  </ow-n-grid>
  <!-- 킵,, -->
  <ow-n-grid
    v-if="false"
    :initialized="initialize"
    :n="2"
    :read="read"
    :insert="insert"
    :update="update"
    :remove="remove"
    :visible-rows-count="state.visibleRowsCount"
  >
    <template #left>&nbsp;</template>
    <!-- draggable -->
    <wj-flex-grid-column header="No" binding="No" align="center" :width="40"></wj-flex-grid-column>
    <wj-flex-grid-column header="주문/출고번호" binding="order_release_no" align="center" width="2*"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목명" binding="itemName" width="3*"></wj-flex-grid-column>
    <wj-flex-grid-column header="품목코드" binding="itemCode" align="center" width="*" wordWrap="true"></wj-flex-grid-column>
    <wj-flex-grid-column header="수량" binding="itemQuantity" :width="60"></wj-flex-grid-column>
    <wj-flex-grid-column header="미출고" binding="unreleased" :width="60"></wj-flex-grid-column>
    <wj-flex-grid-column header="전달여부" binding="delivered" align="center" :width="70" wordWrap="true">
      <wj-flex-grid-cell-template cellType="Cell">
        <button class="ow-btn type-icon check-state"></button>
        <!-- <button type="button" class="ow-btn type-flat ml-5" @click="lookup(cell.item.~)">선택</button> -->
      </wj-flex-grid-cell-template>
    </wj-flex-grid-column>
  </ow-n-grid>
  <!-- <div draggable="true" @dragstart="start">드래그 해보기</div> -->
</template>

<script setup>
  import combineShippingApi from '../../../api/combineShippingApi';
  import { ref, reactive, watch } from 'vue';
  import OwNGrid from '@/components/grid/new/OwNGrid';

  const receiptKey = ref(0);
  const deliveryKey = ref(0);
  const selectedEmployeeId = ref('');
  const showReceipt = ref(true);
  const toDo = ref(1);
  const startDate = ref(new Date());
  const endDate = ref(new Date());
  const clickSearch = ref(false);
  const vendorList = ref([]);
  const assigneeList = ref([
    {
      name: '김예원'
      , value: '1'
      , disabled: false
    }
    , {
      name: '최숙희'
      , value: '2'
      , disabled: false
    }
    , {
      name: '신현주'
      , value: '3'
      , disabled: false
    }
    , {
      name: '이동현'
      , value: '4'
      , disabled: false
    }
    , {
      name: '공희재'
      , value: '5'
      , disabled: false
    }
    , {
      name: '이정민'
      , value: '6'
      , disabled: false
    }
  ]);
  const dateList = ref([startDate.value, endDate.value]);
  const receiptList = ref([]);
  const deliveryList = ref([]);
  const deliveredList = ref([]);
  const receiptListForUpdate = ref([
    {
      orderItemNo: 1
      , receiveUnrelease: 0
    }
    , {
      orderItemNo: 2
      , receiveUnrelease: 0
    }
  ]);

  //수령 탭
  // 선택된 날짜 || 당일의 수령 대상 업체명 조회.
  const getVendorList = async (dateList) => {
    const result = await combineShippingApi.getVendorList(dateList)
        .then((result) => {
          console.log('getVendorList - JSON.stringify(result) : ' + JSON.stringify(result));
          vendorList.value = result.list;
          console.log('vendorList.value.length : ' + vendorList.value.length);
          // 담당 업체명
          console.log('vendorList.value[0].vendorNo : ' + vendorList.value[0].vendorNo);
          console.log('vendorList.value[0].vendorName : ' + vendorList.value[0].vendorName);
          console.log('vendorList.value[0]["vendorNo"] : ' + vendorList.value[0]['vendorNo']);
        });
    return result;
  };
  getVendorList(['2022-06-10', '2022-06-25']);


  // (수령예정) 기간으로 필터링한 수령 목록 조회.
  // const getReceiptListByDate = async () => {
  //   const result = await combineShippingApi.getReceiptListByDate(['2022-06-10', '2022-06-25']);
  //   return result;
  // };
  // getReceiptListByDate().then((result) => {
  //   console.log('getReceiptListByDate - JSON.stringify(result) : ' + JSON.stringify(result));
  //   receiptList.value = result.list;
  //   console.log('receiptList.value.length : ' + receiptList.value.length);
  // });

  //담당자 조회. 페이지네이션 고려X. 당일의 전달사항에 대한 모든 담당자를 표시할 것.
  const getAssigneeList = async () => {
    const result = await combineShippingApi.getAssigneeList()
        .then((result) => {
          if(result.list != null) {
            console.log('inside if');
            console.log('getAssigneeList - result : ' + result);
            console.log('getAssigneeList - JSON.stringify(result) : ' + JSON.stringify(result));
            assigneeList.value = result.list;
            console.log('assigneeList.value[0]["orderItem"] : ' + assigneeList.value[0]['orderItem']);
            console.log('assigneeList.value[0]["employeeName"] : ' + assigneeList.value[0]['employeeName']);
          }
        });
    // return result;
  };
  // getAssigneeList();

  const retrieve = (param) => {
    console.log('param', param);
    console.log('param.items.length : ' + param.items.length);
    console.log('param.label : ' + param.label);
    let items = _.cloneDeep(param.items);
    let filteredItems = [];

    if(param.label === 'receipt') {
      console.log('retrieve - receiptList.value[i]["releaseQuantity"] : ' + receiptList.value[0]["releaseQuantity"]);
      for(let i=0; i<items.length; i++) {
        filteredItems.push({
          'No': i+1  //pagination할 때 rowNum 함께 받아서 이용할 것.
          , 'itemName': receiptList.value[i]["item"]["itemName"]
          , 'itemCode': receiptList.value[i]["item"]["itemCode"]
          , 'releaseQuantity': receiptList.value[i]["releaseQuantity"]
          , 'receiptQuantity': receiptList.value[i]["receiptQuantity"]
          , 'unreleased': receiptList.value[i]["receiveUnrelease"]
          , 'receipted': receiptList.value[i]["receiveCheck"]
        });
      }
    } else {
      for(let i=0; i<items.length; i++) {
        //No는 행번호를 이용해서 생성할것.
        console.log('deliveryList.value[' + i + '] : ' + deliveryList.value[i]);
        //주문번호
        console.log('deliveryList.value[' + i + ']["orderItem"]["orderNo"] : ' + deliveryList.value[i]["orderItem"]["orderNo"]);
        //출고번호
        console.log('deliveryList.value[' + i + ']["release"]["releaseNo"] : ' + deliveryList.value[i]["release"]["releaseNo"]);
        //품목명
        console.log('deliveryList.value[' + i + ']["item"]["itemName"] : ' + deliveryList.value[i]["item"]["itemName"]);
        //품목코드
        console.log('deliveryList.value[' + i + ']["item"]["itemCode"] : ' + deliveryList.value[i]["item"]["itemCode"]);
        //수량
        console.log('deliveryList.value[' + i + ']["deliveryQuantity"] : ' + deliveryList.value[i]["deliveryQuantity"]);
        //미출고
        console.log('deliveryList.value[' + i + ']["deliveryUnrelease"] : ' + deliveryList.value[i]["deliveryUnrelease"]);
        //전달여부
        console.log('deliveryList.value[' + i + ']["deliverCheck"] : ' + deliveryList.value[i]["deliverCheck"]);
  
        filteredItems.push({
          'No': i+1
          , 'order_release_no': deliveryList.value[i]["orderItem"]["orderNo"] + '/' + deliveryList.value[i]["release"]["releaseNo"]
          , 'itemName': deliveryList.value[i]["item"]["itemName"]
          , 'itemCode': deliveryList.value[i]["item"]["itemCode"]
          , 'itemQuantity': deliveryList.value[i]["deliveryQuantity"]
          , 'unreleased': deliveryList.value[i]["deliveryUnrelease"]
        });
      }
    }
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
    let label = '';
    let items = [];
    if(showReceipt.value === true) {
      label = 'receipt';
      items = receiptList.value;
      console.log('inside read - receiptList.value.length : ' + receiptList.value.length);
    } else {
      label = 'delivery';
      items = deliveryList.value;
    }
    const result = await retrieve({
      ...query,
      pageNo,
      pageSize,
      label: label
      , items: items
    });
    console.log('result', result);
    // initialize();
    return result;
  }


  // '수령'탭에 바인딩할 데이터를 불러옴.
  // employeeId에는 필터에서 선택된 담당자의 id가 들어감.
  // 로드시에 필터에는 담당자 정보를 이름순으로 정렬한 첫번째 값이 선택된 상태.
  const getReceiptList = async (toDo=1, employeeId='', dateList=[]) => {
    const result = await combineShippingApi.getReceiptList(toDo, employeeId, Array.from(dateList))
        .then((result) => {
          if(result.receiptList != null) {
            console.log('result : ' + result);
            receiptList.value = result.receiptList;
            console.log('result.receiptList : ' + result.receiptList);
            console.log('result.receiptList[0] : ' + result.receiptList[0]);
            console.log('result.receiptList[0]["orderItemNo"] : ' + result.receiptList[0]['orderItemNo']);
            console.log('receiptList.value[0]// : ' + receiptList.value[0]);
            console.log('receiptList.value[0]["orderItemNo"]// : ' + receiptList.value[0]['orderItemNo']);
            console.log('JSON.stringify(receiptList.value[0]) : ' + JSON.stringify(receiptList.value[0]));
            read();
            // 반드시 통신 메소드(정확히는 read()메소드) 다음 순서로 실행해야 함!!
            receiptKey.value++;
          }
        });
    // return result;
  };
  getReceiptList();
  // getReceiptList('E2');

  // 수령 Update.
  console.log('before updateReceiptList');
  const updateReceiptList = async (receiptListForUpdate) => {
    const result = await combineShippingApi.updateReceiptList(Array.from(receiptListForUpdate.value))
      .then((result) => {
        console.log('updateReceiptList - result : ' + result);
      });
    // return result;
  };
  // receiptListForUpdate.value.length = 0;
  console.log('receiptListForUpdate.value.length : ' + receiptListForUpdate.value.length);
  console.log('receiptListForUpdate.value.length : ' + receiptListForUpdate.value.length);
  // updateReceiptList(receiptListForUpdate);

  // '전달' 탭에서 바인딩할 데이터를 불러옴.
  const getDeliveryList = async (toDo=1, employeeId='', dateList=[]) => {
    const result = await combineShippingApi.getDeliveryList(toDo, employeeId, Array.from(dateList))
        .then((result) => {
          if(result.deliveryList != null) {
            console.log('getDeliveryList - result : ' + result);
            console.log('result.deliveryList : ' + result.deliveryList);
            console.log('result.deliveryList[0] : ' + result.deliveryList[0]);
            console.log('result.deliveryList[0]["orderItemNo"] : ' + result.deliveryList[0]['orderItemNo']);
            deliveryList.value = result.deliveryList;
            console.log('deliveryList.value[0]// : ' + deliveryList.value[0]);
            console.log('deliveryList.value[0]["orderItemNo"]// : ' + deliveryList.value[0]['orderItemNo']);
            console.log('JSON.stringify(deliveryList.value[0]) : ' + JSON.stringify(deliveryList.value[0]));
            read();
            deliveryKey.value++;
          }
      });
  };
  // getDeliveryList();
  // getDeliveryList('E1', ['2022-06-10', '2022-06-25']);

  // 전달된 항목 정보 update.
  deliveredList.value.push(
    {
        "orderItemNo": 2,
        "orderCheckDate": null,
        "receiveCheck": true,
        "receiveUnrelease": 0,
        "deliveryUnrelease": 0,
        "deliverCheck": true,
        "employeeId": null,
        "releaseScheduleDate": null,
        "receiveDate": null,
        "releaseQuantity": 2,
        "deliveryQuantity": 2
    }
  );
  deliveredList.value.push(
    {
        "orderItemNo": 3,
        "orderCheckDate": null,
        "receiveCheck": true,
        "receiveUnrelease": 0,
        "deliveryUnrelease": 0,
        "deliverCheck": true,
        "employeeId": null,
        "releaseScheduleDate": null,
        "receiveDate": null,
        "releaseQuantity": 10,
        "deliveryQuantity": 10
    }
  );
  console.log('typeof(deliveredList) : ' + typeof(deliveredList));
  console.log('typeof(deliveredList.value) : ' + typeof(deliveredList.value));
  console.log('deliveredList.value : ' + deliveredList.value);
  console.log('deliveredList.value[0] : ' + deliveredList.value[0]);
  console.log('deliveredList.value[0]["orderItemNo"] : ' + deliveredList.value[0]["orderItemNo"]);

  const updateDeliveryList = async (deliveredList) => {
    const result = await combineShippingApi.updateDeliveryList(deliveredList);
    return result;
  };
  updateDeliveryList(deliveredList).then(result => {
    console.log('updateDeliveryList - result : ' + result);
  });
  
  // const items = [
  //   {No: 1, order_release_no: "2201042337/C_02_005", itemName: "122 Taper Drill", itemCode: "122TDD3506", itemQuantity: 1, unreleased: 0 }
  //   , {No: 2, order_release_no: "22010423828/C_02_001", itemName: "122 Taper Drill", itemCode: "122TDD3506", itemQuantity: 1, unreleased: 0 }
  //   , {No: 3, order_release_no: "2201042337/C_02_005", itemName: "Surgical Guide Template", itemCode: "OGTU02", itemQuantity: 1, unreleased: 0 }
  //   , {No: 4, order_release_no: "2201041332/C_02_004", itemName: "Surgical Guide Template", itemCode: "OGTU02", itemQuantity: 2, unreleased: 0 }
  //   , {No: 5, order_release_no: "2201043708/C_02_006", itemName: "SB Anchor", itemCode: "SBAC4030TSR", itemQuantity: 5, unreleased: 0 }
  //   , {No: 6, order_release_no: "2201043708/C_02_006", itemName: "Cover Cap", itemCode: "SBCC4000", itemQuantity: 2, unreleased: 0 }
  //   , {No: 7, order_release_no: "2201041015/C_02_002", itemName: "Cover Cap", itemCode: "SBCC4000", itemQuantity: 3, unreleased: 0 }
  //   , {No: 8, order_release_no: "2201043708/C_02_006", itemName: "SmartMembrane", itemCode: "SM2W10129SB", itemQuantity: 10, unreleased: 0 }
  //   , {No: 9, order_release_no: "2201042337/C_02_005", itemName: "Membrane LIFTER TUBE", itemCode: "SNMT", itemQuantity: 9, unreleased: 0 }
  //   , {No: 10, order_release_no: "2201042337/C_02_004", itemName: "Membrane LIFTER TUBE", itemCode: "SNMT", itemQuantity: 1, unreleased: 0 }
  //   , {No: 11, order_release_no: "2201044479/E_02_001", itemName: "Membrane LIFTER TUBE", itemCode: "SNMT", itemQuantity: 3, unreleased: 0 }
  //   , {No: 12, order_release_no: "2201043828/C_02_001", itemName: "Membrane LIFTER TUBE", itemCode: "SNMT", itemQuantity: 3, unreleased: 0 }
  //   , {No: 13, order_release_no: "2201041332/C_02_004", itemName: "SS III SA Fixture_NoMount", itemCode: "SS3R4010S18", itemQuantity: 1, unreleased: 0 }
  //   , {No: 14, order_release_no: "2201040991/C_02_003", itemName: "SS III SA Fixture_NoMount", itemCode: "SS3R4010S18", itemQuantity: 4, unreleased: 0 }
  //   , {No: 15, order_release_no: "2201043828/C_02_001", itemName: "SS III SA Fixture_NoMount", itemCode: "SS3R4010S18", itemQuantity: 3, unreleased: 0 }
  //   , {No: 16, order_release_no: "2201040991/C_02_002", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 5, unreleased: 0 }
  //   , {No: 17, order_release_no: "2201041015/C_02_002", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 1, unreleased: 0 }
  //   , {No: 18, order_release_no: "2201044479/E_02_001", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 10, unreleased: 0 }
  //   , {No: 19, order_release_no: "2201043828/C_02_001", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 5, unreleased: 0 }
  //   // 
  //   , {No: 20, order_release_no: "2201043828/C_02_001", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 5, unreleased: 0 }
  //   , {No: 21, order_release_no: "2201043828/C_02_001", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 5, unreleased: 0 }
  //   , {No: 22, order_release_no: "2201043828/C_02_001", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 5, unreleased: 0 }
  //   , {No: 23, order_release_no: "2201043828/C_02_001", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 5, unreleased: 0 }
  //   , {No: 24, order_release_no: "2201043828/C_02_001", itemName: "TS III Extra Short CA Fixture", itemCode: "TS3S4006C", itemQuantity: 5, unreleased: 0 }
  // ];

  watch(() => showReceipt.value
  , (newShowReceipt, oldShowReceipt) => {
    if(newShowReceipt === true) {
      getReceiptList();
      receiptKey.value++;
    } else {
      getDeliveryList();
      receiptKey.value++;
    }
  });
  watch(() => toDo.value
  , (newToDo, oldToDo) => {
    console.log('toDo watch');
    console.log('toDo watch - newToDo : ' + newToDo);
    if(showReceipt.value === true) {
      getReceiptList(newToDo, '', Array.from(dateList.value));
      receiptKey.value++;
    } else {
      getDeliveryList(newToDo, '', Array.from(dateList.value));
      receiptKey.value++;
    }
  });
  watch(() => clickSearch.value
  , (newClickSearch, oldClickSearch) => {
    console.log('clickSearch watch');
    console.log('clickSearch watch - newClickSearch : ' + newClickSearch);
    if(showReceipt.value === true) {
      getReceiptList(toDo.value, '', Array.from(dateList.value));
    } else {
      console.log('toDo.value : ' + toDo.value);
      console.log('dateList.value : ' + dateList.value);
      getDeliveryList(toDo.value, '', Array.from(dateList.value));
    }
    clickSearch.value = false;
  });

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
    // clickSearch.value = !clickSearch.value;
    clickSearch.value = true;
  }

</script>

<style>

</style>