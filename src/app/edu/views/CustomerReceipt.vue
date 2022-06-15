<template>
  <div>
    <div class="row mb-4">
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title">주문</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item">계획 대비 실적 달성률</div>
            <div class="item">
              <!-- <approval-grid :transportData="transportData" ref="animateEvent" /> -->
              <progress :value="85" max="100">{{ value }}</progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="item align-to-right">
              1,694건(<strong class="color-type-1">잔여<span>300</span>건</strong>/<span>미출고6건</span>)
            </div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="item align-to-right">1,000건</div>
          </div>
        </div>
      </div>
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title">패킹</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item">계획 대비 실적 달성률</div>
            <div class="item">
              <!-- <approval-grid :transportData="transportData" ref="animateEvent" /> -->
              <progress :value="85" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="item align-to-right">1,694건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="item align-to-right">1,000건</div>
          </div>
        </div>
      </div>
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title">출고검수/패킹</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item">계획 대비 실적 달성률</div>
            <div class="item">
              <!-- <approval-grid :transportData="transportData" ref="animateEvent" /> -->
              <progress :value="85" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="item align-to-right">1,694건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="item align-to-right">1,000건</div>
          </div>
        </div>
      </div>
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title">출고</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item">계획 대비 실적 달성률</div>
            <div class="item">
              <!-- <approval-grid :transportData="transportData" ref="animateEvent" /> -->
              <progress :value="85" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="item align-to-right">1,694건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="item align-to-right">1,000건</div>
          </div>
        </div>
      </div>
      <div class="ow-panel">
        <div class="ow-panel-header">
          <div class="ow-panel-title">택배사 인계</div>
        </div>
        <div class="ow-panel-body">
          <div class="ow-flex-wrap">
            <div class="item">계획 대비 실적 달성률</div>
            <div class="item">
              <!-- <approval-grid :transportData="transportData" ref="animateEvent" /> -->
              <progress :value="85" max="100"></progress>
            </div>
          </div>
          <hr />
          <div class="ow-flex-wrap">
            <div class="item">계획</div>
            <div class="item align-to-right">1,694건</div>
          </div>
          <div class="ow-flex-wrap">
            <div class="item">실적</div>
            <div class="item align-to-right">1,000건</div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="item mt-4 mb-4">
      <div class="ow-flex-wrap item-size-content" style="--gap: 10px">
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
              <label for="ow-chk7">일반</label>
            </div>
          </div>
        </div>
        <div class="item" style="--gap-item: 6px">
          <div class="title-field">단계</div>
          <div class="ow-filter">
            <ul class="ow-filter-list">
              <li>
                <input type="radio" id="btn-rd-1" name="btn-rd-group" checked /><label
                  class="ow-filter-button"
                  for="btn-rd-1"
                  >전체</label
                >
              </li>
              <li>
                <input type="radio" id="btn-rd-2" name="btn-rd-group" /><label class="ow-filter-button" for="btn-rd-2"
                  >주문확인</label
                >
              </li>
              <li>
                <input type="radio" id="btn-rd-3" name="btn-rd-group" /><label class="ow-filter-button" for="btn-rd-3"
                  >피킹</label
                >
              </li>
              <li>
                <input type="radio" id="btn-rd-4" name="btn-rd-group" /><label class="ow-filter-button" for="btn-rd-4"
                  >출고검수</label
                >
              </li>
              <li>
                <input type="radio" id="btn-rd-5" name="btn-rd-group" /><label class="ow-filter-button" for="btn-rd-5"
                  >출고</label
                >
              </li>
              <li>
                <input type="radio" id="btn-rd-5" name="btn-rd-group" /><label class="ow-filter-button" for="btn-rd-5"
                  >택배사 인계</label
                >
              </li>
            </ul>
          </div>
          <div class="ow-checkbox">
            <input type="checkbox" id="ow-chk1" />
            <label for="ow-chk1">미출고만 보기</label>
          </div>
        </div>
        <div class="item align-to-right" style="--gap-item: 6px">
          <div class="title-field">검색</div>
          <div class="ow-select" style="--width: 97px">
            <select name="" id="">
              <option value="" selected hidden>선택</option>
              <option value="주문번호">주문번호</option>
            </select>
          </div>
          <div class="ow-input type-button" style="--width: 200px">
            <input type="text" placeholder="검색어를 입력하세요." />
            <input type="submit" class="btn-search" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="ow-grid-wrap">
        <ow-n-grid :n="8" headersVisibility="Column" :itemsSource="data" :autoRowHeights="true">
          <wj-flex-grid-column binding="client" header="거래처" :width="80" align="center" />
          <wj-flex-grid-column binding="level" header="처리단계" :width="120" align="center" isReadOnly="true">
            <wj-flex-grid-cell-template cellType="Cell" let-cell="cell">
              <span class="ow-tag type-category"><i class="b">주</i></span>
              <span class="ow-tag type-category"><i class="d">피</i></span>
              <span class="ow-tag type-category"><i class="s">검</i></span>
              <span class="ow-tag type-category"><i class="x">출</i></span>
              <span class="ow-tag type-category"><i class="m">인</i></span>
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>
        </ow-n-grid>
      </div>
    </div>
  </div>
</template>

<script>
import OwNGrid from '@/components/grid/new/OwNGrid';
import OwFilterCheckbox from '@/components/common/OwFilterCheckbox.vue';
import { CollectionView } from '@grapecity/wijmo';

export default {
  components: {
    OwNGrid,
    OwFilterCheckbox,
  },
  data() {
    return {
      shippingCheckbox: [
        { name: '긴급', checked: true },
        { name: '일반', checked: true },
      ],
    };
  },
  setup() {
    let data = new CollectionView(getData(), {});
    function getData() {
      let data = [];
      for (let i = 0; i < 20; i++) {
        data.push({
          client: '현대',
          level: '주문',
        });
      }
      for (let i = 0; i < 10; i++) {
        data.push({
          client: '에덴',
          level: '주문',
        });
      }
      return data;
    }

    return {
      data,
    };
  },
};
</script>

<style>
progress {
  display: block; /* default: inline-block */
  border: 0 none;
  border-radius: 0;
  background: gainsboro;
}
progress::-moz-progress-bar {
  border-radius: 0;
  background: green;
}
/* webkit
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  progress {
    height: 25px;
  }
} */
progress::-webkit-progress-bar {
  background: transparent;
}
progress::-webkit-progress-value {
  border-radius: 0;
  background: green;
}
</style>
