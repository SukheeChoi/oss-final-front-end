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
            :pageValue = "pageValue.value"
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
              :width="100"
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
              :header="'출고요청서인쇄'"
              :allowMerging="true"
              :width="70"
              align="center"
              :wordWrap="true"
              :multiline="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'boxQty'"
              :header="'출고Box수량'"
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
              :header="'거래명세서인쇄'"
              :allowMerging="true"
              :width="70"
              align="center"
              :wordWrap="true"
              :multiline="true"
            ></wj-flex-grid-column>
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
                  <div class="ow-input mr-1" style="--width: 60px">
                    <input type="text" v-model="tally.totalPickingQty" />
                  </div>
                </div>
                <div class="state-item">
                  <div class="w-100">*총검수수량</div>
                  <div class="ow-input mr-1" style="--width: 60px">
                    <input type="text" v-model="tally.totalInspectionQty" />
                  </div>
                </div>
                <div class="state-item">
                  <div class="w-100">*총미출고수량</div>
                  <div class="ow-input mr-1" style="--width: 60px">
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
                    <button class="ow-btn type-state ml-3" v-on:click="scan(tally.releaseCode, 'releaseCode')">스캔</button>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">바코드스캔</th>
                <td>
                  <div class="ow-input">
                    <input type="text" v-model="tally.barCode"/>
                    <button class="ow-btn type-state ml-3" v-on:click="scan(tally.barCode, 'barCode')">스캔</button>
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
            <button class="ow-btn type-util float-right ml-2" style="float: right" v-on:click="unrelease(tally.releaseCode)">
              미출고처리
            </button>
            <button class="ow-btn type-util float-right" style="float: right" v-on:click="inspection(tally.releaseCode)">
              검수처리
            </button>
          </div>
        </div>

        <!-- 박스별 품목정보 -->
        <div class="item align-y-start">
          <div class="ow-flex-wrap">
            <div class="title-field">박스별품목정보</div>
            <button class="ow-btn type-state" v-on:click="addBox()">박스추가+</button>
          </div>
        </div>
        <div>
          <ow-tab v-bind:items="boxArrays" v-model="index"></ow-tab>
          <div class="ow-grid-wrap">
            <wj-flex-grid headersVisibility="Column" class="ow-grid" :items-source="boxItemData">
              <wj-flex-grid-column-group class="wj-align-left" :header="'*박스'+`${index+1}`+' 품목정보'" style="border-bottom: none; text-align: left; justify-content: flex-start;">
                <wj-flex-grid-column-group :binding="'no'" header="No" :width="40" />
                <wj-flex-grid-column-group :binding="'itemName'" header="품목명" :width="100" />
                <wj-flex-grid-column-group :binding="'code'" header="품목코드" :width="100" />
                <wj-flex-grid-column-group :binding="'orderItemqty'" header="주문수량" :width="63" />
                <wj-flex-grid-column-group :binding="'pickingQty'" header="피킹수량" :width="63" />
                <wj-flex-grid-column-group :binding="'releaseInspectionQuantity'" header="검수수량" :width="63" >
                  <!-- <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">-->
                    <!-- <div class="ow-input"> -->
                      <!-- <input id="releaseInspectionQuantity" type="text" :v-model='cell.item.releaseInspectionQuantity'/> -->
                    <!-- </div>
                  </wj-flex-grid-cell-template>   -->  
                </wj-flex-grid-column-group>
                <wj-flex-grid-column-group :binding="'note'" header="물품수량" :width="63" >
                  <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                    <div class="ow-input">
                      <input id="note" type="text" v-model='cell.item.note'/>
                    </div>
                  </wj-flex-grid-cell-template>    
                </wj-flex-grid-column-group>
              </wj-flex-grid-column-group>
            </wj-flex-grid>
          </div>
          <div class="container">
            <button class="ow-btn type-util float-right ml-2" style="float: right" v-on:click="packingDone()" v-if="boxArrays.length > 0">
              패킹최종완료
            </button>
            <button class="ow-btn type-util float-right ml-2" style="float: right" v-on:click="oneBoxPacking(index)" v-if="boxArrays.length > 0">
              박스{{index+1}} 패킹완료
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch, toRaw, onMounted } from 'vue';
import { SimpleMergeManager } from '@/utils/wijmo.grid';
import releaseInspectionApi from '@/api/releaseInspectionApi';
//import OwGrid2 from '@/components/grid/new/OwGrid2';
export default {

  setup() {
    // const state = reactive({
    //   flex: null, //wj-flex-grid의 정보를 flex에 담아서 사용
    // });

    //grid 병합 처리 >> custom merge
    const onInitialized = (grid) => {
      grid.autoSizeRow(0, true);

      const config = {
        groupingColumns: ['clientName'],
        mergedColumns: [0, 1, 2, 3, 4, 5, 'releasePrintDate', 'boxQty', 14, 15, 16],
      };
      grid.mergeManager = new SimpleMergeManager(config);
      grid.selectionMode = 4 //RowRange
    };

    //
    const pageValue = ref(1);

    //현황
    const statusBar = reactive({
      total: null,                //주문건
      totalPickingQty: null,      //피킹완료건
      commonPickingQty: null,     //피킹완료건 -> 일반
      emergencyPickingQty: null,  //피킹완료건 -> 긴급
      totalRlsQty: null,          //출고검수/패킹
      commonRlsQty: null,         //출고검수/패킹건 -> 일반
      emergencyRlsQty: null,      //출고검수/패킹건 -> 긴급
    });

    //전체 데이터 가져오는 함수
    async function getTotal() {
      const result = await releaseInspectionApi.getTotal()
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

    getTotal();

    //검수 버튼 이벤트 함수
    async function inspection(releaseCode) {
      console.log("검수처리 버튼 클릭 >>", releaseCode)
      const result = await releaseInspectionApi.releaseInspectionQtyUpdate(releaseCode);
      return result;
    }

    //미출고 버튼 이벤트 함수
    async function unrelease(releaseCode) {
      const result = await releaseInspectionApi.unReleaseQtyUpdate(releaseCode);
      return result;
    }

    //box테이블(오른쪽 아래) 데이터 가져오기
    const boxItemData = ref(null);

    // 스캔 버튼 이벤트 함수
    // 출고번호(releaseCode) or 바코드(barCode)
    async function scan(code, kind) {
      //스캔해서 총검수수량과 같은 정보를 가져온다.
      const result = await releaseInspectionApi.scan(code, kind);

      tally.clientName = result.client.clientName;
      tally.totalPickingQty = result.picking.pickingQty;            //총피킹수량
      tally.totalInspectionQty = result.releaseInspectionQuantity;  //총검수수량
      tally.totalUnRelease = result.unReleased;                     //총미출고수량
      tally.orderNo = result.order.orderNo;
      tally.category = result.order.shippingCategory;
      tally.barCode = result.release.releaseBarCode;                //바코드
      tally.releaseCode = result.release.releaseCode;               //출고번호
      //tally.releaseDone = result.release.releaseDone;               //출고검수여부

      console.log("scan result>>", result);
 
      // 1) 출고검수 이전일 때, releaseDone = 0
      if(result.release.releaseDone == 0 ){
        //스캔 버튼 누르면 box테이블 데이터 생성
        boxItemData.value = await releaseInspectionApi.getBoxInfo(tally.releaseCode);
      }
    
      console.log('boxItemData >>', boxItemData);
      return result;
    }

    //박스 개수
    var boxNum = 0;

    //ow-tab에서 사용하는 item ex) 박스1, 박스2, 박스3...
    let boxArrays = ref([]);

    //ow-tab의 model에 넘겨줄 index
    var index = ref(0);

    //박스 추가 버튼 -> boxArrays에 추가
    function addBox() {
      //박스는 8개까지 만들 수 있다.
      if (boxNum < 8) {
        boxNum = boxNum + 1;
        boxArrays.value.push(`박스${boxNum}`);
      }
    }

    //박스들(list)의 정보를 포함하는 list
    const boxItemDataList = ref([]);

    //n번째 박스 패킹처리
    async function oneBoxPacking(index) {

      //api로 전달할 변수(//박스별 검수수량을 저장할 객체 -> 박스 집합)
      const apiArray = [];

      for(let i=0; i<boxItemData.value.length; i++){
        console.log(i+'번째', boxItemData.value[i]);
        boxItemData.value[i].releaseInspectionQuantity += parseInt(boxItemData.value[i].note);
        
        apiArray.push({"releaseCode": boxItemData.value[i].releaseCode,
                      "boxNumber": index+1, 
                      "orderItemNo" : boxItemData.value[i].orderItemNo});

        boxItemData.value[i].note = null;

        keyData.value++;
      }

      console.log("패킹패킹");
      console.log(apiArray);
      
      //몇번째 박스인지 정보 넣어줌.
      boxItemData.value.push({"boxNumber": index+1});

      //boxItemDataList에 push
      boxItemDataList.value.push(boxItemData.value);

      console.log("boxItemDataList.value >> ", boxItemDataList.value);

      //api통신
      // const result = await releaseInspectionApi.packing(apiArray);
      return result;
    }

    //패킹완료 버튼 클릭
    async function packingDone() {
      //boxArrays.length (박스개수), releaseCode(숫자) 전달
      const packingDoneInfo = {"boxQty":boxArrays.value.length, "releaseCode": tally.releaseCode}
      console.log("패킹완료 버튼 클릭!!")
      console.log(packingDoneInfo);

      //출고검수 (release done) 완료 처리
      const result = await releaseInspectionApi.packingDone(packingDoneInfo);

      //패킹이 완료되었기 때문에 박스변수 초기화
      boxNum = 0;
      boxArrays.value = []

      //왼쪽 그리드 업데이트 >> 페이지 no가 계속 바뀌는게 문제점. 
      keyData.value++;
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
    
    //순수 데이터
    const rIData = ref(null);

    //page로 넘겨줄 object
    const page = reactive({"pageNo":1, "pageSize" : 3});
    
    //read에 전달되는 function
    releaseInspectionData.value = async function (query, pageNo, pageSize) {
      
      //releaseInspectionApi 통신할 때 필요한 매개변수
      const apiData = {"emptyGroup": toRaw(emptyGroup.value), "pageNo":pageNo, "pageSize":pageSize};
      console.log("apiData >> ",apiData);

      //통신하고 받아온 값 => DB데이터&totalCount
      const list = await releaseInspectionApi.getFilterList(apiData);
      console.log("list >>", list);

      //순수 데이터(totalCount 제외)
      rIData.value = list.data;

      for (let i = 0; i < list.data.length; i++) {
      if (list.data[i].boxQty === 0) {
        list.data[i].boxQty = ' ';
      }
      if (list.data[i].releasePrintDate === null) {
        list.data[i].releasePrintDate = ' ';
      }
      if (list.data[i].receiptePrintDate === null) {
        list.data[i].receiptePrintDate = ' ';
      }
      if (list.data[i].done === 0) {
        list.data[i].done = 'N';
      }else if(list.data[i].done === 1) {
        list.data[i].done = 'Y';
      }
    }

      page.pageNo = list.pageNo;

      return {"data":list.data, "pageNo":list.pageNo, pageSize, "totalCount":list.totalCount};
    }

    //Barcode
    const scannedBarcode = ref();

    //Filter [긴급/일반] 변화 감시
    watch(emptyGroup, (newGroup, oldGroup) => {
      //필터링 될 때마다 그리드 업데이트+
      keyData.value++;
      console.log("#####################################################")
      console.log("releaseInspectionData.value >> ",releaseInspectionData.value);
    },
    {deep: true});

    //scannedBarcode 감시
    // watch(scannedBarcode, (newScannedBarcode, oldScannedBarcode) => {
    //   console.log('scannedBarcode 객체 변경 감시');
    //   console.log('newScannedBarcode:', newScannedBarcode);
    //   console.log('oldScannedBarcode:', oldScannedBarcode);
    // });

    //ow-tab의 index 감시 (몇 번째 탭 클릭)
    watch(index, (newIndex, oldIndex)=>{

    })


    //오른쪽 위 정보 ex)거래처명, 총검수수량
    const tally = reactive({
      clientName: '',
      category: '',
      totalPickingQty: 10,
      totalInspectionQty: 0,
      releaseCode: 0,
      orderNo: 0,
      totalUnRelease: 0,
      barCode: 0,
      releaseDone: ''
    });

    const SelectionChanged = async (grid, e) => {

      console.log('범위');
      console.log(grid.selectedRanges[0]._row);
      console.log(grid.selectedRanges[0]._row2);

      console.log("===========grid===========")
      console.log(grid);
      console.log(e);

      console.log('첫번째 데이터');
      console.log(grid.getCellData(0, 0, false));

      let ranges = grid.selectedRanges;

      tally.totalPickingQty = 0;
      tally.totalInspectionQty = 0;

      aggregateRange(tally, grid, ranges);
    };

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

    return {
      // ...toRefs(state),
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
      boxItemData,
      statusBar,
      packingDone,
      oneBoxPacking,
      keyData,
      pageValue,
      page
    };
  },
};
</script>

<style>
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

.wj-flexgrid .wj-colheaders .wj-header.wj-colgroup.wj-align-right {
  justify-content: flex-start;
}
</style>
