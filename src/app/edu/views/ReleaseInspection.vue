<template>
  <div class="ow-flex-wrap dir-col" style="--gap: 10px">
    <div class="item">
      <div class="ow-flex-wrap">
        <div class="item size-fix" style="--gap-item: 6px">
          <div class="title-field">현황</div>
        </div>
        <div class="item">
          <div class="state">
            <div class="state-item">주문건 : <strong>{{statusBar.total}}</strong>건</div>
            <div class="state-item">
              피킹완료건 : <strong>{{statusBar.totalPickingQty}}</strong>건 (긴급 <strong class="color-type-2">{{statusBar.emergencyPickingQty}}</strong>건/일반
              <strong>{{statusBar.commonPickingQty}}</strong>건)
            </div>
            <div class="state-item">
              출고검수/패킹건 : {{statusBar.totalRlsQty}}건 (긴급 <strong class="color-type-2">{{statusBar.emergencyRlsQty}}</strong>건/일반 <strong>{{statusBar.commonRlsQty}}</strong>건)
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <dl class="checkbox-title-wrap">
    <dt>배송 구분</dt>
    <dd>
      <ow-filter-checkbox name="checkboxGp5" v-bind:items="checkboxGroup5" v-model="emptyGroup"></ow-filter-checkbox>
    </dd>
  </dl>

  <!-- 본문 시작, ow-flex 사용 -->
  <div class="ow-flex-wrap">
    <!-- 그리드 영역 -->
    <div class="item ow-flex-wrap dir-col" style="--size: 80%">
      <div class="container-fluid">
        <div class="ow-grid-wrap">
          <ow-grid-2
            headersVisibility="Column"
            :read="releaseInspectionData"
            :allowMerging="'Cells'"
            :initialized="onInitialized"
            :autoRowHeights="true"
            :autoGenerateColumns="false"
            :selectionChanged="SelectionChanged"
            :key = "keyData"
            :page="page"         
          >
            <!-- :autoRowHeights="true" -->
            <template #left>&nbsp;</template>
            <wj-flex-grid-column :binding="'no'" :header="'No'" :allowMerging="true" :width="40" align="center" />
            <wj-flex-grid-column
              :binding="'clientName'"
              :header="'거래처'"
              :allowMerging="true"
              :width="90"
              align="center"
            />
            <wj-flex-grid-column
              :binding="'category'"
              :header="'배송구분'"
              :allowMerging="true"
              :width="65"
              align="center"
            />
            <wj-flex-grid-column
              :binding="'releaseCode'"
              :header="'출고번호'"
              :allowMerging="true"
              :width="90"
              align="center"
            />
            <wj-flex-grid-column
              :binding="'shippingDestination'"
              :header="'배송지'"
              :allowMerging="true"
              :width="100"
              align="center"
            />
            <wj-flex-grid-column
              :binding="'orderNo'"
              :header="'주문번호'"
              :allowMerging="true"
              :width="100"
              align="center"
            />
            <wj-flex-grid-column
              :binding="'vendorName'"
              :header="'업체명'"
              :width="70"
              align="center"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'itemName'"
              :header="'품목명'"
              :width="130"
              align="center"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'code'"
              :header="'품목코드'"
              :width="130"
              align="center"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'pickingQty'"
              :header="'피킹수량'"
              :width="65"
              align="center"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'releaseInspectionQuantity'"
              :header="'검수수량'"
              :width="65"
              align="center"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'employeeName'"
              :header="'피킹담당자'"
              :width="80"
              align="center"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'releasePrintDate'"
              :header="'출고요청서<br/>인쇄'"
              :allowMerging="true"
              :width="75"
              align="center"
              :multiline="true"
            >
              <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                <button id="receipt-check-btn" class="ow-btn type-state" @click="releasePrintBtn($event, cell.item)">인쇄</button>
              </wj-flex-grid-cell-template>            
            </wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'releaseBoxQty'"
              :header="'출고Box<br/>수량'"
              :allowMerging="true"
              :width="70"
              align="center"
              :wordWrap="true"
              :multiline="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'done'"
              :header="'출고검수'"
              :allowMerging="true"
              :width="65"
              align="center"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'receiptePrintDate'"
              :header="'거래명세서<br/>인쇄'"
              :allowMerging="true"
              :width="75"
              align="center"
              :multiline="true"
            >
              <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                <button id="receipt-check-btn" class="ow-btn type-state" @click="receiptPrintBtn($event, cell.item)">인쇄</button>
              </wj-flex-grid-cell-template>
            </wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'note'"
              :header="'비고'"
              :width="70"
              align="center"
              :allowMerging="true"
            ></wj-flex-grid-column>
          </ow-grid-2>
        </div>
      </div>
    </div>

    <!-- 검수스캔 영역 -->
    <div class="item align-items-start">
      <div class="ow-flex-wrap dir-col">
        <!-- 바코드 스캔(윗부분) -->
        <div class="item size-fix ow-flex-wrap dir-col">
          <div class="ow-flex-wrap">
            <div class="item size-fix" style="--gap-item: 6px">
              <div class="title-field">거래처명</div>
            </div>
            <div class="item">
              <div class="state">
                <div class="state-item w-100">{{ tally.clientName }}</div>
                <div class="state-item ow-select">
                  <select v-model="tally.category">
                    <option>긴급</option>
                    <option>일반</option>
                    <span>Selected: {{ tally.category }}</span>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item size-fix" style="--gap-item: 6px">
              <div class="title-field">총검수수량</div>
            </div>
            <div class="item">
              <div class="state">
                <div class="state-item">
                  <div class="w-100">*총피킹수량</div>
                  <div class="ow-input mr-1" style="--width: 70px">
                    <input type="text" v-model="tally.totalPickingQty" />
                  </div>
                </div>
                <div class="state-item">
                  <div class="w-100">*총검수수량</div>
                  <div class="ow-input mr-1" style="--width: 70px">
                    <input type="text" v-model="tally.totalInspectionQty" />
                  </div>
                </div>
                <div class="state-item">
                  <div class="w-100">*총미출고수량</div>
                  <div class="ow-input mr-1" style="--width: 70px">
                    <input type="text" v-model="tally.totalUnRelease" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table class="ow-table-type-info">
            <colgroup>
              <col style="width: 65px" />
              <col style="width: 130px" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">출고번호스캔</th>
                <td>
                  <div class="ow-input">
                    <input type="text" v-model="tally.releaseCode" />
                    <button class="ow-btn type-state ml-3" v-on:click="scan(tally.releaseCode, 'releaseCode')">조회</button>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">바코드스캔</th>
                <td>
                  <div class="ow-input">
                    <input type="text" v-model="tally.barCode"/>
                    <button class="ow-btn type-state ml-3" v-on:click="scan(tally.barCode, 'barCode')">조회</button>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">주문번호</th>
                <td>{{ tally.orderNo }}</td>
              </tr>
            </tbody>
          </table>
          <div class="container">
            <button class="ow-btn type-util float-right ml-2" style="float: right" v-on:click="unrelease(tally.releaseCode, tally.barCode)">
              미출고처리
            </button>
            <button class="ow-btn type-util float-right" style="float: right" v-on:click="inspection(tally.releaseCode, tally.barCode)">
              검수처리
            </button>
          </div>
        </div>

        <!-- 박스별 품목정보 -->
        <div class="item align-y-start">
          <div class="ow-flex-wrap">
            <div class="title-field">박스별품목정보</div>
            <button class="ow-btn type-state" v-on:click="addBox()" v-if="orderStatus == false">박스추가+</button>
          </div>
        </div>
        <div>
          <ow-tab v-bind:items="boxArrays" v-model="index"></ow-tab>
          <div class="ow-grid-wrap">
            <wj-flex-grid headersVisibility="Column" class="ow-grid" :items-source="boxItemData" :key = "boxKey">
              <wj-flex-grid-column-group class="wj-align-left" :header="'*박스'+`${index+1}`+' 품목정보'" style="border-bottom: none; text-align: left; justify-content: flex-start;">
                <wj-flex-grid-column-group :binding="'no'" header="No" :width="40" />
                <wj-flex-grid-column-group :binding="'itemName'" header="품목명" :width="100" />
                <wj-flex-grid-column-group :binding="'code'" header="품목코드" :width="100" />
                <wj-flex-grid-column-group :binding="'orderItemQuantity'" header="주문수량" :width="63" />
                <wj-flex-grid-column-group :binding="'pickingQty'" header="피킹수량" :width="63" />
                <wj-flex-grid-column-group :binding="'releaseInspectionQuantity'" header="검수수량" :width="63">
                  <!-- <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                    <div class="ow-input">
                      <input id="releaseInspectionQtyInput" type="text" v-model='cell.item.releaseInspectionQuantity'/>
                    </div>
                  </wj-flex-grid-cell-template>     -->
                </wj-flex-grid-column-group>
                <wj-flex-grid-column-group :binding="'boxItemQuantity'" header="물품수량" :width="63" >
                  <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                    <div class="ow-input">
                      <input id="boxItemQtyInput" type="text" v-model='cell.item.boxItemQuantity'/>
                    </div>
                  </wj-flex-grid-cell-template>
                </wj-flex-grid-column-group>
              </wj-flex-grid-column-group>
            </wj-flex-grid>
          </div>
          <div class="container">
            <button class="ow-btn type-util float-right ml-2" style="float: right" v-on:click="packingDone()" v-if="(boxArrays.length > 0 && orderStatus==false)">
              패킹최종완료
            </button>
            <button class="ow-btn type-util float-right ml-2" style="float: right" v-on:click="oneBoxPacking(index)" v-if="(boxArrays.length > 0 && orderStatus==false)">
              박스{{index+1}} 패킹완료
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ow-modal type="XS" :title="'박스'+`${index+1}`+' 패킹실패'" ref="modalRef" :cancelButton="true" style="font-size: 130%;" >
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100px; max-height: calc(100vh - 36px - 62px) !important;">
      <span>박스{{index+1}}의 물품의 수량을 확인해 주세요!</span>
    </div>
  </ow-modal>

  <ow-modal type="XS" title="출고요청서 인쇄"  ref="releasePrintRef" :cancelButton="true" style="font-size: 130%;" >
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100px; max-height: calc(100vh - 36px - 62px) !important;">
      <span>요청일시: {{dateRef}}
            <br/>
            출고 요청서가 인쇄됩니다. 
      </span>
    </div>
  </ow-modal>

  <ow-modal type="XS" title="거래명세서 인쇄"  ref="receiptePrintRef" :cancelButton="true" style="font-size: 130%;" >
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100px; max-height: calc(100vh - 36px - 62px) !important;">
      <span>요청일시: {{dateRef}}
            <br/>
            거래 명세서가 인쇄됩니다. 
      </span>
    </div>
  </ow-modal>

  <ow-modal type="XS" title="패킹완료"  ref="packingDoneRef" :cancelButton="true" style="font-size: 130%;" >
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100px; max-height: calc(100vh - 36px - 62px) !important;">
      <span>검수수량과 물품 수량이 일치하지 않습니다.<br/>다시한번 수량을 확인해주세요!</span>
    </div>
  </ow-modal>

