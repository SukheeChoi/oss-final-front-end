<template>
<div class="ow-flex-wrap dir-col" style="--gap:10px;">
  <div class="item">
    <div class="ow-flex-wrap">
      <div class="item size-fix" style="--gap-item:6px;">
        <div class="title-field">현황</div>
      </div>
      <div class="item">
        <div class="state">
          <div class="state-item">주문건 : <strong>1672</strong>건 </div>
          <div class="state-item">피킹완료건 : <strong>1487</strong>건 (긴급 <strong class="color-type-2">5</strong>건/일반 <strong>1482</strong>건) </div>
          <div class="state-item">출고검수/패킹건 : 0건 (긴급 <strong class="color-type-2">2</strong>건/일반 <strong>183</strong>건) </div>
        </div>
      </div>
    </div>
  </div>
</div>
<hr>
<dl class="checkbox-title-wrap">
  <dt>배송 구분</dt>
  <dd>
    <ow-filter-checkbox name="checkboxGp5" v-bind:items="checkboxGroup5" v-model="emptyGroup"></ow-filter-checkbox>
  </dd>
</dl>

<!-- 본문 시작, ow-flex 사용 -->
<div class="ow-flex-wrap">
  <!-- 그리드 영역 -->
  <div class="item ow-flex-wrap dir-col" style="--size: 80%;">
    <div class="container-fluid">
      <div class="ow-grid-wrap">
        <wj-flex-grid
          headersVisibility="Column"
          selectionMode="RowRange"
          :items-source="releaseInspectionData"
          class="ow-grid"
          :allowMerging="'Cells'"
          :initialized="onInitialized"
          :autoRowHeights="true"
          :autoGenerateColumns="false"
          :selectionChanged="SelectionChanged"
        > <!-- :autoRowHeights="true" -->
          <wj-flex-grid-column :binding="'no'" :header="'No'" :allowMerging="true" :width=40 align="center"/>
          <wj-flex-grid-column :binding="'clientName'" :header="'거래처'" :allowMerging="true" :width=100 align="center"/>
          <wj-flex-grid-column :binding="'category'" :header="'배송구분'" :allowMerging="true" :width=65 align="center"/>
          <wj-flex-grid-column :binding="'releaseCode'" :header="'출고번호'" :allowMerging="true" :width=100 align="center"/>
          <wj-flex-grid-column :binding="'shippingDestination'" :header="'배송지'" :allowMerging="true" :width=100 align="center"/>
          <wj-flex-grid-column :binding="'orderNo'" :header="'주문번호'" :allowMerging="true" :width=100 align="center"/>
          <wj-flex-grid-column :binding="'vendorName'" :header="'업체명'" :width=70 align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'itemName'" :header="'품목명'" :width=130 align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'code'" :header="'품목코드'" :width=130 align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'pickingQty'" :header="'피킹수량'" :width=65 align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'releaseInspectionQuantity'" :header="'검수수량'" :width=65 align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'employeeName'" :header="'피킹담당자'" :width=100 align="center"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'releasePrintDate'" :header="'출고요청서인쇄'" :allowMerging="true" :width=70 align="center" :wordWrap="true" :multiline="true"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'boxQty'" :header="'출고Box수량'"  :allowMerging="true" :width=70 align="center" :wordWrap="true" :multiline="true"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'done'" :header="'출고검수'" :allowMerging="true" :width=70 align="center"></wj-flex-grid-column>           
          <wj-flex-grid-column :binding="'receiptePrintDate'" :header="'거래명세서인쇄'" :allowMerging="true" :width=70 align="center" :wordWrap="true" :multiline="true"></wj-flex-grid-column>
          <wj-flex-grid-column :binding="'note'" :header="'비고'" :width=70 align="center" :allowMerging="true"></wj-flex-grid-column>
        </wj-flex-grid>
      </div>
    </div>
  </div>

  <!-- 검수스캔 영역 -->
  <div class="item align-items-start">
    <div class="ow-flex-wrap dir-col">
      
      <!-- 바코드 스캔(윗부분) -->
      <div class="item size-fix ow-flex-wrap dir-col">

        <div class="ow-flex-wrap">
          <div class="item size-fix" style="--gap-item:6px;">
            <div class="title-field">거래처명</div>
          </div>
          <div class="item">
            <div class="state">
              <div class="state-item w-100">{{tally.clientName}}</div>
              <div class="state-item ow-select">
                <select name="" id="">
                  <option value="긴급" selected>긴급</option>
                  <option value="일반">일반</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="ow-flex-wrap">
          <div class="item size-fix" style="--gap-item:6px;">
            <div class="title-field">총검수수량</div>
          </div>
          <div class="item">
            <div class="state">
              <div class="state-item">
                <div class="w-100">*총피킹수량</div>
                <div class="ow-input mr-2" style="--width:60px">
                  <input type="text" v-model="tally.totalPickingQty"/>
                </div>
              </div>
              <div class="state-item">
                <div class="w-100">*총검수수량</div>
                <div class="ow-input mr-2" style="--width:60px">
                  <input type="text" v-model="tally.totalInspectionQty"/>
                </div>
              </div>
              <div class="state-item">
                <div class="w-100">*총미출고수량</div>
                <div class="ow-input mr-2" style="--width:60px">
                  <input type="text" v-model="tally.unRelease"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="ow-table-type-info">
          <colgroup>
            <col style="width:160px" />
            <col style="width:auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">출고번호스캔</th>
              <td>
                <div class="ow-input">
                  <input type="text" v-model="tally.releaseCode"/>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">바코드스캔</th>
              <td>
                <div class="ow-input">
                  <input type="text" v-model="scannedBarcode"/>
                  <button class="ow-btn type-state ml-3" v-on:click="scan(tally.releaseCode)">스캔</button>
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
          <button class="ow-btn type-util float-right ml-2" style="float:right" v-on:click="unrelease(tally.releaseCode, scannedBarcode)">미출고처리</button>
          <button class="ow-btn type-util float-right" style="float:right" v-on:click="inspection(tally.releaseCode, scannedBarcode)">검수처리</button>
        </div>
               
      </div>

      <!-- 박스별 품목정보 -->
      <div class="item align-y-start">
        <div class="ow-flex-wrap">
          <div class="item size-fix" style="--gap-item:6px;">
            <div class="title-field">박스별품목정보</div>
          </div>
          <button class="ow-btn type-state" v-on:click="addBox()" >박스추가+</button>
        </div>
      </div>
      <div>
        <ow-tab v-bind:items="boxArrays" v-model="index"></ow-tab>
        <div class="ow-grid-wrap">
          <wj-flex-grid
            headersVisibility="Column"
            class="ow-grid"
            :items-source="boxItemData">
            <wj-flex-grid-column :binding="'no'" header="No" :width=55 />
            <wj-flex-grid-column :binding="'itemName'" header="품목명" :width=100 />
            <wj-flex-grid-column :binding="'code'" header="품목코드" :width=100 />
            <wj-flex-grid-column :binding="'orderItemqty'" header="주문수량" :width=65 />
            <wj-flex-grid-column :binding="'pickingQty'" header="피킹수량" :width=65 />
            <wj-flex-grid-column :binding="'releaseInspectionQuantity'" header="검수수량" :width=65 />
          </wj-flex-grid>
        </div>
      </div>

    </div>
  </div>
