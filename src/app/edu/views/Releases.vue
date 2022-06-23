<template>
  <div class="ow-flex-wrap dir-col" style="--gap: 10px">
    <!-- <div class="item"> -->
      <div class="ow-flex-wrap item-size-content">
        <div class="item size-fix" style="--gap-item: 6px">
          <div class="title-field">현황</div>
        </div>
        <div class="item">
          <div class="state">
            <div class="state-item">주문 : <strong>10</strong>건</div>
            <div class="state-item">피킹지시 : <strong>10</strong>건</div>
            <div class="state-item">출고검수/패킹 : <strong>5</strong>건</div>
            <div class="state-item color-type-1">미출고 : <strong class="color-type-1">0</strong>건</div>
          </div>
        </div>

        <div class="item size-fix" style="--gap-item: 6px">
          <div class="title-field">배송구분</div>
        </div>
        <div class="item">
          <div class="state">
            <div class="state-item">
              출고검수(긴급/일반) : <strong>5</strong>건 (<strong>3</strong>건/<strong>2</strong>건)
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->

    <hr />

    <div class="item">
      <div class="ow-flex-wrap item-size-content">
        <!-- <div class="ow-flex-wrap item-size-content" style="--gap: 10px"> -->
        <!-- <div class="item"> -->
          <div>
            <div class="title-field" style="margin-right: 10px; margin-left: 5px">배송구분</div>
            <ow-filter-checkbox name="checkboxGp4" v-bind:items="checkboxGroup1" />
          </div>
          <div>
            <div class="title-field" style="margin-right: 10px; margin-left: 5px">배송방식</div>
            <ow-filter-checkbox name="checkboxGp4" v-bind:items="checkboxGroup2" />
          </div>
          <div>
            <div class="title-field" style="margin-right: 10px; margin-left: 5px">미출고</div>
            <ow-filter-checkbox name="checkboxGp4" v-bind:items="checkboxGroup3" />
          </div>

          <!-- <div class="ow-flex-wrap item-size-content" style="--gap: 10px"> -->

          <div class="item align-to-right" style="--gap-item: 6px">
            <div class="title-field">출고검수/패킹담당자</div>
            <div class="ow-select" style="--width: 97px">
              <ow-select name="" id="">
                <option value="200">200건</option>
                <option value="500">500건</option>
                <option value="1000">1000건</option>
              </ow-select>
            </div>
            <div class="title-field">검색</div>
            <div class="ow-select" style="--width: 97px">
              <ow-select name="" id="">
                <option value="200">200건</option>
                <option value="500">500건</option>
                <option value="1000">1000건</option>
              </ow-select>
            </div>
            <div class="ow-input type-button" style="--width: 200px">
              <input type="text" placeholder="검색어를 입력하세요." />
              <input type="submit" class="btn-search" />
            </div>
          </div>
          <!-- </div> -->

          <!-- 
          <div class="ow-input type-button" style="--gap-item: 6px">
            <input type="text" placeholder="입력" />
            <input type="submit" class="btn-search" />
          </div> -->
        <!-- </div> -->

        <!-- <div class="item" style="--gap-item: 6px">
          <div class="title-field">보기</div>
          <div class="checkbox-group has-btn">
            <button type="button" class="btn-check-all">전체</button>
            <div class="ow-checkbox">
              <input type="checkbox" id="ow-chk4" />
              <label for="ow-chk4">오스템 상품</label>
            </div>
            <div class="ow-checkbox">
              <input type="checkbox" id="ow-chk5" checked />
              <label for="ow-chk5">협력사상품</label>
            </div>
          </div>
        </div>
        <div class="item" style="--gap-item: 6px">
          <div class="title-field">배송구분</div>
          <div class="checkbox-group has-btn">
            <button type="button" class="btn-check-all">전체</button>
            <div class="ow-checkbox">
              <input type="checkbox" id="ow-chk6" />
              <label for="ow-chk6">긴급</label>
            </div>
            <div class="ow-checkbox">
              <input type="checkbox" id="ow-chk7" />
              <label for="ow-chk7">일반(영업지점)</label>
            </div>
            <div class="ow-checkbox">
              <input type="checkbox" id="ow-chk8" />
              <label for="ow-chk8">일반(거래처)</label>
            </div>
          </div>
        </div>

        
        <div class="item align-to-right" style="--gap-item: 6px">
          <div class="title-field">지점별 보기</div>
          <button class="ow-btn type-flat-base">지점선택(전체)</button>
        </div>
        <div class="item-bar size-small" style="--gap-bar: 0px"></div>
        <div class="item" style="--gap-item: 6px">
          <div class="title-field">주문수보기</div>
          <div class="ow-select">
            <select name="" id="">
              <option value="" selected hidden>선택</option>
              <option value="200">200건</option>
              <option value="500">500건</option>
              <option value="1000">1000건</option>
            </select>
          </div>
          <div class="ow-checkbox">
            <input type="checkbox" id="ow-chk1" />
            <label for="ow-chk1">재고없음 제외</label>
          </div>
        </div>
        <div class="item-bar size-small" style="--gap-bar: 0px"></div>
        <div class="item" style="--gap-item: 6px">
          <div class="title-field">검색</div>
          <div class="ow-select" style="--width: 97px">
            <select name="" id="">
              <option value="" selected hidden>선택</option>
              <option value="200">200건</option>
              <option value="500">500건</option>
              <option value="1000">1000건</option>
            </select>
          </div>
          <div class="ow-input type-button" style="--width: 200px">
            <input type="text" placeholder="검색어를 입력하세요." />
            <input type="submit" class="btn-search" />
          </div>
        </div> -->
      </div>
    </div>
  </div>

  <div class="ow-grid-wrap">
    <!-- <ow-grid> -->
    <wj-flex-grid
      headersVisibility="Column"
      allowSorting="None"
      selectionMode="None"
      class="ow-grid type-header-group"
      :items-source="releaseInspection_Packing_Data"
      :initialized="onInitialized"
      :allowMerging="'Cells'"
      style="display: flex"
    >
      <!-- :itemsSource="releaseInspection_Packing_Data" -->
      <!-- :allowResizing="Row" -->
      <!--화이팅 이라구요! 언니 힘내라구요! -->
      <!-- :loadedRows="onloadedRows" -->
      <!-- :autoGenerateColumns="false" -->
      <!-- :alternatingRowStep="0" -->
      <!-- :allowMerging="'Cells'" -->
      <!-- :autoRowHeights="true" -->
      <!-- 출고검수/패킹 탭 -->
      <wj-flex-grid-column-group header="출고검수/패킹" align="center" cssClassAll="border-right-sm">
        <wj-flex-grid-column-group
          binding="placingorderNo"
          header="출고번호"
          align="center"
          :width="85"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group binding="itemName" header="품목명" align="center" cssClassAll="ta-c border-right-sm">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell" align="left">
            <span align="left" style="justify-content: flex-start"> {{ cell.item['itemName'] || '-' }} </span><br />
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column-group>
        <wj-flex-grid-column-group
          binding="itemCode"
          header="품목코드"
          align="center"
          :width="110"
          cssClassAll="ta-c border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="pickingQty"
          header="피킹수량"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="inspectionQty"
          header="검수수량"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="packing_unrelease"
          header="미출고수량"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
        />
        <wj-flex-grid-column-group
          binding="orderClient"
          header="거래처"
          align="center"
          :width="100"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="shippingDest"
          header="배송지"
          align="center"
          :width="100"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="shippingCat"
          header="배송구분"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="shippingWay"
          header="배송방식"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="packing_personincharge"
          header="담당자"
          align="center"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="releaseprintDate"
          header="출고요청서 출력일시"
          align="center"
          :width="110"
          cssClassAll="ta-c border-right-sm"
          multiLine="true"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="transactionprintDate"
          header="거래명세서 출력일시"
          align="center"
          :width="110"
          cssClassAll="ta-c border-right-sm"
          multiLine="true"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="inspectionDate"
          header="검수일시"
          align="center"
          :width="100"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="boxQty"
          header="Box수량"
          width="*"
          cssClassAll="ta-c"
          :allowMerging="true"
        />
      </wj-flex-grid-column-group>
      <!-- 출고 탭 -->
      <wj-flex-grid-column-group header="출고" align="center">
        <wj-flex-grid-column-group
          binding="release_personincharge"
          header="담당자"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="deliveryCompany"
          header="택배사"
          width="*"
          cssClassAll="ta-c border-right-sm"
          :allowMerging="true"
        />
        <wj-flex-grid-column-group
          binding="invoiceNo"
          header="송장번호"
          width="*"
          cssClassAll="ta-c"
          :allowMerging="true"
        />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group
        binding="etc"
        header="비고"
        align="center"
        width="*"
        cssClassAll="ta-c"
        :allowMerging="true"
      >
        <!-- <wj-flex-grid-column-group binding="etc" :width="70" align="center" cssClassAll="ta-c" :allowMerging="true"/> -->
      </wj-flex-grid-column-group>
    </wj-flex-grid>
    <!-- </ow-grid> -->
  </div>