</template>

<script>
import { ref, reactive, watch, toRaw} from 'vue';
import { SimpleMergeManager } from '@/utils/wijmo.grid';
import releaseInspectionApi from '@/api/releaseInspectionApi';

export default {
  setup() {
    const dummyBox = ref(null);
    const boxKey = ref(0);

    //출력시 필요한 현재 날짜 (2022-07-05 11:27:00)
    let today = new Date();
    let year = today.getFullYear();     // 년도
    let month = today.getMonth() + 1;   // 월
    let date = today.getDate();         // 날짜
    let hours = today.getHours();       // 시
    let minutes = today.getMinutes();   // 분
    let seconds = today.getSeconds();   // 초
    
    let dateRef = ref(year+'-'+month+'-'+date+' '+hours+':'+minutes+':'+seconds);

    //스캔버튼 눌렀을 때, orderStatus:false => 4, orderStatus:true => 5,6
    const orderStatus = ref(true);

    //grid 병합 처리 >> custom merge
    /**
     * grid를 custom merge할 수 있도록 함.
     * ow-grid의 헤더에 br태그로 줄바꿈 하기 위한 addHandler
     * 
     * @author 신현주
     */
    const onInitialized = (grid) => {
      grid.autoSizeRow(0, true);
      const config = {
        groupingColumns: ['clientName'],
        mergedColumns: [0, 1, 2, 3, 4, 5, 'releasePrintDate', 'releaseBoxQty', 14, 15, 16],
      };
      grid.mergeManager = new SimpleMergeManager(config);
      grid.selectionMode = 4 //RowRange
      grid.formatItem.addHandler((flex, e) => {
        if (e.panel == flex.columnHeaders) {
          e.cell.innerHTML = e.cell.textContent;
        }
      });
    };

    //좌측 상단에 현황을 보여주기 위한 데이터
    const statusBar = reactive({
      total: null,                //주문건
      totalPickingQty: null,      //피킹완료건
      commonPickingQty: null,     //피킹완료건 -> 일반
      emergencyPickingQty: null,  //피킹완료건 -> 긴급
      totalRlsQty: null,          //출고검수/패킹 -> 
      commonRlsQty: null,         //출고검수/패킹건 -> 일반
      emergencyRlsQty: null,      //출고검수/패킹건 -> 긴급
    });

    //전체 데이터 가져오는 함수
    /**
     * 현황 데이터를 요청하는 메소드.
     * 비동기 통신하여 데이터를 받아온 후, statusBar객체에 대입.
     * 
     * @author 신현주
     */
    async function getSummary() {
      const result = await releaseInspectionApi.getSummary()
      .then((data) => {
        statusBar.total               = data.count;
        statusBar.totalPickingQty     = data.pickingDoneCount;
        statusBar.commonPickingQty    = data.pickDnCommonCount;
        statusBar.emergencyPickingQty = data.pickDnEmergencyCount;
        statusBar.totalRlsQty         = data.rlsInspPackingCount;
        statusBar.commonRlsQty        = data.rlsInspPackCommonCount;
        statusBar.emergencyRlsQty     = data.rlsInspPackEmergencyCount;
      });
    }

    getSummary();

    /**
     * 검수 버튼을 클릭했을 시,
     * 검수처리를 위하여 검수수량 업데이트를 요청하는 메소드
     * 
     * @author 신현주
     * @param {String} releaseCode 출고번호
     * @param {String} barCode 바코드
     * @returns {number} result 업데이트 된 행의 개수
     */
    async function inspection(releaseCode, barCode) {
      const result = await releaseInspectionApi.releaseInspectionQtyUpdate(releaseCode, barCode);
      keyData.value++;
      return result;
    }

    /**
     * 미출고 버튼 이벤트 함수
     * 미출고 처리를 위하여 미출고 수량 업데이트를 요청하는 메소드
     * 
     * @author 신현주
     * @param {String} releaseCode 출고번호
     * @param {String} barCode 바코드
     */
    async function unrelease(releaseCode, barCode) {
      const result = await releaseInspectionApi.unReleaseQtyUpdate(releaseCode, barCode);
      keyData.value++;
      return result;
    }

    //박스 개수
    var boxNum = 0;

    //ow-tab에서 사용하는 item ex) 박스1, 박스2, 박스3...
    let boxArrays = ref([]);

    //ow-tab의 model에 넘겨줄 index
    var index = ref(null);

    /**
     * 박스 추가 버튼을 눌렀을 때, 실행되는 메소드
     * 박스n이 boxArrays에 추가될 수 있도록 한다. 
     * 
     * @author 신현주
     */
    function addBox() {

      //박스는 8개까지 만들 수 있다.
      if (boxNum < 8) {
        if(boxArrays.value.length>0){
          boxNum = boxArrays.value.length;
        }
        boxNum = boxNum + 1;
        boxArrays.value.push(`박스${boxNum}`);
      }

      //api로 전달할 변수(//박스별 물품수량을 저장할 객체 -> 박스 집합)
      const apiArray = [];
      
      for(let i=0; i<dummyBox.value.length; i++) {    
        apiArray.push({"releaseCode": dummyBox.value[i].releaseCode,
                      "orderItemNo" : dummyBox.value[i].orderItemNo,
                      "boxNumber": boxNum,
                      "boxItemQuantity": dummyBox.value[i].boxItemQuantity});
      }         
      
      //DB에 박스n에 대한 정보 INSERT
      insertBoxTable(apiArray);
    }

    //Filter
    const checkboxGroup5 = ref([
      { name: '긴급', value: '긴급' },
      { name: '일반', value: '일반' },
    ]);
    const emptyGroup = ref(['긴급','일반']);

    //전체 데이터(왼쪽) 가져오기(totalCount 정보까지 가지고 있음.)
    const releaseInspectionData = ref([]);
    const keyData = ref(0);

    //실험
    const list = ref(null)

    //page로 넘겨줄 object
    const page = reactive({"pageNo":1, "pageSize" : 5});
    
    //read에 전달되는 function
    /**
     * 목록 전체 조회.
     * @author 신현주
     * @param {Object} query 
     * @param {Number} pageNo FlexGrid 번호
     * @param {Number} pageSize FlexGrid 행 개수
     */
    releaseInspectionData.value = async function (query, pageNo, pageSize) { 
      //releaseInspectionApi 통신할 때 필요한 매개변수
      const apiData = {"emptyGroup": toRaw(emptyGroup.value), "pageNo":pageNo, "pageSize":pageSize};

      //통신하고 받아온 값 => DB데이터&totalCount
      list.value = await releaseInspectionApi.getFilterList(apiData);

      for (let i = 0; i < list.value.data.length; i++) {
      if (list.value.data[i].releaseBoxQty === 0) {
        list.value.data[i].releaseBoxQty = ' ';
      }
      if (list.value.data[i].releasePrintDate === null) {
        list.value.data[i].releasePrintDate = ' ';
      }
      if (list.value.data[i].receiptePrintDate === null) {
        list.value.data[i].receiptePrintDate = ' ';
      }
      if (list.value.data[i].done === 0) {
        list.value.data[i].done = 'N';
      }else if(list.value.data[i].done === 1) {
        list.value.data[i].done = 'Y';
      }
    }
      page.pageNo = list.value.pageNo;

      return {"data":list.value.data, "pageNo":list.value.pageNo, pageSize, "totalCount":list.value.totalCount};
    }

    //Barcode
    const scannedBarcode = ref();

    //Filter [긴급/일반] 변화 감시
    watch(emptyGroup, (newGroup, oldGroup) => {
      //필터 체크 해서 grid 다시 그려줄 때 pageNo는 1로 두어서 첫페이지로 올 수 있게 한다.
      page.pageNo = 1;
      
      //필터링 될 때마다 그리드 업데이트+
      keyData.value++;
    },
    {deep: true});

    //오른쪽 위 정보 ex)거래처명, 총검수수량
    const tally = reactive({
      clientName: '',
      category: '',
      totalPickingQty: 0,
      totalInspectionQty: 0,
      totalUnRelease: 0,
      releaseCode: 0,
      orderNo: 0,
      barCode: 0,
      releaseDone: ''
    });

    //박스 하나의 정보 -> v-model로 바인딩
    const boxItemData = ref(null);

    /**
     * 출고번호/바코드 조회 버튼 클릭 시 실행 
     * async await 패턴을 이용한 비동기 처리로 조회된 주문에 대한 물품 정보를 서버로부터 가져옴
     * 가져온 정보를 바탕으로 거래처, 총검수수량, 패킹된 박스 개수를 얻고 바인딩
     * 
     * @author 신현주
     * @param {String} code 
     * @param {String} kind 
     * @returns {Object} 스캔된 물품에 대한 정보를 담는 JSON
     */
    async function scan(code, kind) {
      //BoxArrays 초기화
      boxArrays.value = null;
      boxArrays.value = [];
      boxNum = 0;
      index.value = null;

      //result -> 스캔한 코드에 대한 전체 데이터
      const result = await getBoxInfobyReleaseCode(code, kind);
      dummyBox.value = result;

      tally.totalPickingQty = 0;
      tally.totalInspectionQty = 0;
      tally.totalUnRelease = 0;

      // 총검수수량(tally)
      for(let i=0; i<result.length; i++){
        tally.totalPickingQty += result[i].pickingQty;
        tally.totalInspectionQty += result[i].releaseInspectionQuantity;
        tally.totalUnRelease += result[i].oderItemUnreleaseQuantity;
      }

      tally.clientName = result[0].clientName;
      tally.category = result[0].category;
      tally.releaseCode = result[0].releaseCode; //출고번호
      tally.orderNo = result[0].orderNo;         //주문번호

      if(result[0].status === 4){
        orderStatus.value = false;
        if(result[0].releaseBoxQty>0){
          for(let i=1; i<=result[0].releaseBoxQty; i++){
            boxArrays.value.push('박스'+i)
          }
        }
      }else{
        orderStatus.value = true;
        for(let i=1; i<=result[0].releaseBoxQty; i++){
          boxArrays.value.push('박스'+i)
        }
      }
      return result;
    }

    /**
     * n번째 박스 패킹처리
     * 
     * @author 신현주
     * @returns 유효성 검사 통과 했을 경우 업데이트된 행의 개수
     */
    async function oneBoxPacking() {
      //api로 전달할 변수(//박스별 검수수량을 저장할 객체 -> 박스 집합)
      const apiArray = [];

      //하나의 box에 대한 물품수량 합계
      let sumBoxItemQty = 0;

      //전달해줄 데이터
      for(let i=0; i<boxItemData.value.length; i++) {
        apiArray.push({"releaseCode": boxItemData.value[i].releaseCode,
                      "orderItemNo" : boxItemData.value[i].orderItemNo,
                      "boxNumber": boxItemData.value[i].boxNum,
                      "boxItemQuantity": boxItemData.value[i].boxItemQuantity});
        sumBoxItemQty = sumBoxItemQty + parseInt(boxItemData.value[i].boxItemQuantity);
      }

      //api통신
      if(sumBoxItemQty === 0){  //물품 수량의 총합이 0일 경우
        openModal();
        return null;
      }else{                    //물품 수량의 총합이 0이 아닐 경우
        const result = await releaseInspectionApi.updateBoxTable(apiArray);
        keyData.value++;
        return result;
      }
    }

    /**
     * 패킹완료 버튼 클릭했을 때 실행
     * 유효성 검사를 통해 총 검수수량과 총 물품수량이 같은지 비교해준다.
     * 비동기 통신을 통해 orderStatus를 5로 증가시켜준다. 
     * 
     * @author 신현주
     */
    async function packingDone() {
      let sumItemQty = 0;

      //총검수수량
      sumItemQty = await getTotalRlQty(tally.orderNo);
      //총물품수량
      const totalItemQty = await getTotalItemQty(tally.releaseCode);
      if(totalItemQty == sumItemQty){
        //출고검수 완료 처리 -> orderStatus 5로 증가시켜 준다.
        const result = await releaseInspectionApi.packingDone(tally.orderNo);
        //왼쪽 그리드 업데이트
        keyData.value++;
      }else{
        openpackingModal();
      }
    }

    //ow-tab의 index 감시 (몇 번째 탭 클릭)
    watch(index, (newIndex, oldIndex)=>{

      if(orderStatus.value == true){
        getBoxInfobyOrderNo(tally.orderNo, index.value+1); 
      }else{
        getBoxInfobyOrderNo(tally.orderNo, index.value+1);
      }
    },{deep: true});

    /**
     * grid에 이벤트 발생했을 때, aggregateRange 호출
     * 
     * @author 신현주
     * @param gird
     */
    const SelectionChanged = async (grid, e) => {
      let ranges = grid.selectedRanges;

      tally.totalPickingQty = 0;
      tally.totalInspectionQty = 0;

      aggregateRange(tally, grid, ranges);
    };

    /**
     * ow-grid에서 마우스로 선택된 셀의 영역 데이터를 for문을 이용해 추출
     * 
     * @author 신현주
     * @param tally
     * @param grid
     * @param ranges
     */
    function aggregateRange(tally, grid, ranges) {
      for (let r = grid.selectedRanges[0]._row; r <= grid.selectedRanges[0]._row2; r++) {
        for (let c = 0; c <= 16; c++) {
          // account for overlapping ranges
          let overlapped = false;
          for (let i = 0; i < index && !overlapped; i++) {
            let rng = ranges[i];
            if (rng.contains(r, c)) {
              overlapped = true;
            }
          }
          // tally non-overlapped cells
          if (!overlapped) {
            let data = grid.getCellData(r, c, false);
            if (r === grid.selectedRanges[0]._row) {
              if (c === 1) {
                tally.totalUnRelease = '-';
                tally.clientName = data;
              } else if (c === 2) {
                tally.category = data;
              } else if (c === 3) {
                tally.releaseCode = data;
              } else if (c === 5) {
                tally.orderNo = data;
              }
            }
            if (c === 9) {
              tally.totalPickingQty += data;
            } else if (c === 10) {
              tally.totalInspectionQty += data;
            }
          }
        }
      }
    }

    /**
     * 주문번호와 패킹된 박스의 번호를 통해 해당 박스에 들어있는 물품 정보 조회를 요청하는 함수
     * 
     * @author 신현주
     * @param orderNo
     * @param index
     */
    async function getBoxInfobyOrderNo(orderNo, index){
      const result = await releaseInspectionApi.getBoxInfobyOrderNo(orderNo, index);
      boxItemData.value = result;
      return result;
    }

    /**
     * 거래처, 총검수수량, 패킹된 박스 개수를 얻기 위한 요청 함수
     * 
     * @author 신현주
     * @param code 출고번호/바코드
     * @param kind 'releaseCode'/'barCode'
     */
    async function getBoxInfobyReleaseCode(code, kind){
      const result = await releaseInspectionApi.scan(code, kind);
      return result;
    }

    /**
     * box정보 생성 요청을 위한 메소드
     * 
     * @author 신현주
     * @param apiArray 필터링 정보, 페이지 사이즈, 현재 페이지의 정보를 포함한 객체
     */
    async function insertBoxTable(apiArray){
      await releaseInspectionApi.insertToBoxTable(apiArray);
    }

    /**
     * 총물품수량 조회를 요청하기 위한 메소드
     * 
     * @author 신현주
     * @param rlsCode 출고번호
     */
    async function getTotalItemQty(rlsCode){
      await releaseInspectionApi.getTotalItemQty(rlsCode);
    }

    /**
     * 총검수수량 조회를 요청하기 위한 메소드
     * 
     * @author 신현주
     * @param orderNo 주문번호
     */
    async function getTotalRlQty(orderNo) {
      await releaseInspectionApi.getTotalRlQty(orderNo);
    }

    //출고요청서 인쇄 btn
    function releasePrintBtn(e,ctx) {
      openreleaseModal();
    }

    //거래명세서 인쇄 btn
    function receiptPrintBtn(e, ctx) {
      openreceipteModal();
    }

    /**
     * 박스N 패킹완료 버튼 유효성 검사 모달
     * 
     * @author 신현주
     */
    const modalRef = ref(null);
    const openModal = async function () {
      const config = {
        data: {},
        cancelButtonText: '확인',
      };
      const childRefData = await modalRef.value.open('accept', config);
    };

    /**
     * 패킹 최종완료 유효성 검사 모달
     * 
     * @author 신현주
     */
    const packingDoneRef = ref(null);
    const openpackingModal = async function() {
      const config = {
        data: {},
        cancelButtonText: '확인',
      };
      const childRefData = await packingDoneRef.value.open('accept', config);
    } 

    /**
     * 출고요청서 인쇄 버튼 클릭시 모달
     * 
     * @author 신현주
     */
    const releasePrintRef = ref(null);
    const openreleaseModal = async function () {
      const config = {
        data: {},
        cancelButtonText: '확인',
      };
      const childRefData = await releasePrintRef.value.open('accept', config);
    };

    /**
     * 거래명세서 인쇄 버튼 클릭시 모달
     * 
     * @author 신현주
     */
    const receiptePrintRef = ref(null);
    const openreceipteModal = async function () {
      const config = {
        data: {},
        cancelButtonText: '확인',
      };
      const childRefData = await receiptePrintRef.value.open('accept', config);
    };




    return {
      onInitialized,
      releaseInspectionData,
      checkboxGroup5,
      emptyGroup,
      SelectionChanged,
      tally,
      scannedBarcode,
      inspection,
      unrelease,
      scan,
      addBox,
      boxArrays,
      index,
      statusBar,
      keyData,
      boxKey,
      page,
      boxItemData,
      oneBoxPacking,
      orderStatus,
      packingDone,
      openModal,
      releasePrintBtn,
      modalRef,
      releasePrintRef,
      receiptePrintRef,
      packingDoneRef,
      dateRef,
      receiptPrintBtn
    };
  },
};
</script>

<style scoped lang="scss">
:deep {
  .ow-grid .wj-cells .wj-cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wj-cell.wj-header {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: inherit;
  }
  .clr-red {
    color: #f60808;
  }
  .wj-cell.wj-header.wj-align-center {
    max-height: 300px;
  }
  .wj-cell.wj-header.wj-wrap.wj-align-center {
    line-height: inherit;
  }
  .wj-cell.wj-header.wj-colgroup {
    border-bottom: 0px;
  }
  
  //center
  .wj-flexgrid .wj-cell .wj-align-center {
    justify-content: center;    
  }
  .wj-flexgrid .wj-colheaders .wj-header.wj-colgroup.wj-align-right {
    justify-content: flex-start;
  }
  .wj-cell .border-center {
    display: flex;
    align-items: center;
    line-height: inherit;
  }
}
</style>


