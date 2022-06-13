<template :initialized="initialized">
  <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
    <input
      type="radio"
      :id="cell.row.index"
      @input="onCheck(cell, $event.target)"
      :name="expando"
    />
  </wj-flex-grid-cell-template>
</template>
<script>
import { WjFlexGridColumn } from '@grapecity/wijmo.vue2.grid';
import { reactive, computed } from 'vue';

export default {
  name: 'OwRadioColumn',
  extends: WjFlexGridColumn,
  props: {
    modelValue: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const expando = computed(() => {
      return 'ow-radio-' + ('' + Math.random()).replace(/\D/g, '');
    });

    const { value } = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const initialized = (option) => {
      option.align = 'center';
      option.isReadOnly = true;
    };
    const onCheck = ({ item }, { checked }) => {
      const at = value.indexOf(item);

      value.splice(0);
      if (checked) {
        value.push(item);
      }
    };
    return {
      initialized,
      onCheck,
      expando,
    };
  },
};
</script>
