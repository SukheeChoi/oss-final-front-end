<template>
  <div class="ow-flex-wrap dir-col" style="--gap: 10px">
    <div class="ow-flex-wrap item-size-content">
        <!-- 수령/전달 -->
      <div class="item size-fix" style="margin-right: 6px;">
        <button class="ow-btn type-group active" data-label="receipt" onclick="handleChangeReceiptOrDelivery"><span>수령</span></button>
        <button class="ow-btn type-group" data-label="delivery" onclick="handleChangeReceiptOrDelivery"><span>전달</span></button>
      </div>
      <!-- 담당자 이름 filter -->
      <div class="item size-fix" style="--gap-item: 6px">
        <div class="ow-filter" style="width: 270px;">
        <!-- <div v-show="assigneeList" class="ow-filter" style="width: 270px;"> -->
          <button class="ow-filter-btn-move prev">&lt;</button>
          <ul class="ow-filter-list assignee-list">
            <!-- <div v-for="(assignee, index) in assigneeList" :key="index">
              <li>
                <input type="radio" id="btn-rd-2-1" name="btn-rd-group2" checked/>
                <label class="ow-filter-button" for="btn-rd-2-1">{{assignee.employeeName}}</label>
                <label class="ow-filter-button" for="btn-rd-2-1" :data-id="assignee.employeeId">{{assignee.employeeName}}</label>
              </li>
            </div> -->
            <li><input type="radio" id="btn-rd-2-1" name="btn-rd-group2" checked /><label class="ow-filter-button" for="btn-rd-2-1">이상욱</label></li>
            <li><input type="radio" id="btn-rd-2-2" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-2">박범희</label></li>
            <li><input type="radio" id="btn-rd-2-3" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-3">전규성</label></li>
            <li><input type="radio" id="btn-rd-2-4" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-4">소현우</label></li>
            <li><input type="radio" id="btn-rd-2-5" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-5">김수환</label></li>
            <li><input type="radio" id="btn-rd-2-6" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-6">이민기</label></li>
            <li><input type="radio" id="btn-rd-2-7" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-7">이동진</label></li>
            <li><input type="radio" id="btn-rd-2-8" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-8">김예원</label></li>
            <li><input type="radio" id="btn-rd-2-9" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-9">신현주</label></li>
            <li><input type="radio" id="btn-rd-2-10" name="btn-rd-group2" /><label class="ow-filter-button" for="btn-rd-2-10">이동현</label></li>
          </ul>
          <button class="ow-filter-btn-move next">></button>
        </div>
      </div>
      <div class="item align-to-right" style="gap: 6px;">
        <!-- 할일/한일 -->
        <div>
          <button class="ow-btn type-group active"><span>할일</span></button>
          <button class="ow-btn type-group"><span>한일</span></button>
        </div>
        <!-- 날짜 선택 -->
        <div>
          <div class="ow-input">
            <wj-input-date id="theDate" :initialized="initDate" class="ow-calendar" @change="handleStartDate"></wj-input-date>
            <span style="margin: 4px;">~</span>
            <wj-input-date id="theDate" :initialized="initDate" class="ow-calendar" @change="handleEndDate"></wj-input-date>
          </div>
        </div>
        <div>
          <!-- 조회 -->
          <button class="ow-btn type-util">조회</button>
          <!-- 품목전달(선택된 갯수) -->
          <button class="ow-btn type-util">품목전달(0)</button>  
        </div>
      </div>

      </div>
  </div>

  <!-- ngrid -->
  <!-- '전달'탭이 선택된 경우. -->
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
    v-if="true"
    :initialized="initialize"
    :n="2"
    :read="read"
    :insert="insert"
    :update="update"
    :remove="remove"
    :visible-rows-count="state.visibleRowsCount"
  >
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

