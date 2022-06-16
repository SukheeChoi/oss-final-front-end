<template>
<!-- <div class="item" style="--gap-item: 6px">
  <div>
    <div class="title-field">배송구분</div>
    <ow-filter-checkbox name="checkboxGp4" v-bind:items="checkboxGroup1" />
  </div>
  <div>
    <div class="title-field">배송방식</div>
    <ow-filter-checkbox name="checkboxGp4" v-bind:items="checkboxGroup2" />
  </div>
  <div>
    <div class="title-field">미출고</div>
    <ow-filter-checkbox name="checkboxGp4" v-bind:items="checkboxGroup3" />
  </div>
</div> -->

  <div class="ow-flex-wrap dir-col" style="--gap: 10px">
    <div class="item">
      <div class="ow-flex-wrap">
        <div class="item size-fix" style="--gap-item: 6px">
          <div class="title-field">현황</div>
        </div>
        <div class="item">
          <div class="state">
            <div class="state-item">
              주문 : <strong class="color-type-1">10</strong>건 (오스템
              <strong class="color-type-2">15</strong>건/협력사 <strong>14</strong>건)
            </div>
            <div class="state-item">피킹지시 : <strong>7</strong>건</div>
          </div>
        </div>
      </div>
    </div>

    <hr/>

    <div class="item">
      <div class="ow-flex-wrap item-size-content" style="--gap: 10px">

        <div class="item" style="--gap-item: 6px">
          <div>
            <div class="title-field" style="margin-right: 10px; margin-left: 5px;">배송구분</div>
            <ow-filter-checkbox name="checkboxGp4" v-bind:items="checkboxGroup1" />
          </div>
          <div>
            <div class="title-field" style="margin-right: 10px; margin-left: 5px;">배송방식</div>
            <ow-filter-checkbox name="checkboxGp4" v-bind:items="checkboxGroup2" />
          </div>
          <div>
            <div class="title-field" style="margin-right: 10px margin-left: 5px;;">미출고</div>
            <ow-filter-checkbox name="checkboxGp4" v-bind:items="checkboxGroup3" />
          </div>
<!-- 
          <div class="ow-input type-button" style="--gap-item: 6px">
            <input type="text" placeholder="입력" />
            <input type="submit" class="btn-search" />
          </div> -->
        </div>

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
    <wj-flex-grid
      headersVisibility="Column"
      allowSorting="None"
      selectionMode="None"
      class="ow-grid type-header-group"
      :itemsSource="releaseInspection_Packing_Data"
      :initialized="onInitialized"
      :allowMerging="'Cells'"
    >
      <!-- :allowResizing="Row" -->
    <!--화이팅 이라구요! 언니 힘내라구요! -->
      <!-- :loadedRows="onloadedRows" -->
      <!-- :autoGenerateColumns="false" -->
      <!-- :alternatingRowStep="0" -->
      <!-- :allowMerging="'Cells'" -->
      
      <wj-flex-grid-column-group header="출고검수/패킹" align="center">
        <wj-flex-grid-column-group binding="placingorderNo" header="출고번호" width="*" cssClassAll="ta-c border-right-sm" :allowMerging="true"/>
        <wj-flex-grid-column-group binding="itemName" header="품목명" align="left" cssClassAll="ta-c border-right-sm" />
        <wj-flex-grid-column-group binding="itemCode" header="품목코드" width="*" cssClassAll="ta-c" />
        <wj-flex-grid-column-group binding="pickingQty" header="피킹수량" width="*" cssClassAll="ta-c" />
        <wj-flex-grid-column-group binding="inspectionQty" header="검수수량" width="*" cssClassAll="ta-c" />
        <wj-flex-grid-column-group binding="packing_unrelease" header="미출고수량" width="*" cssClassAll="ta-c" />
        <wj-flex-grid-column-group binding="orderClient" header="거래처" width="*" cssClassAll="ta-c" :allowMerging="true"/>
        <wj-flex-grid-column-group binding="shippingDest" header="배송지" width="*" cssClassAll="ta-c" :allowMerging="true"/>
        <wj-flex-grid-column-group binding="shippingCat" header="배송구분" width="*" cssClassAll="ta-c" :allowMerging="true"/>
        <wj-flex-grid-column-group binding="shippingWay" header="배송방식" width="*" cssClassAll="ta-c" :allowMerging="true"/>
        <wj-flex-grid-column-group binding="packing_personincharge" header="담당자" width="*" cssClassAll="ta-c" :allowMerging="true"/>
        <wj-flex-grid-column-group binding="releaseprintDate" header="출고요청서 출력일시" width="*" cssClassAll="ta-c" multiLine="true" :allowMerging="true"/>
        <wj-flex-grid-column-group binding="transactionprintDate" header="거래명세서 출력일시" cssClassAll="ta-c" :allowMerging="true"/>
        <wj-flex-grid-column-group binding="inspectionDate" header="검수일시" width="*" cssClassAll="ta-c" :allowMerging="true"/>
        <wj-flex-grid-column-group binding="boxQty" header="Box수량" width="*" cssClassAll="ta-c" :allowMerging="true"/>
      </wj-flex-grid-column-group>

      <wj-flex-grid-column-group header="출고" align="center">
        <wj-flex-grid-column-group binding="release_personincharge" header="담당자" width="*" cssClassAll="ta-c" :allowMerging="true" />
        <wj-flex-grid-column-group binding="deliveryCompany" header="택배사" width="*" cssClassAll="ta-c" :allowMerging="true" />
        <wj-flex-grid-column-group binding="invoiceNo" header="송장번호" width="*" cssClassAll="ta-c" :allowMerging="true" />
      </wj-flex-grid-column-group>
      <wj-flex-grid-column-group binding="etc" header="비고" :width="70" align="center" cssClassAll="ta-c" :allowMerging="true"/>
    </wj-flex-grid>
  </div>

