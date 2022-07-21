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
              :binding="'releaseBoxQty'"
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
            <button class="ow-btn type-state" v-on:click="addBox()">박스추가+</button>
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
                  <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                    <div class="ow-input">
                      <input id="releaseInspectionQtyInput" type="text" :value='cell.item.releaseInspectionQuantity'/>
                    </div>
                  </wj-flex-grid-cell-template>    
                </wj-flex-grid-column-group>
                <wj-flex-grid-column-group :binding="'boxItemQuantity'" header="물품수량" :width="63" >
                  <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                    <div class="ow-input">
                      <input id="boxItemQtyInput" type="text" :value='cell.item.boxItemQuantity'/>
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
export default {

  setup() {
    //grid 병합 처리 >> custom merge
    const onInitialized = (grid) => {
      grid.autoSizeRow(0, true);
      const config = {
        groupingColumns: ['clientName'],
        mergedColumns: [0, 1, 2, 3, 4, 5, 'releasePrintDate', 'releaseBoxQty', 14, 15, 16],
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
      totalRlsQty: null,          //출고검수/패킹 -> 
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
    async function inspection(releaseCode, barCode) {
      console.log("검수처리 버튼 클릭 >>", releaseCode)
      const result = await releaseInspectionApi.releaseInspectionQtyUpdate(releaseCode, barCode);
      keyData.value++;
      // for(let i=0; i<list.value.data.length; i++){
      //   if(list.value.data[i].orderNo = "11111111111111111");
      // }
      return result;
    }

    //미출고 버튼 이벤트 함수
    async function unrelease(releaseCode, barCode) {
      const result = await releaseInspectionApi.unReleaseQtyUpdate(releaseCode, barCode);
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

    //실험
    const list = ref(null)

    //page로 넘겨줄 object
    const page = reactive({"pageNo":1, "pageSize" : 3});
    
    //read에 전달되는 function
    releaseInspectionData.value = async function (query, pageNo, pageSize) {
      
      //releaseInspectionApi 통신할 때 필요한 매개변수
      const apiData = {"emptyGroup": toRaw(emptyGroup.value), "pageNo":pageNo, "pageSize":pageSize};
      console.log("apiData >> ",apiData);

      //통신하고 받아온 값 => DB데이터&totalCount
      list.value = await releaseInspectionApi.getFilterList(apiData);
      console.log("list >>", list.value.data);

      //순수 데이터(totalCount 제외)
      rIData.value = list.value.data;

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
      //필터링 될 때마다 그리드 업데이트+
      keyData.value++;
      console.log("releaseInspectionData.value >> ",releaseInspectionData.value);
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
 
    //박스들(list)의 정보를 포함하는 list
    const boxItemDataList = [];

    //박스 하나의 정보 
    const boxItemData = ref(null);

    // 스캔 버튼 이벤트 함수
    // 출고번호(releaseCode) or 바코드(barCode)
    async function scan(code, kind) {
      //result -> 스캔한 코드에 대한 전체 데이터
      const result = await releaseInspectionApi.scan(code, kind);

      console.log("result >> ", result);

      tally.totalPickingQty = 0;
      tally.totalInspectionQty = 0;
      tally.totalUnRelease = 0;

      // tally의 총합 
      for(let i=0; i<result.length; i++){
        console.log(i + ">>>", result[i]);
        tally.totalPickingQty += result[i].pickingQty;
        tally.totalInspectionQty += result[i].releaseInspectionQuantity;
        tally.totalUnRelease += result[i].oderItemUnreleaseQuantity;
      }

      tally.clientName = result[0].clientName;
      //tally.orderNo = result[0].orderNo;
      tally.category = result[0].category;
      //tally.barCode = result[0].releaseBarCode;  //바코드
      tally.releaseCode = result[0].releaseCode; //출고번호

      console.log("-------------------scan----------------------");
      console.log("boxItemDataList >> ", boxItemDataList);
      console.log('boxItemData', boxItemData.value);

      if(kind == "releaseCode") {
        for(let i=0; i<8; i++){
          // box테이블 데이터 list에 저장
          boxItemDataList.push(result);
        }
      }

      boxItemData.value = boxItemDataList[0];
      
      //boxItemData.value = result;

      // console.log("rIData.value>>", rIData.value);
      // console.log("result>>", result);

      // for (let i = 0; i < rIData.value.length; i++) {
      //   if (rIData.value[i].orderNo === tally.orderNo) {
      //     boxItemData.value.push(rIData.value[i]);
      //   }
      // }

      // console.log('boxItemData', boxItemData.value);
      return result;
    }

    const test111 = (e) => {
      console.log("==============test111=============");
      console.log(e.target.value);
      console.log(e.target);
      console.log(e);
    };

    function test222(cell) {
      console.log(cell);
    }

    //n번째 박스 패킹처리
    async function oneBoxPacking(index) {

      //api로 전달할 변수(//박스별 검수수량을 저장할 객체 -> 박스 집합)
      const apiArray = [];
      const dummyBox = boxItemDataList[index];
      console.log("dummyBox >> ", dummyBox);
      console.log(" boxItemDataList[2] >> ", boxItemDataList[2]);

      // for(let i=0; i<boxItemData.value.length; i++) {
      //   console.log(i+'번째', boxItemData.value[i]);
        
      //   apiArray.push({"releaseCode": boxItemData.value[i].releaseCode,
      //                 "orderItemNo" : boxItemData.value[i].orderItemNo,
      //                 "boxNumber": index+1, 
      //                 "boxItemQuantity": boxItemData.value[i].boxItemQuantity});

      //   keyData.value++;
      // }
      console.log("패킹패킹");
      console.log(apiArray);

      console.log("=====oneBoxPacking 클릭=====")
      
      console.log("boxItemData >> ", boxItemData.value);
      console.log("수정전 boxItemDataList >> ", boxItemDataList);
      //boxItemDataList 바꿔주기..
      boxItemDataList[index] = boxItemData.value
      console.log("수정후 boxItemDataList >> ", boxItemDataList);

      //api통신
      // const result = await releaseInspectionApi.packing(apiArray);
      // return result;
    }

    const boxKey = ref(0);

    //ow-tab의 index 감시 (몇 번째 탭 클릭)
    watch(index, (newIndex, oldIndex)=>{

      //cell.item.boxItemQuantity = 0;

      console.log("===========watch===========");
      console.log("boxItemDataList>>", boxItemDataList);

      //뷰 재로딩
      boxKey.value ++; 
      console.log("현재 index >> ", index.value);

      console.log("boxItemDataList[index] >>", boxItemDataList[index.value]);
      boxItemData.value = boxItemDataList[index.value];

    },{deep: true});

    const SelectionChanged = async (grid, e) => {

      console.log('범위');
      console.log(grid.selectedRanges[0]._row);
      console.log(grid.selectedRanges[0]._row2);

      console.log("grid >> ", grid);
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
      statusBar,
      keyData,
      boxKey,
      pageValue,
      page,
      boxItemData,
      oneBoxPacking,
      test111,
      test222
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
