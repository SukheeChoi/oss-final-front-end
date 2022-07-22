<!-- 김예원 -->
<template>
  <div>
    <div class="row mb-4">
      <status-progress-bar
        :title="'주문'"
        :link="'Order'"
        :planNum="orderPlan"
        :resultNum="statusOrd"
        :leftoverNum="leftoverCnt"
        :unreleaseNum="unreleaseCnt"
        :percentNum="percentOrd"
      />

      <status-progress-bar :title="'피킹'" :planNum="statusOrd" :resultNum="statusPick" :percentNum="percentPick" />

      <status-progress-bar
        :title="'출고검수/패킹'"
        :link="'ReleaseInspection'"
        :planNum="statusPick"
        :resultNum="statusPack"
        :percentNum="percentPack"
      />

      <status-progress-bar
        :title="'출고'"
        :link="'Releases'"
        :planNum="statusPack"
        :resultNum="statusRls"
        :percentNum="percentRls"
      />

      <status-progress-bar
        :title="'택배사 인계'"
        :planNum="statusRls"
        :resultNum="statusTrf"
        :percentNum="percentTrf"
      />
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
              <img src="@/assets/images/icon/ico_list.svg"
                style="border: 0.8px solid gray; width: 20px; padding: 2px"
              />
            </button>
            <div class="explain">
              <h3>처리단계 범례</h3>
              <div><span class="ow-tag type-category"><i class="o">주</i></span>피킹지시 내려야할 건</div>
              <div><span class="ow-tag type-category"><i class="p">피</i></span>피킹해야할 건</div>
              <div><span class="ow-tag type-category"><i class="i">검</i></span>출고검수/패킹해야할 건</div>
              <div><span class="ow-tag type-category"><i class="r">출</i></span>출고(송장번호 생성)해야할 건</div>
              <div><span class="ow-tag type-category"><i class="t">인</i></span>택배사로 인계해야할 건</div>
              <br />
              <h3>주문번호 범례</h3>
              <div><span class="ow-tag type-category"><i class="u">미</i></span>주문품목 중 미출고품목이 존재하는 주문</div>
              <div><span class="ow-tag type-category"><i class="n">처</i></span>처리하지 않은 단계</div>
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
      <ow-n-grid
        :n="10"
        :visible-rows-count="state.visibleRowsCount"
        :initialized="initialize"
        :key="keyData"
        :read="read"
        :autoRowHeights="true"
      >
        <template #left>&nbsp;</template>
        <!-- formatitem-->
        <wj-flex-grid-column binding="client" header="거래처" width="*">
          <wj-flex-grid-cell-template cellType="Cell" let-cell="cell" v-slot="cell">
            <!-- 거래처명 앞 아이콘을 미출고 값에 따라 적용 -->
            <p v-if="cell.item.unrelease >= 1" class="ow-tag type-category">
              <i class="u">미</i>
            </p>
            <span
              :style="cell.item.unrelease ? 'color: rgb(210, 57, 46)' : ''"
              style="text-decoration: underline; cursor: pointer"
              @click="selectModal(cell)"
            >
              {{ cell.item.client }}
            </span>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
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
  <!-- 이동현 -->