</template>

<script>
import OwSearch from '../../../components/common/OwSearch.vue';
import OwSearchInput from '../../com/components/input/OwSearchInput.vue';
import afterPickingApi from '@/api/afterPickingApi.js';
// 셀 병합 기준 조절 위함.
import { SimpleMergeManager } from '@/utils/wijmo.grid';
import { ref, reactive, toRefs } from 'vue';

function getRandomCount(i = 1500) {
  return Math.round(Math.random() * i);
}
function getVendorName(code) {
  const vendor = ITEM_VENDORS.filter((o) => o.code == code)[0];
  return vendor ? vendor.name : '';
}

const ITEM_VENDORS = [
  { code: 0, name: '현대바이오랜드', placingorderNo: 1 },
  { code: 1, name: 'KaVo Dental GmbH', placingorderNo: 2 },
  { code: 2, name: '엔에스케이덴탈코리아 (주)', placingorderNo: 3 },
  { code: 3, name: '(주)가나시이스', placingorderNo: 4 },
  { code: 4, name: '디메가', placingorderNo: 5 },
];

export default {
  name: 'releaseInspection_packing',
  setup() {
    const afterPickingList = ref([]);
    // 리스트 전체 조회.
    const getAfterPickingList = async () => {
      const result = await afterPickingApi.getAfterPickingList()
        .then((result) => {
          console.log('getAfterPickingList - JSON.stringify(result) : ' + JSON.stringify(result));
          afterPickingList.value = result.list;
          console.log('afterPickingList.value.length : ' + afterPickingList.value.length);
          // 출고번호
          console.log('afterPickingList.value[0]["release"]["releaseNo"] : ' + afterPickingList.value[0]["release"]["releaseNo"]);
          // 품목명
          console.log('afterPickingList.value[0]["item"]["itemName"] : ' + afterPickingList.value[0]["item"]["itemName"]);
          // 품목코드
          console.log('afterPickingList.value[0]["item"]["itemCode"] : ' + afterPickingList.value[0]["item"]["itemCode"]);
          // 피킹수량
          console.log('afterPickingList.value[0]["picking"]["pickingQty"] : ' + afterPickingList.value[0]["picking"]["pickingQty"]);
          // 검수수량
          console.log('afterPickingList.value[0]["releaseInspectionQuantity"] : ' + afterPickingList.value[0]["releaseInspectionQuantity"]);
          // 출고검수 - 미출고수량
          console.log('afterPickingList.value[0]["unReleased"] : ' + afterPickingList.value[0]["unReleased"]);
          // 패킹 - 미출고수량
          console.log('afterPickingList.value[0]["packing"]["unrelease"] : ' + afterPickingList.value[0]["packing"]["unrelease"]);
          // 거래처
          console.log('afterPickingList.value[0]["vendor"]["vendorName"] : ' + afterPickingList.value[0]["vendor"]["vendorName"]);
          // 배송지
          console.log('afterPickingList.value[0]["order"]["shippingDestination"] : ' + afterPickingList.value[0]["order"]["shippingDestination"]);
          // 배송구분
          console.log('afterPickingList.value[0]["order"]["shippingCategory"] : ' + afterPickingList.value[0]["order"]["shippingCategory"]);
          // 배송방식
          console.log('afterPickingList.value[0]["order"]["shippingWay"] : ' + afterPickingList.value[0]["order"]["shippingWay"]);
          // 출고검수 - 담당자
          console.log('afterPickingList.value[0]["employeeName"] : ' + afterPickingList.value[0]["employeeName"]);
          // 출고요청서 출력일시
          console.log('afterPickingList.value[0]["releasePrintDate"] : ' + afterPickingList.value[0]["releasePrintDate"]);
          // 거래명세서 출력일시
          console.log('afterPickingList.value[0]["receiptePrintDate"] : ' + afterPickingList.value[0]["receiptePrintDate"]);
          // 검수일시
          console.log('afterPickingList.value[0]["releaseInspectionDate"] : ' + afterPickingList.value[0]["releaseInspectionDate"]);
          // 출고 - 담당자
          console.log('afterPickingList.value[0]["release"]["employeeName"] : ' + afterPickingList.value[0]["release"]["employeeName"]);
          // 택배사
          console.log('afterPickingList.value[0]["release"]["shippingCompany"] : ' + afterPickingList.value[0]["release"]["shippingCompany"]);
          // 송장번호
          console.log('afterPickingList.value[0]["release"]["invoiceCode"] : ' + afterPickingList.value[0]["release"]["invoiceCode"]);
          // 출고검수 - 비고
          console.log('afterPickingList.value[0]["releaseInspectionNote"] : ' + afterPickingList.value[0]["releaseInspectionNote"]);
          // 패킹 - 비고
          console.log('afterPickingList.value[0]["packing"]["note"] : ' + afterPickingList.value[0]["packing"]["note"]);
          // 출고 - 비고
          console.log('afterPickingList.value[0]["release"]["note"] : ' + afterPickingList.value[0]["release"]["note"]);
        });
      return result;
    };
    getAfterPickingList();

    const state = reactive({
      flex: undefined,
      //
    });

    const onInitialized = (flex) => {
      const config = {
        groupingColumns: [0],
        mergedColumns: [0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      };

      flex.mergeManager = new SimpleMergeManager(config);
    };
    return {
      ...toRefs(state),
      onInitialized,
    };

  },

  components: {
    // OwSearch,
    // OwSearchInput
  },
  data() {
    return {
      data: [],
      checkboxGroup1: [
        { name: '긴급', checked: true },
        { name: '일반', checked: true },
      ],
      checkboxGroup2: [
        { name: '오스템', checked: true },
        { name: '합배송', checked: true },
      ],
      checkboxGroup3: [
        { name: '출고', checked: true },
        { name: '미출고', checked: true },
      ],
      releaseInspection_Packing_Data: [
        {
          // 출고검수/패킹~
          placingorderNo: 'C_03_002',
          itemName: 'CoverCap',
          itemCode: 'ESS50LB',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '임플라인치과',
          shippingDest: '임플라인치과',
          shippingCat: '일반',
          shippingWay: '합배송',
          packing_personincharge: '이가을',
          releaseprintDate: '이가을\n(11-29 15:20)',
          transactionprintDate: '이가을\n(11-29 15:20)',
          inspectionDate: '11-29 15:45',
          boxQty: 2,
          // 출고~/
          release_personincharge: '이가을',
          deliveryCompany: '대한통운',
          invoiceNo: '18374650',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_002',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 3,
          inspectionQty: 3,
          packing_unrelease: 0,
          orderClient: '임플라인치과',
          shippingDest: '임플라인치과',
          shippingCat: '일반',
          shippingWay: '합배송',
          packing_personincharge: '이가을',
          releaseprintDate: '이가을\n(11-29 15:20)',
          transactionprintDate: '이가을\n(11-29 15:20)',
          inspectionDate: '11-29 15:45',
          boxQty: 2,
          // 출고~/
          release_personincharge: '이가을',
          deliveryCompany: '대한통운',
          invoiceNo: '18374650',
          etc: ' '
        },
        {
          placingorderNo: 'E_02_001',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 5,
          inspectionQty: 5,
          packing_unrelease: 0,
          orderClient: '로얄치과',
          shippingDest: '로얄치과',
          shippingCat: '긴급',
          shippingWay: '오스템',
          packing_personincharge: '김수환',
          releaseprintDate: '김수환\n(11-29 15:12)',
          transactionprintDate: '김수환\n(11-29 15:14)',
          inspectionDate: '11-29 15:30',
          boxQty: 3,
          // 출고~/
          release_personincharge: '김수환',
          deliveryCompany: '우체국',
          invoiceNo: '38471625',
          etc: ' '
        },
        {
          placingorderNo: 'E_02_001',
          itemName: 'VUSSEN(10EA)',
          itemCode: 'TPA0045',
          pickingQty: 3,
          inspectionQty: 3,
          packing_unrelease: 0,
          orderClient: '로얄치과',
          shippingDest: '로얄치과',
          shippingCat: '긴급',
          shippingWay: '오스템',
          packing_personincharge: '김수환',
          releaseprintDate: '김수환\n(11-29 15:12)',
          transactionprintDate: '김수환\n(11-29 15:14)',
          inspectionDate: '11-29 15:30',
          boxQty: 3,
          // 출고~/
          release_personincharge: '김수환',
          deliveryCompany: '우체국',
          invoiceNo: '38471625',
          etc: ' '
        },
        {
          placingorderNo: 'E_02_001',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 1,
          inspectionQty: 1,
          packing_unrelease: 0,
          orderClient: '로얄치과',
          shippingDest: '로얄치과',
          shippingCat: '긴급',
          shippingWay: '오스템',
          packing_personincharge: '김수환',
          releaseprintDate: '김수환\n(11-29 15:12)',
          transactionprintDate: '김수환\n(11-29 15:14)',
          inspectionDate: '11-29 15:30',
          boxQty: 3,
          // 출고~/
          release_personincharge: '김수환',
          deliveryCompany: '우체국',
          invoiceNo: '38471625',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_001',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 10,
          inspectionQty: 10,
          packing_unrelease: 0,
          orderClient: '참좋은송치과',
          shippingDest: '참좋은기공소',
          shippingCat: '일반',
          shippingWay: '합배송',
          packing_personincharge: '김예원',
          releaseprintDate: '김예원\n(11-29 16:12)',
          transactionprintDate: '김예원\n(11-29 16:14)',
          inspectionDate: '11-29 16:30',
          boxQty: 4,
          // 출고~/
          release_personincharge: '김예원',
          deliveryCompany: '대한통운',
          invoiceNo: '045836156',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_001',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 15,
          inspectionQty: 15,
          packing_unrelease: 0,
          orderClient: '참좋은송치과',
          shippingDest: '참좋은기공소',
          shippingCat: '일반',
          shippingWay: '합배송',
          packing_personincharge: '김예원',
          releaseprintDate: '김예원\n(11-29 16:12)',
          transactionprintDate: '김예원\n(11-29 16:14)',
          inspectionDate: '11-29 16:30',
          boxQty: 4,
          // 출고~/
          release_personincharge: '김예원',
          deliveryCompany: '대한통운',
          invoiceNo: '045836156',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_001',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 1,
          inspectionQty: 1,
          packing_unrelease: 0,
          orderClient: '참좋은송치과',
          shippingDest: '참좋은기공소',
          shippingCat: '일반',
          shippingWay: '합배송',
          packing_personincharge: '김예원',
          releaseprintDate: '김예원\n(11-29 16:12)',
          transactionprintDate: '김예원\n(11-29 16:14)',
          inspectionDate: '11-29 16:30',
          boxQty: 4,
          // 출고~/
          release_personincharge: '김예원',
          deliveryCompany: '대한통운',
          invoiceNo: '045836156',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_001',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 3,
          inspectionQty: 3,
          packing_unrelease: 0,
          orderClient: '참좋은송치과',
          shippingDest: '참좋은기공소',
          shippingCat: '일반',
          shippingWay: '합배송',
          packing_personincharge: '김예원',
          releaseprintDate: '김예원\n(11-29 16:12)',
          transactionprintDate: '김예원\n(11-29 16:14)',
          inspectionDate: '11-29 16:30',
          boxQty: 4,
          // 출고~/
          release_personincharge: '김예원',
          deliveryCompany: '대한통운',
          invoiceNo: '045836156',
          etc: ''
        },
        {
          placingorderNo: 'C_03_001',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 1,
          inspectionQty: 1,
          packing_unrelease: 0,
          orderClient: '참좋은송치과',
          shippingDest: '참좋은기공소',
          shippingCat: '일반',
          shippingWay: '합배송',
          packing_personincharge: '김예원',
          releaseprintDate: '김예원\n(11-29 16:12)',
          transactionprintDate: '김예원\n(11-29 16:14)',
          inspectionDate: '11-29 16:30',
          boxQty: 4,
          // 출고~/
          release_personincharge: '김예원',
          deliveryCompany: '대한통운',
          invoiceNo: '045836156',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_001',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 1,
          inspectionQty: 1,
          packing_unrelease: 0,
          orderClient: '참좋은송치과',
          shippingDest: '참좋은기공소',
          shippingCat: '일반',
          shippingWay: '합배송',
          packing_personincharge: '김예원',
          releaseprintDate: '김예원\n(11-29 16:12)',
          transactionprintDate: '김예원\n(11-29 16:14)',
          inspectionDate: '11-29 16:30',
          boxQty: 4,
          // 출고~/
          release_personincharge: '김예원',
          deliveryCompany: '대한통운',
          invoiceNo: '045836156',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_001',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '참좋은송치과',
          shippingDest: '참좋은기공소',
          shippingCat: '일반',
          shippingWay: '합배송',
          packing_personincharge: '김예원',
          releaseprintDate: '김예원\n(11-29 16:12)',
          transactionprintDate: '김예원\n(11-29 16:14)',
          inspectionDate: '11-29 16:30',
          boxQty: 4,
          // 출고~/
          release_personincharge: '김예원',
          deliveryCompany: '대한통운',
          invoiceNo: '045836156',
          etc: ' '
        },
        ///
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
        {
          placingorderNo: 'C_03_003',
          itemName: 'TS 111 SA Fixture_NoMount',
          itemCode: 'TS3S508S',
          pickingQty: 2,
          inspectionQty: 2,
          packing_unrelease: 0,
          orderClient: '한숲치과',
          shippingDest: '한숲치과',
          shippingCat: '일반',
          shippingWay: '일반',
          packing_personincharge: '신현주',
          releaseprintDate: '신현주\n(11-29 16:15)',
          transactionprintDate: '신현주\n(11-29 16:21)',
          inspectionDate: '11-29 16:47',
          boxQty: 8,
          // 출고~/
          release_personincharge: '신현주',
          deliveryCompany: '우체국',
          invoiceNo: '92846255',
          etc: ' '
        },
      ],
    };
  },

  // methods: {
  //   getData() {
  //     let data = ITEM_VENDORS.reduce(
  //       (acc, cur) => [
  //         ...acc,
  //         ...[
  //           {
  //             ...cur,
  //             ...{
  //               placingorderNo: getPlacingorderNo(),
  //               release_personincharge: getRandomCount(),
  //               count: getRandomCount(),
  //               price: getRandomCount(),
  //               mItemCount: 0,
  //               mCount: 0,
  //               mPrice: 0,
  //               etc: getVendorName(cur.etc),
  //             },
  //           },
  //         ],
  //       ],
  //       []
  //     );

  //     data.splice(
  //       0,
  //       0,
  //       data.reduce(
  //         (acc, cur) => {
  //           Object.keys(cur).forEach((k) => {
  //             if (k !== 'vendor') acc[k] += cur[k];
  //           });
  //           return acc;
  //         },
  //         { vendor: '전체', itemCount: 0, count: 0, price: 0, mItemCount: 0, mCount: 0, mPrice: 0 }
  //       )
  //     );

  //     return data;
  //   },
  //   onloadedRows(grid) {
  //     console.log('onloadedRows in', grid.rows[0]);
  //     if (grid.rows && grid.rows.length) {
  //       grid.rows[0].cssClass = 'cell-total';
  //     }
  //   },
  // },
  // created() {
  //   this.data = this.getData();
  // },
};
</script>

<style lang="scss">
.ow-grid {
  .wj-cell {
    &.clr-red {
      color: #f60808;
    }
  }
}
</style>

<style>
/* use flex display to center-align cells vertically */
.wj-flexgrid .wj-cell {
  display: flex;
  align-items: center;
}
.wj-flexgrid .wj-cell.wj-align-left {
  justify-content: flex-start;
}
.wj-flexgrid .wj-cell.wj-align-right {
  justify-content: flex-end;
}

.wj-flexgrid .wj-cell.wj-align-center {
  justify-content: center;
}

.span.align-left {
  justify-content: flex-start;
}
</style>
