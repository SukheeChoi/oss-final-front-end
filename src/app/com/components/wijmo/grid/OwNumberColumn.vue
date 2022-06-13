<template>
  <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
    <template v-if="cell.item.rowStatus != 'C'">
      {{ rownum(cell.row, cell) }}
    </template>
  </wj-flex-grid-cell-template>
</template>

<script>
import { Globalize } from '@grapecity/wijmo';
import { WjFlexGridColumn } from '@grapecity/wijmo.vue2.grid';
import { reactive, computed } from 'vue';

export default {
  name: 'OwNumberColumn',
  extends: WjFlexGridColumn,
  props: {
    options: String,
    opt: {
      type: Object,
      default: () => {
        return {
          pageSize: 10,
          pageNo: 1,
          totalCount: 0,
        };
      },
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageNo: {
      type: Number,
      default: 1,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const state = reactive({
      pageNo: computed(() => props.opt.pageNo || props.pageNo),
      pageSize: computed(() => props.opt.pageSize || props.pageSize),
      totalCount: computed(() => props.opt.totalCount || props.totalCount),
      asc: computed(() => props.options === 'asc'),
    });

    const rownum = (row, t) => {
      let rownum = 0;
      const { grid, index } = row;
      if (grid) {
        const { collectionView: cv } = grid;
        const calibration = cv.itemsRemoved.length - cv.itemsAdded.length;
        const i = index + calibration;
        if (state.asc) {
          rownum = state.pageSize * (state.pageNo - 1) + i + 1;
        } else {
          rownum = state.totalCount - state.pageSize * (state.pageNo - 1) - i;
        }
      }

      return Globalize.format(rownum, 'n');
    };

    return {
      rownum,
    };
  },
};
</script>