</div>

</template>

<script>
import { ref, reactive, toRefs, watch, toRaw, onMounted } from 'vue';
import { SimpleMergeManager} from '@/utils/wijmo.grid';
import releaseInspectionApi from '@/api/releaseInspectionApi';

export default {
  setup() {
    const state = reactive({
      flex: null,  //wj-flex-grid의 정보를 flex에 담아서 사용
    });

    //grid 병합 처리 >> custom merge
    const onInitialized = (flex) => {
      const config = {
        groupingColumns: ["clientName"],
        mergedColumns : [0,1,2,3,4,5,'releasePrintDate','boxQty',14,15,16],        
      };
      flex.mergeManager = new SimpleMergeManager(config);
    };

    //     const getFilterList = async(newGroup) => {
    //   const list = await releaseInspectionApi.getFilterList(newGroup);
    //   return list;
    // };

    //검수 버튼 이벤트 함수
    async function inspection(releaseCode, scannedBarcode) {
      let codes = {"releaseCode":releaseCode, "scannedBarcode":scannedBarcode};
      const result = await releaseInspectionApi.releaseInspectionQtyUpdate(codes);
      return result;
    }

    //미출고 버튼 이벤트 함수
    async function unrelease(releaseCode, scannedBarcode){
      let codes = {"releaseCode":releaseCode, "scannedBarcode":scannedBarcode};
      const result = await releaseInspectionApi.unReleaseQtyUpdate(codes);
      return result;
    }

    //box테이블(오른쪽 아래) 데이터 가져오기
    const boxItemData = ref([]);

    //스캔 버튼 이벤트 함수
    async function scan(releaseCode){
      const result = await releaseInspectionApi.scan(releaseCode);
      console.log("vue")
      
      tally.clientName = result.client.clientName;
      tally.totalPickingQty = result.picking.pickingQty;
      tally.totalInspectionQty = result.releaseInspectionQuantity;
      tally.unRelease = result.unReleased;
      tally.orderNo = result.order.orderNo;

      for(let i=0; i<releaseInspectionData.value.length; i++){
        if(releaseInspectionData.value[i].orderNo === tally.orderNo){
          boxItemData.value.push(releaseInspectionData.value[i]);
        }
      }

      console.log("boxItemData",boxItemData.value);
      return result;
    }

    //박스 개수
    var boxNum = 0;

    // ow-tab에 넘겨줄 index
    var index = ref(0); 

    //박스 추가 버튼
    function addBox(){
      boxNum = boxNum +1;
      //박스는 8개까지 만들 수 있다.
      if(boxNum<9){
        boxArrays.value.push(`박스${boxNum}`);
      }
    }

    let boxArrays = ref([]);
    let emptyBoxArrays = ref([]);

    //click box number
    let clickBoxNum = 0;

    function click(index) {
      clickBoxNum = index;
      console.log(`${index}번째 버튼을 눌렀습니다.`, clickBoxNum);
      return clickBoxNum;
    };

    const isActive = (index) => {
      console.log("isActive");
      console.log("index", index);
      console.log("click", click());

      return clickBoxNum === index;
    };

    // 전체 데이터 가져오는 부분 주석처리
    // const getReleaseInspectionList = async () => {
    //   console.log('111111111111111111111111~~~~~~~~~~~~~~~~~~~~~~~~~~');
    //   const list = await releaseInspectionApi.getReleaseInspectionList();
    //   //const list = await releaseInspectionApi.getFilterList(['긴급']);

    //   //데이터 처리
    //   console.log(list);
    //   console.log("데이터 크기");
    //   console.log(list.length);
    //   for(let i=0; i<list.length; i++){
    //     if(list[i].boxQty === 0){
    //       list[i].boxQty = " ";
    //     }
    //     if(list[i].releasePrintDate === null){
    //       list[i].releasePrintDate = " ";
    //     }
    //     if(list[i].receiptePrintDate === null){
    //       list[i].receiptePrintDate = " ";
    //     }
    //   }
    //   console.log('222222222222222222222222~~~~~~~~~~~~~~~~~~~~~~~~~~');
    //   console.log(list);
    //   releaseInspectionData.value = list;

    // };

    //getReleaseInspectionList();

    //필터링된 정보만 가져오기
    //const releaseInspectionFilterData = ref([]);

    //Filter
    const checkboxGroup5 = ref([ { name : '긴급', value : '긴급'} , { name : '일반', value : '일반'}]);
    const emptyGroup = ref([]);

    const getFilterList = async(newGroup) => {
      const list = await releaseInspectionApi.getFilterList(newGroup);
      return list;
    };

    //Barcode
    const scannedBarcode = ref();

    //전체 데이터(왼쪽) 가져오기
    const releaseInspectionData = ref([]);

    //mounted => filter, Barcode 감시
    onMounted(() => {
      //Filter 긴급, 일반 변화 감시
      watch(emptyGroup,
        (newGroup, oldGroup)=>{
          console.log("emptyGroup 객체 변경 감시");
          console.log("newGroup:", toRaw(newGroup));
          console.log("oldGroup:", toRaw(oldGroup))
          console.log(newGroup[0])
          let filterType = emptyGroup;
          let temp = []
          for(let i=0; i<newGroup.length; i++){
            temp.push(i);
          }
          console.log("temp>>",temp);

          getFilterList(newGroup).then((v)=>{
            console.log("젭알요 ㅠㅜㅜㅜㅜ");
            console.log(v);
            for(let i=0; i<v.length; i++){
              if(v[i].boxQty === 0){
                v[i].boxQty = " ";
              }
              if(v[i].releasePrintDate === null){
                v[i].releasePrintDate = " ";
              }
              if(v[i].receiptePrintDate === null){
                v[i].receiptePrintDate = " ";
              }
            }            
              releaseInspectionData.value = v;
          })

          // releaseInspectionData.value = getFilterList(newGroup).then((appData) => {
          //   return appData;
          // });
          // releaseInspectionData.value = getFilterList(newGroup);
          // console.log("^^^^^^^^^^^^^^^^^^^");
          // console.log(tt);

          //  //방법 1) collectionView에 추가하기
          //  releaseInspectionData.value.filter((item) =>{
          //    console.log("1) collectionView에 추가하기");
          //    console.log(item.category);
          //    console.log("==============");
          //    if (filterType[0] === "긴급") {
          //      console.log("긴급일 때");
          //      return item.category == "긴급";
          //    }else {
          //      return item.category == '일반';
          //    }
          //  })
        },
      );

      //scannedBarcode 감시
      watch(scannedBarcode,
        (newScannedBarcode, oldScannedBarcode)=>{
          console.log("scannedBarcode 객체 변경 감시");
          console.log("newScannedBarcode:", newScannedBarcode);
          console.log("oldScannedBarcode:", oldScannedBarcode)

          /*
           *바코드스캔에 새로운 바코드가 스캔되면 이전 바코드값은 이상이 없으므로
           *해당 바코드값 상품의 총검수수량이 1 증가
           *만약 이상이 있는 바코드일 경우(미출고 되어야할 바코드일 경우), 미출고 처리 버튼 클릭
           */



        }
      );


     })

    const tally = reactive({ clientName: "", category: 0, totalPickingQty: 10, totalInspectionQty: 0, releaseCode: 0, orderNo: 0, unRelease: 0 });

    const SelectionChanged = async(grid, e) => {
      // console.log("=======================");
      // console.log(grid.collectionView);
      // var item = grid.collectionView.currentItem;
      // console.log("============item===========");
      // console.log(item);

      console.log("범위가 제대로 나오나요?");
      console.log(grid.selectedRanges);

      console.log("첫번째 데이터");
      console.log(grid.getCellData(0, 0, false));

      let ranges = grid.selectedRanges;

      tally.totalPickingQty = 0; 
      tally.totalInspectionQty = 0;

      for(let i=0; i<ranges.length; i++){
        aggregateRange(tally, grid, ranges, i);
      }
      
      console.log("선택 결과");
      //전체 피킹수량
      console.log(tally);

      //grid.getCellData(r, c, false)

      // console.log(e._p);
      // console.log(e._p._activeCell["wj-cell-index"].panel._activeCell);
      //console.log(e._p._activeCell["wj-cell-index"]["panel"]["_rng"]["_row2"]);

      // e._p._activeCell["wj-cell-index"]["rng"]["_col1"] = 16;
      // e._p._activeCell["wj-cell-index"]["rng"]["_col2"] = 16;
      // console.log("===========바꼈니??============");
      // console.log(e._p._activeCell["wj-cell-index"]["rng"]);
    }

    function aggregateRange(tally, grid, ranges, index) {
      let rng = ranges[index];
      for(let r = rng.topRow; r<=rng.bottomRow; r++){
        for(let c = rng.leftCol; c<=rng.rightCol; c++){
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
              if(r === rng.topRow){
                if(c === 1) {
                  tally.clientName = data;
                }else if(c === 2) {
                  console.log(c, data);
                  tally.category = data;
                }else if ( c === 3 ){
                  console.log(c, data);
                  tally.releaseCode = data;
                }else if ( c === 5 ){
                  console.log(c, data);
                  tally.orderNo = data;
                }
              }

              if(c === 9){
                tally.totalPickingQty += data;
              }else if(c === 10){
                tally.totalInspectionQty += data;
              }              
          }
        }
      }
    }

    return {
      ...toRefs(state),
      onInitialized,
      releaseInspectionData,
      checkboxGroup5,
      emptyGroup,
      SelectionChanged,
      //onSelectionChanged
      tally,
      scannedBarcode,
      inspection,
      unrelease,
      scan,
      //boxBtnGroup,
      addBox,
      //boxBtnClick1,
      boxArrays,
      isActive,
      click,
      index,
      emptyBoxArrays,
      boxItemData
    }
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

</style>
