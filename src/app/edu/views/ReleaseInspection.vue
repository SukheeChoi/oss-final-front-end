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
          :selectionChanged="onSelectionChanged"
          ref="flexxx"
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
              <div class="state-item w-100">오라클 치과</div>
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
                  <input type="text" value="11" />
                </div>
              </div>
              <div class="state-item">
                <div class="w-100">*총검수수량</div>
                <div class="ow-input mr-2" style="--width:60px">
                  <input type="text" value="11" />
                </div>
              </div>
              <div class="state-item">
                <div class="w-100">*총미출고수량</div>
                <div class="ow-input mr-2" style="--width:60px">
                  <input type="text" value="11" />
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
                  <input type="text" value="C_02_002"/>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">바코드스캔</th>
              <td>
                <div class="ow-input">
                  <input type="text" value="default value"/>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">주문번호</th>
              <td>출하검수/패킹 보조가 없습니다.</td>
            </tr>
          </tbody>
        </table>
        <div class="container">
          <button class="ow-btn type-util float-right" style="float:right">미출고처리</button>
        </div>
               
      </div>

      <!-- 박스별 품목정보 -->
      <div class="item align-y-start">
        <div class="ow-flex-wrap">
          <div class="item size-fix" style="--gap-item:6px;">
            <div class="title-field">박스별품목정보</div>
          </div>
          <button class="ow-btn type-state">박스추가+</button>
        </div>
      </div>
      <div>
        <button class="ow-btn type-group active">박스1</button>
        <button class="ow-btn type-group">박스2</button>
        <button class="ow-btn type-group">박스3</button>
        <button class="ow-btn type-group">박스4</button>
        <button class="ow-btn type-group">박스5</button>
        <button class="ow-btn type-group">박스6</button>
        <button class="ow-btn type-group">박스7</button>
        <button class="ow-btn type-group">박스8</button>
        <div class="ow-grid-wrap">
          <wj-flex-grid
            headersVisibility="Column"
            class="ow-grid"><!-- :itemsSource="data" -->
            <wj-flex-grid-column :binding="'No'" :header="'No'" :width=55 />
            <wj-flex-grid-column :binding="'No'" :header="'품목명'" :width=100 />
            <wj-flex-grid-column :binding="'No'" :header="'품목코드'" :width=100 />
            <wj-flex-grid-column :binding="'No'" :header="'주문수량'" :width=65 />
            <wj-flex-grid-column :binding="'No'" :header="'피킹수량'" :width=65 />
            <wj-flex-grid-column :binding="'No'" :header="'검수수량'" :width=65>
              <wj-flex-grid-cell-template cellType="Cell">
                <div class="ow-input mr-2" style="--width:50px">
                  <input type="text" />
                </div>
              </wj-flex-grid-cell-template>            
            </wj-flex-grid-column>
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
import {format} from '@grapecity/wijmo';

export default {
  setup() {
    const state = reactive({
      flex: null,  //wj-flex-grid의 정보를 flex에 담아서 사용
      currentSelection: null,
    });
    const flexxx = ref(null);

    //grid 병합 처리 >> custom merge
    const onInitialized = (flex) => {
      console.log("flex1===========================================")
      console.log(state.flex);
      const config = {
        groupingColumns: ["clientName"],
        mergedColumns : [0,1,2,3,4,5,'releasePrintDate','boxQty',14,15,16],        
      };
      flex.mergeManager = new SimpleMergeManager(config);
      // onSelectionChanged(flex);
    };

    // update aggregates when selection changes
    function onSelectionChanged() {
      console.log("flex2===========================================")
      console.log(flex);
      currentSelection = new format("({row},{col})-({row2},{col2})", state.flex);
      console.log("currentSelection")
      console.log(currentSelection);
    }

    onSelectionChanged();

    //ref 활용해서 전체 데이터 가져오기
    const releaseInspectionData = ref([]);

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
    const releaseInspectionFilterData = ref([]);

    const getFilterList = async(newGroup) => {
      console.log("지금 들어가는 newGroup", newGroup);
      const list = await releaseInspectionApi.getFilterList(newGroup);
      return list;
    };
    
    console.log("emptyGroup==> ", emptyGroup)

    // const onSelectClick = function() {
    //   selectionMode.text = "CellRange";
    //   flex.selection = new wjGrid.CellRange(0, 0, 1, 1);
    // }

    //Filter
    const checkboxGroup5 = ref([ { name : '긴급', value : '긴급'} , { name : '일반', value : '일반'}]);
    const emptyGroup = ref([]);

    function getEmptyGroup() {
      console.log("=== emptyGroup ===");
      console.log(emptyGroup);
    }

    const s = reactive({
      item: undefined,  //wj-flex-grid의 정보를 flex에 담아서 사용
    });

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

          //방법 2) 데이터 변화할 때 정보 넘기기!
         },
       );
     })

    return {
      ...toRefs(state),
      onInitialized,
      releaseInspectionData,
      checkboxGroup5,
      emptyGroup,
      onSelectionChanged
    }
  },



  // created() {
  //   this.getReleaseInspectionList();
  // },

  // components: {
  //   WjFlexGrid,
  // },
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
/* .wj-cell.wj-align-center {
    max-height: 300px;
} */

/* .wj-cell.wj-header {
    max-height: 300px;
} */

/* .wj-header{
  height: 300px;
}

.wj-cell.wj-header.wj-align-center {
    height: 50px;
}

.wj-cell.wj-align-center {
    height: 30px;
} */


    /* .wj-header {
      color: nth($clrs-achromatic, 2);
      background-color: #fff;
      &:not(:last-child) { 
        border-right : 0 ; 
        &:after {
          content :"" ; 
          display: block;
          width: 1px ; 
          position: absolute;
          right : 0 ; top: 7px; bottom: 7px ;  
          background-color: nth($clrs-border, 1);
        }
      }
      // 헤더 정렬 클래스 ( 태그에 cssClassAll="" 로 적용 필요 )
      &.ta-c { text-align: center ; }
      &.ta-l { text-align: left ; }
      &.ta-r { text-align: right ; }
    } */
</style>
