<template>
  <template v-if="label">
    <label class="select-label" :for="unique">{{ label }}</label>
  </template>
  <div class="ow-combobox" ref="root" v-bind="$attrs">
    <wj-auto-complete
      :id="unique"
      :items-source="items"
      :display-member-path="displayMemberPath"
      :selected-value-path="selectedValuePath"
      :placeholder="placeholder"
      :show-drop-down-button="false"
      :initialized="initialized"
    ></wj-auto-complete>
  </div>
</template>
<script>
import { ref, watch } from 'vue';
import { expando } from '@/utils';

import { WjAutoComplete } from '@grapecity/wijmo.vue2.input';

export default {
  name: 'OwAutoComplete',
  inheritAttrs: false,
  components: {
    WjAutoComplete,
  },
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-auto-complete');
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    search: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object,
    },
    modelValue: [String, Number, Object],
    displayMemberPath: {
      type: String,
      default: 'name',
    },
    selectedValuePath: {
      type: [String, Boolean],
      default: 'value',
    },
  },
  setup(props, { emit }) {
    const root = ref();

    let control;

    const initialized = (combo) => {
      control = combo;
      control.selectedValue = props.modelValue;
      control.itemsSourceChanged.addHandler(() => (control.selectedValue = props.modelValue));
      control.selectedIndexChanged.addHandler(() => emit('update:modelValue', control.selectedValue));
      watch(
        () => props.items,
        () => control.onItemsSourceChanged()
      );
    };

    return {
      root,
      initialized,
    };
  },
};
</script>
<style lang="scss" scoped>
.select-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -1.08px;
  color: #333;
  margin-right: 6px;
  line-height: 24px;
  flex-shrink: 0;
}
.ow-combobox {
  .btn-search {
    display: inline-flex;
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    width: 17px;
    height: 17px;
    background-image: url('~@/assets/images/icon/icon_search.svg');
    text-indent: -9999em;
    font-size: 0;
    background-color: transparent;
    border: 0;
    &:hover {
      filter: invert(31%) sepia(96%) saturate(4852%) hue-rotate(210deg) brightness(105%) contrast(103%);
    }
  }
  &:after {
    display: none;
  }
}
</style>
