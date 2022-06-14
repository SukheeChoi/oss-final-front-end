<template>
  <div>
    <div class="ow-grid-wrap">
      <wj-flex-grid
        headersVisibility="Column"
        selectionMode="None"
        :itemsSource="data"
        class="ow-grid"
        :autoRowHeights="true"
      >
        <wj-flex-grid-column binding="id" header="아이디" :width="200" align="center" />
        <wj-flex-grid-column binding="country" header="국가" :width="200" align="center" />
        <wj-flex-grid-column binding="sales" header="가격" width="*" cssClassAll="ta-c" />
        <wj-flex-grid-column binding="expenses" header="판매" :width="200" align="center" Class="clr-red" />
      </wj-flex-grid>
    </div>
  </div>
</template>

<script>
import WjFlexGrid from '@grapecity/wijmo.vue2.grid';
import { CollectionView } from '@grapecity/wijmo';

export default {
  components: {
    WjFlexGrid,
  },
  setup() {
    let countriesList = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    let data = new CollectionView(getData(countriesList), {});
    function getData(listOfCountries) {
      let data = [];
      for (let i = 0; i < 100; i++) {
        data.push({
          id: i,
          country: listOfCountries[i % listOfCountries.length],
          sales: Math.random() * 10000,
          expenses: Math.random() * 5000,
        });
      }
      return data;
    }
    return { data };
  },
};
</script>

<style>
.clr-red {
  color: #f60808;
}
</style>
