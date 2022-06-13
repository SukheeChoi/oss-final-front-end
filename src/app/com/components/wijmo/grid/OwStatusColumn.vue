<template>
  <template :initialized="initialized">
    <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
      <template v-if="cell.item.rowStatus == 'C'">
        <span class="wj-glyph-asterisk"/>
      </template>
      <template v-if="cell.item.rowStatus == 'U'">
        <span class="wj-glyph-pencil"/>
      </template>
    </wj-flex-grid-cell-template>
  </template>
</template>
<script>
import { WjFlexGridColumn } from '@grapecity/wijmo.vue2.grid';

export default {
  name: 'OwStatusColumn',
  extends: WjFlexGridColumn,
  setup() {
    const initialized = (option) => {
      option.align = 'center';
      option.isReadOnly = true;
      option.binding = 'rowStatus';
      option.header = ' ';
      option.visible = false;
    };
    return { initialized };
  },
};
</script>