<script>
import combineShippingApi from '../../../api/combineShippingApi';
import { ref, reactive, beforeCreate, onMouted } from 'vue';
import OwNGrid from '@/components/grid/new/OwNGrid';
export default {
  name: 'TheOwNewGrid',
  components: {
    OwNGrid,
  },
  setup() {
    const vendorList = ref([]);
    const assigneeList = ref([]);
    const receiptList = ref([]);
    const deliveryList = ref([]);
    const deliveredList = ref([]);

    //수령 탭
    // 선택된 날짜 || 당일의 수령 대상 업체명 조회.
    const getVendorList = async () => {
      const result = await combineShippingApi.getVendorList(['2022-06-10', '2022-06-25']);
      return result;
    };
    getVendorList().then((result) => {
      console.log('getVendorList - JSON.stringify(result) : ' + JSON.stringify(result));
      vendorList.value = result.list;
      console.log('vendorList.value.length : ' + vendorList.value.length);
      // 담당 업체명
      console.log('vendorList.value[0].vendorNo : ' + vendorList.value[0].vendorNo);
      console.log('vendorList.value[0].vendorName : ' + vendorList.value[0].vendorName);
      console.log('vendorList.value[0]["vendorNo"] : ' + vendorList.value[0]['vendorNo']);
    });


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
      const result = await combineShippingApi.getAssigneeList();
      return result;
    };
    // axios.all([getAssigneeList()]).then((result) => {
    //   console.log('getAssigneeList - result : ' + result);
    //   console.log('getAssigneeList - JSON.stringify(result) : ' + JSON.stringify(result));
    //   assigneeList.value = result.list;
    //   console.log('assigneeList.value[0]["employeeId"] : ' + assigneeList.value[0]['employeeId']);
    //   console.log('assigneeList.value[0]["employeeName"] : ' + assigneeList.value[0]['employeeName']);
    // });

    getAssigneeList().then((result) => {
      console.log('getAssigneeList - result : ' + result);
      console.log('getAssigneeList - JSON.stringify(result) : ' + JSON.stringify(result));
      assigneeList.value = result.list;
      console.log('assigneeList.value[0]["orderItem"] : ' + assigneeList.value[0]['orderItem']);
      console.log('assigneeList.value[0]["employeeName"] : ' + assigneeList.value[0]['employeeName']);
    });

    // '수령'탭에 바인딩할 데이터를 불러옴.
    // employeeId에는 필터에서 선택된 담당자의 id가 들어감.
    // 로드시에 필터에는 담당자 정보를 이름순으로 정렬한 첫번째 값이 선택된 상태.
    const getReceiptList = async (employeeId, dateList=[]) => {
      const result = await combineShippingApi.getReceiptList(employeeId, Array.from(dateList));
    console.log('dsfksugfhnm,dlk' + result);
      return result;
    };
    getReceiptList('E2').then(result => {
      console.log('result : ' + result);
      receiptList.value = result.receiptList;
      console.log('result.receiptList : ' + result.receiptList);
      console.log('result.receiptList[0] : ' + result.receiptList[0]);
      console.log('result.receiptList[0]["orderItemNo"] : ' + result.receiptList[0]['orderItemNo']);
      console.log('receiptList.value[0]// : ' + receiptList.value[0]);
      console.log('receiptList.value[0]["orderItemNo"]// : ' + receiptList.value[0]['orderItemNo']);
      console.log('JSON.stringify(receiptList.value[0]) : ' + JSON.stringify(receiptList.value[0]));
    });

    // '전달' 탭에서 바인딩할 데이터를 불러옴.
    const getDeliveryList = async (employeeId, dateList=[]) => {
      const result = await combineShippingApi.getDeliveryList(employeeId, Array.from(dateList));
      return result;
    };
    getDeliveryList('E1', ['2022-06-10', '2022-06-25']).then(result => {
      console.log('getDeliveryList - result : ' + result);
      console.log('result.deliveryList : ' + result.deliveryList);
      console.log('result.deliveryList[0] : ' + result.deliveryList[0]);
      console.log('result.deliveryList[0]["orderItemNo"] : ' + result.deliveryList[0]['orderItemNo']);
      deliveryList.value = result.deliveryList;
      console.log('deliveryList.value[0]// : ' + deliveryList.value[0]);
      console.log('deliveryList.value[0]["orderItemNo"]// : ' + deliveryList.value[0]['orderItemNo']);
      console.log('JSON.stringify(deliveryList.value[0]) : ' + JSON.stringify(deliveryList.value[0]));
    });

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

    const retrieve = (param) => {
      console.log('param', param);
      // let filteredItems = _.cloneDeep(items);
      
      //
      let filteredItems = _.cloneDeep(deliveryList);
      console.log('deliveryList.value.length : ' + deliveryList.value.length);
      let filteredDeliveryList = [];
      for(let i=0; i<deliveryList.value.length; i++) {
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

        filteredDeliveryList.push({
          'No': i+1
          , 'order_release_no': deliveryList.value[i]["orderItem"]["orderNo"] + '/' + deliveryList.value[i]["release"]["releaseNo"]
          , 'itemName': deliveryList.value[i]["item"]["itemName"]
          , 'itemCode': deliveryList.value[i]["item"]["itemCode"]
          , 'itemQuantity': deliveryList.value[i]["deliveryQuantity"]
          , 'unreleased': deliveryList.value[i]["deliveryUnrelease"]
        });
      }
      //

      // const totalCount = filteredItems.length;
      const totalCount = filteredDeliveryList.length;
      if (param.sort) {
        filteredDeliveryList = _.sortBy(filteredDeliveryList, param.sort);
        // filteredItems = _.sortBy(filteredItems, param.sort);
        if (['desc', 'DESC'].includes(param.direction)) {
          filteredDeliveryList = filteredDeliveryList.reverse();
          // filteredItems = filteredItems.reverse();
        }
      }
      if (param.pageNo) {
        filteredDeliveryList = filteredDeliveryList.splice((param.pageNo - 1) * param.pageSize ?? 10, param.pageSize ?? 10);
        // filteredItems = filteredItems.splice((param.pageNo - 1) * param.pageSize ?? 10, param.pageSize ?? 10);
      }

      return Promise.resolve({
        data: filteredDeliveryList,
        // data: filteredItems,
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
      console.log('result', result);
      return result;
    }

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
      const item = 
        e.dataTransfer.setData(DragDataItemFormat, JSON.stringify(deliveryList));
        // e.dataTransfer.setData(DragDataItemFormat, JSON.stringify(item));
    };

    function handleChangeReceiptOrDelivery(event) {
      console.log('^^^^^^^^%%%%%%%%%%%%%');
      console.log('event.target : ' + event.target);
    }

    function handleStartDate() {
      console.log('~~~~~~~~~~~~`');
    }

    return {
      initialize,
      read,
      insert,
      update,
      remove,
      state,
      start,
    };
  },
};

</script>

<style>

</style>