<ow-modal type="XXXL" title="주문이력 보기" ref="childRef" :cancelButton="true">
      <div v-if="clientDetail">■ 거래처 정보
        <table>
          <tr>
            <td class="table-title" style="width: 7%">거래처 정보</td>
            <td style="width: 15%">{{clientDetail.clientName}}</td>
            <td class="table-title" style="width: 7%">대표자</td>
            <td style="width: 15%">{{clientDetail.representative}}</td>
            <td class="table-title" style="width: 7%">연락처</td>
            <td style="width: 15%">{{clientDetail.representativeContact}}</td>
            <td class="table-title" style="width: 7%">대표주소</td>
            <td style="width: 15%">{{clientDetail.clientAddress}}</td>
          </tr>
          <tr>
            <td class="table-title">담당지점</td>
            <td>{{clientDetail.branchName}}</td>
            <td class="table-title">영업사원</td>
            <td>{{clientDetail.employeeName}}</td>
            <td class="table-title">영업사원 연락처</td>
            <td>{{clientDetail.employeeContact}}</td>
            <td class="table-title">대표 배송지</td>
            <td>{{clientDetail.clientDestination}}</td>
          </tr>
          </table>
      </div>
      <div class="mt-5" v-if="selectedOrder">■ 진행 주문 정보
        <table>
          <tr>
            <th class="table-title" style="width: 7%">주문번호</th>
            <th class="table-title" style="width: 5%">배송구분</th>
            <th class="table-title" style="width: 7%">주문일시</th>
            <th class="table-title" style="width: 30%">품목명</th>
            <th class="table-title" style="width: 10%">품목코드</th>
            <th class="table-title" style="width: 15%">업체명</th>
            <th class="table-title" style="width: 5%">주문수량</th>
            <th class="table-title" style="width: 5%">피킹수량</th>
            <th class="table-title" style="width: 5%">검수/패킹</th>
            <th class="table-title" style="width: 10%">송장번호</th>
          </tr>
          <tr v-for="(order, index) in selectedOrder" :key="index"> 
            <td class="table-body-center" v-if="index === 0" :rowspan="selectedOrder.length">{{order.orderNo}}</td>
            <td class="table-body-center" v-if="index === 0" :rowspan="selectedOrder.length">{{order.orderShippingWay}}</td>
            <td class="table-body-center" v-if="index === 0" :rowspan="selectedOrder.length">{{order.orderDate}}</td>
            <td>{{order.itemName}}</td>
            <td>{{order.itemCode}}</td>
            <td>{{order.venderName}}</td>
            <td class="table-body-right">{{order.orderQuantity}}</td>
            <td class="table-body-right">{{order.pickingQuantity}}</td>
            <td class="table-body-center">{{order.inspectionPacking}}</td>
            <td class="table-body-center" v-if="index === 0" :rowspan="selectedOrder.length">{{order.invoiceCode}}</td>
          </tr>
          <tr>
            <th class="table-title">
              배송지
            </th>
            <td colspan="9" style="color:red;">
              {{selectedOrder[0].shippingAddress}}
            </td>
          </tr>
          </table>
      </div>
      <div class="d-flex mt-5" v-if="clientOrder">
        <div class="mr-5" style="width: 60%; height:200px; overflow:auto;">■ 주문 이력
          <table class="hoverTable">
            <tr>
              <th class="table-title" style="width: 15%">주문일자</th>
              <th class="table-title" style="width: 30%">품목명</th>
              <th class="table-title" style="width: 10%">수량</th>
              <th class="table-title" style="width: 15%">주문번호</th>
              <th class="table-title" style="width: 15%">주문방법</th>
              <th class="table-title" style="width: 15%">출고일</th>
            </tr>
            <div v-if="clientOrder.length === 0">주문 이력이 없습니다.</div>
            <tr v-for="(order, index) in clientOrder" :key="index" :id="order.orderNo" @click="getclientOrderDetail(order.orderNo)"> 
              <td class="table-body-center">{{order.orderDate}}</td>
              <td>{{order.itemName}}<span class="pl-0" v-if="order.itemCount">외 {{order.itemCount}} 건</span></td>
              <td class="table-body-right">{{order.itemQuantity}}</td>
              <td class="table-body-center">{{order.orderNo}}</td>
              <td class="table-body-center">{{order.orderWay}}</td>
              <td class="table-body-center">{{order.releaseDate}}</td>
            </tr>
          </table>
        </div>
        <div style="width: 40%; height:200px; overflow:auto;">■ 상세 내역
          <table>
            <tr>
              <th class="table-title" style="width: 60%">품목명</th>
              <th class="table-title" style="width: 30%">품목코드</th>
              <th class="table-title" style="width: 10%">수량</th>
            </tr>
            <tr v-for="(order, index) in clientOrderDetail" :key="index"> 
              <td>{{order.itemName}}</td>
              <td>{{order.itemCode}}</td>
              <td class="table-body-right">{{order.itemQuantity}}</td>
            </tr>
          </table>
        </div>
      </div>
    </ow-modal>
</template>

<script setup>
import OwNGrid from '@/components/grid/new/OwNGrid';
import StatusProgressBar from '@/app/edu/components/StatusProgressBar';
import clientModalApi from '@/api/clientModalApi';
import { reactive, ref, watch } from 'vue';
import clientApi from '@/api/customerReceipt';

const orderPlan = ref(300);
const leftoverCnt = ref(null);
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
  pageNo: 1,
  perPage: 200
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
    //new1.length가 2일 때 : 전체 선택
    if (new1.length == 2) {
      filterList.value.shippingCategory = ['긴급', '일반'];
    } else {
      filterList.value.shippingCategory = new1;
    }

    //new2 값이 -1일 때 : 전체 선택
    //new2 값이 2일 때 : 피킹, 피킹 지시
    if (new2 == '-1') {
      filterList.value.status = '-1';
    } else if (new2 == '2') {
      filterList.value.status = '2';
    } else {
      filterList.value.status = new2;
    }

    filterList.value.unrelease = new3;

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
  keyData.value++;
  getFilterList(filterList.value);
}

async function getFilterList(afterFilterList) {
  const result = await clientApi.getFilterList(afterFilterList).then((data) => {
    receiptList.value = [];
    //미출고 출력
    for (let i = 0; i < data.list2.length; i++) {
      receiptList.value.push({
        client: data['list2'][i]['client']['clientName'],
        level: data['list2'][i]['status'],
        unrelease: data['list2'][i]['orderItem']['unreleaseQuantity'],
        orderNo: data['list2'][i]['orderNo'],
        clientNo: data['list2'][i]['client']['clientNo'],
      });
    }
    //출고 출력
    for (let i = 0; i < data.list1.length; i++) {
      receiptList.value.push({
        client: data['list1'][i]['client']['clientName'],
        level: data['list1'][i]['status'],
        unrelease: data['list1'][i]['orderItem']['unreleaseQuantity'],
        orderNo: data['list1'][i]['orderNo'],
        clientNo: data['list1'][i]['client']['clientNo'],
      });
    }
  });
}