// Dummy2.vue
  <!-- <div>
    <Dummy2 :items-source="items" />
  </div> -->

</template>

<script>
import OwSearch from '../../../components/common/OwSearch.vue';
import OwSearchInput from '../../com/components/input/OwSearchInput.vue';

///
import "@grapecity/wijmo.styles/wijmo.css";
// import "bootstrap.css";
import Vue from "vue";

import * as wjCore from "@grapecity/wijmo";
import * as wjGrid from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.grid";
import Dummy2 from '../../../components/dummy/Dummy2.vue';

var __extends =
    (this && this.__extends) ||
    (function() {
        var extendStatics = function(d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                        d.__proto__ = b;
                    }) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();

var RestrictedMergeManager = (function(_super) {
    __extends(RestrictedMergeManager, _super);
    function RestrictedMergeManager() {
        return _super.call(this) || this;
    }
    RestrictedMergeManager.prototype.getMergedRange = function(p, r, c, clip) {
        if (clip === void 0) {
            clip = true;
        }
        var rng = null;
        rng = new wjGrid.CellRange(r, c);
        var pcol = c > 0 ? c - 1 : c;
        var val = p.getCellData(r, c, false);
        var pval = p.getCellData(r, pcol, false);
        while (
            rng.row > 0 &&
            p.getCellData(rng.row - 1, c, false) == val &&
            p.getCellData(rng.row - 1, pcol, false) == pval
        ) {
            rng.row--;
        }
        while (
            rng.row2 < p.rows.length - 1 &&
            p.getCellData(rng.row2 + 1, c, false) == val &&
            p.getCellData(rng.row2 + 1, pcol, false) == pval
        ) {
            rng.row2++;
        }
        if (rng.isSingleCell) {
            rng = null;
        }
        return rng;
    };
    return RestrictedMergeManager;
})(wjGrid.MergeManager);

// let App = Vue.extend({
//     name: "app",
//     data: function() {
//         return {
//             data: new wjCore.CollectionView(this.getData(), {
//                 sortDescriptions: ["customer", "country"]
//             })
//         };
//     },
//     methods: {
//         getData: function() {
//             // create some random data
//             var countries = "US,Germany,UK,Japan,Italy,Greece".split(","),
//                 customers = "Paul Smith,Susan Johnson".split(",");
//             let data = [];
//             for (var i = 0; i < 12; i++) {
//                 data.push({
//                     customer: customers[i % customers.length],
//                     country: countries[i % countries.length],
//                     downloads: Math.round(Math.random() * 20000),
//                     sales: Math.random() * 5000,
//                     expenses: Math.random() * 5000
//                 });
//             }
//             return data;
//         },
//         onInitialized: function(flexGrid) {
//             flexGrid.mergeManager = new RestrictedMergeManager();
//         }
//     }
// });

// new Vue({ render: h => h(App) }).$mount("#app");
///

function getRandomCount(i = 1500) {
  return Math.round(Math.random() * i);
}
function getVendorName(code) {
  const vendor = ITEM_VENDORS.filter((o) => o.code == code)[0];
  return vendor ? vendor.name : '';
}
function getPlacingorderNo(code) {
  console.log('code : ' + code);
  const vendor = ITEM_VENDORS.filter((o) => o.placingorderNo == code)[2];
  return vendor ? vendor.placingorderNo : -1;
}

const ITEM_VENDORS = [
  { code: 0, name: '현대바이오랜드', placingorderNo: 1 },
  { code: 1, name: 'KaVo Dental GmbH', placingorderNo: 2 },
  { code: 2, name: '엔에스케이덴탈코리아 (주)', placingorderNo: 3 },
  { code: 3, name: '(주)가나시이스', placingorderNo: 4 },
  { code: 4, name: '디메가', placingorderNo: 5 },
];

export default {
  name: 'grid-sample-header-merge',
  components: {
    OwSearch,
    OwSearchInput,
    Dummy2
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
          placingorderNo: 'C_03_002', itemName: 'CoverCap', itemCode: 'ESS50LB', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '임플라인치과', shippingDest: '임플라인치과', shippingCat: '일반', shippingWay: '합배송'
          , packing_personincharge: '이가을', releaseprintDate: '이가을\n(11-29 15:20)', transactionprintDate: '이가을 (11-29 15:20)'
          , inspectionDate: '11-29 15:45', boxQty: 2
          // 출고~/
          , release_personincharge: '이가을', deliveryCompany: '대한통운', invoiceNo: '18374650'
        }
        , {
          placingorderNo: 'C_03_002', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 3, inspectionQty: 3, packing_unrelease: 0
          , orderClient: '임플라인치과', shippingDest: '임플라인치과', shippingCat: '일반', shippingWay: '합배송'
          , packing_personincharge: '이가을', releaseprintDate: '이가을 (11-29 15:20)', transactionprintDate: '이가을 (11-29 15:20)'
          , inspectionDate: '11-29 15:45', boxQty: 2
          // 출고~/
          , release_personincharge: '이가을', deliveryCompany: '대한통운', invoiceNo: '18374650'
        }
        , {
          placingorderNo: 'E_02_001', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 5, inspectionQty: 5, packing_unrelease: 0
          , orderClient: '로얄치과', shippingDest: '로얄치과', shippingCat: '긴급', shippingWay: '오스템'
          , packing_personincharge: '김수환', releaseprintDate: '김수환 (11-29 15:12)', transactionprintDate: '김수환 (11-29 15:14)'
          , inspectionDate: '11-29 15:30', boxQty: 3
          // 출고~/
          , release_personincharge: '김수환', deliveryCompany: '우체국', invoiceNo: '38471625'
        }
        , {
          placingorderNo: 'E_02_001', itemName: 'VUSSEN(10EA)', itemCode: 'TPA0045', pickingQty: 3, inspectionQty: 3, packing_unrelease: 0
          , orderClient: '로얄치과', shippingDest: '로얄치과', shippingCat: '긴급', shippingWay: '오스템'
          , packing_personincharge: '김수환', releaseprintDate: '김수환 (11-29 15:12)', transactionprintDate: '김수환 (11-29 15:14)'
          , inspectionDate: '11-29 15:30', boxQty: 3
          // 출고~/
          , release_personincharge: '김수환', deliveryCompany: '우체국', invoiceNo: '38471625'
        }
        , {
          placingorderNo: 'E_02_001', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 1, inspectionQty: 1, packing_unrelease: 0
          , orderClient: '로얄치과', shippingDest: '로얄치과', shippingCat: '긴급', shippingWay: '오스템'
          , packing_personincharge: '김수환', releaseprintDate: '김수환 (11-29 15:12)', transactionprintDate: '김수환 (11-29 15:14)'
          , inspectionDate: '11-29 15:30', boxQty: 3
          // 출고~/
          , release_personincharge: '김수환', deliveryCompany: '우체국', invoiceNo: '38471625'
        }
        , {
          placingorderNo: 'C_03_001', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 10, inspectionQty: 10, packing_unrelease: 0
          , orderClient: '참좋은송치과', shippingDest: '참좋은기공소', shippingCat: '일반', shippingWay: '합배송'
          , packing_personincharge: '김예원', releaseprintDate: '김예원 (11-29 16:12)', transactionprintDate: '김예원 (11-29 16:14)'
          , inspectionDate: '11-29 16:30', boxQty: 4
          // 출고~/
          , release_personincharge: '김예원', deliveryCompany: '대한통운', invoiceNo: '045836156'
        }
        , {
          placingorderNo: 'C_03_001', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 15, inspectionQty: 15, packing_unrelease: 0
          , orderClient: '참좋은송치과', shippingDest: '참좋은기공소', shippingCat: '일반', shippingWay: '합배송'
          , packing_personincharge: '김예원', releaseprintDate: '김예원 (11-29 16:12)', transactionprintDate: '김예원 (11-29 16:14)'
          , inspectionDate: '11-29 16:30', boxQty: 4
          // 출고~/
          , release_personincharge: '김예원', deliveryCompany: '대한통운', invoiceNo: '045836156'
        }
        , {
          placingorderNo: 'C_03_001', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 1, inspectionQty: 1, packing_unrelease: 0
          , orderClient: '참좋은송치과', shippingDest: '참좋은기공소', shippingCat: '일반', shippingWay: '합배송'
          , packing_personincharge: '김예원', releaseprintDate: '김예원 (11-29 16:12)', transactionprintDate: '김예원 (11-29 16:14)'
          , inspectionDate: '11-29 16:30', boxQty: 4
          // 출고~/
          , release_personincharge: '김예원', deliveryCompany: '대한통운', invoiceNo: '045836156'
        }
        , {
          placingorderNo: 'C_03_001', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 3, inspectionQty: 3, packing_unrelease: 0
          , orderClient: '참좋은송치과', shippingDest: '참좋은기공소', shippingCat: '일반', shippingWay: '합배송'
          , packing_personincharge: '김예원', releaseprintDate: '김예원 (11-29 16:12)', transactionprintDate: '김예원 (11-29 16:14)'
          , inspectionDate: '11-29 16:30', boxQty: 4
          // 출고~/
          , release_personincharge: '김예원', deliveryCompany: '대한통운', invoiceNo: '045836156'
        }
        , {
          placingorderNo: 'C_03_001', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 1, inspectionQty: 1, packing_unrelease: 0
          , orderClient: '참좋은송치과', shippingDest: '참좋은기공소', shippingCat: '일반', shippingWay: '합배송'
          , packing_personincharge: '김예원', releaseprintDate: '김예원 (11-29 16:12)', transactionprintDate: '김예원 (11-29 16:14)'
          , inspectionDate: '11-29 16:30', boxQty: 4
          // 출고~/
          , release_personincharge: '김예원', deliveryCompany: '대한통운', invoiceNo: '045836156'
        }
        , {
          placingorderNo: 'C_03_001', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 1, inspectionQty: 1, packing_unrelease: 0
          , orderClient: '참좋은송치과', shippingDest: '참좋은기공소', shippingCat: '일반', shippingWay: '합배송'
          , packing_personincharge: '김예원', releaseprintDate: '김예원 (11-29 16:12)', transactionprintDate: '김예원 (11-29 16:14)'
          , inspectionDate: '11-29 16:30', boxQty: 4
          // 출고~/
          , release_personincharge: '김예원', deliveryCompany: '대한통운', invoiceNo: '045836156'
        }
        , {
          placingorderNo: 'C_03_001', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '참좋은송치과', shippingDest: '참좋은기공소', shippingCat: '일반', shippingWay: '합배송'
          , packing_personincharge: '김예원', releaseprintDate: '김예원 (11-29 16:12)', transactionprintDate: '김예원 (11-29 16:14)'
          , inspectionDate: '11-29 16:30', boxQty: 4
          // 출고~/
          , release_personincharge: '김예원', deliveryCompany: '대한통운', invoiceNo: '045836156'
        }
        ///
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
        , {
          placingorderNo: 'C_03_003', itemName: 'TS 111 SA Fixture_NoMount', itemCode: 'TS3S508S', pickingQty: 2, inspectionQty: 2, packing_unrelease: 0
          , orderClient: '한숲치과', shippingDest: '한숲치과', shippingCat: '긴급', shippingWay: '일반'
          , packing_personincharge: '신현주', releaseprintDate: '신현주 (11-29 16:15)', transactionprintDate: '신현주 (11-29 16:21)'
          , inspectionDate: '11-29 16:47', boxQty: 8
          // 출고~/
          , release_personincharge: '신현주', deliveryCompany: '우체국', invoiceNo: '92846255'
        }
      ]
      , items: [
          { a: 'a', b: 'b1', c: 'c1' },
          { a: 'a', b: 'b1', c: 'c1' },
          { a: 'a', b: 'b2', c: 'c1' },
          { a: 'b', b: 'b2', c: 'c1' },
          { a: 'b', b: 'b3', c: 'c1' },
          { a: 'b', b: 'b3', c: 'c1' },
      ]
    };
  },
  methods: {
    getData() {
      let data = ITEM_VENDORS.reduce(
        (acc, cur) => [
          ...acc,
          ...[
            {
              ...cur,
              ...{
                placingorderNo: getPlacingorderNo(),
                release_personincharge: getRandomCount(),
                count: getRandomCount(),
                price: getRandomCount(),
                mItemCount: 0,
                mCount: 0,
                mPrice: 0,
                etc: getVendorName(cur.etc),
              },
            },
          ],
        ],
        []
      );

      data.splice(
        0,
        0,
        data.reduce(
          (acc, cur) => {
            Object.keys(cur).forEach((k) => {
              if (k !== 'vendor') acc[k] += cur[k];
            });
            return acc;
          },
          { vendor: '전체', itemCount: 0, count: 0, price: 0, mItemCount: 0, mCount: 0, mPrice: 0 }
        )
      );

      return data;
    },
    onloadedRows(grid) {
      console.log('onloadedRows in', grid.rows[0]);
      if (grid.rows && grid.rows.length) {
        grid.rows[0].cssClass = 'cell-total';
      }
    },
  },
  created() {
    this.data = this.getData();
  },
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