//초기화
const initialize = (s) => {
  //flexGrid 선택 모드 설정 => 선택 안되도록
  s.selectionMode = 0;

  //미출고일 때 cssClass 적용
  s.itemFormatter = (panel, r) => {
    //r번째 행 선언
    let row = panel.rows[r];
    //헤더가 아닌 경우
    if (row._idxData !== -1) {
      //미출고 값이 1 이상인 경우
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
  leftoverCnt.value = orderPlan.value - statusOrd.value;
  percentOrd.value = parseInt((statusOrd.value / orderPlan.value) * 100);
  percentPick.value = parseInt((statusPick.value / statusOrd.value) * 100);
  percentPack.value = parseInt((statusPack.value / statusPick.value) * 100);
  percentRls.value = parseInt((statusRls.value / statusPack.value) * 100);
  percentTrf.value = parseInt((statusTrf.value / statusRls.value) * 100);
}
getStsCnt();

// ----------------------------------------------------------------이동현----------------------------------------------------------------
const childRef = ref(null); //자식 컴포넌트인 owModal에 접근하여 엘리먼트를 저장하는 ref 객체

let clientDetail = ref(null); //거래처 정보가 저장되는 ref 객체
let selectedOrder = ref(null);  //선택된 주문 정보가 저장되는 ref 객체
let clientOrder = ref(null);    //주문 이력 정보가 저장되는 ref 객체
let clientOrderDetail = ref([{},{},{}]);  //주문 이력 상세 정보가 저장되는 ref 객체

/*
  작성자: 이동현
  기능: 모달화면을 띄우는 기능, 자식컴포넌트인 owModal의 open 메소드를 실행시킨다.
*/
const openModal = async function () {
  //모달 설정값 제공
  const config = {
    cancelButtonText: '확인',
  }

  const childRefData = await childRef.value.open("accept", config);

  //X나 확인 버튼을 눌렀을 경우에 Detail에 담긴 값을 초기화 시켜준다.
  if(childRefData.ok === false) {
    clientOrderDetail.value = [{},{},{}];
  }
};

/*
  작성자: 이동현
  기능: 모달에 띄워질 데이터(거래처 정보, 진행주문 정보, 주문이력)들을 가져오는 기능
  매개변수: clientNo(거래처 번호), orderNo(주문번호)
  리턴 값: data: {
    clientDetail: Object,
    clientOrder: Array,
    selectedOrder: Array,
  }
*/
const getModal = async function (clientNo, orderNo) {
  const modal = await clientModalApi.getModal(clientNo, orderNo);
  return modal;
};

/*
  작성자: 이동현
  기능: 주문이력에 맞는 세부정보를 가져오는 기능
  매개변수: orderNo(주문번호)
  리턴 값: data: {
    clientOrderDetail: Object,
  }
*/
const getModalDetail = async function (orderNo) {
  const modalDetail = await clientModalApi.getModalDetail(orderNo);
  return modalDetail;
};

/*
  작성자: 이동현
  기능: 화면에서 업체명을 클릭했을 경우, 모달에 띄워질 데이터를 가져오는 getModal()를 실행시키고, 모달을 띄우는 openModal()을 실행시키는 기능
  매개변수: cell => grid의 cell정보를 입력받는다.
*/
function selectModal(cell) {
 getModal(cell.item.clientNo, cell.item.orderNo).then((data) => {
        clientDetail.value = data.clientDetail;
        selectedOrder.value = data.selectedOrder;
        clientOrder.value = data.clientOrder;
        openModal();
      });
};

/*
  작성자: 이동현
  기능: 모달에서 주문이력을 클릭했을 경우, 해당 주문이력에 맞는 세부정보를 가져오는 getModalDetail()을 실행시키는 기능 
  매개변수: orderNo(주문번호)
*/
function getclientOrderDetail(orderNo) {
  const response = getModalDetail(orderNo).then((data) => {
    clientOrderDetail.value = data.clientOrderDetail;
  });
};

</script>

<style scoped lang="scss">
::v-deep {
  .ow-panel .ow-panel-header .ow-panel-title {
    justify-content: center;
    font-weight: 800;
  }

  .ow-flex-wrap .filter-checkbox-label,
  .filter-radio-label {
    margin-left: 5px;
    margin-right: 0;
  }

  .arrow_down {
    display: block; 
    transition: 0.5s ease; /* 속도 조절 */
  }

  .explain {
    position: absolute;
    display: none;
    z-index: 100;
    transition: 0.5s ease;
    background-color: white;
    padding: 1em;
    border: 1px solid black;
  }

  .arrow_down:hover + .explain {
    display: inline-block;
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

  .hoverTable tr:hover td {
    background-color: #d4ecff;
    cursor: pointer;
  }
}
</style>
