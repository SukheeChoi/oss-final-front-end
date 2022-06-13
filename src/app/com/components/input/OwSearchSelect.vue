<template>
  <template v-if="label">
    <label class="select-label" :for="unique">{{ label }}</label>
  </template>
  <div class="ow-combobox" ref="root" :style="Style">
    <wj-combo-box
      v-bind="$attrs"
      :id="unique"
      :itemsSource="itemsSource"
      :displayMemberPath="displayMemberPath"
      :selectedValuePath="selectedValuePath"
      :placeholder="placeholder"
      :initialized="initialized"
      :selectedIndexChanged="selectedIndexChanged"
      :all="all"
    ></wj-combo-box>
  </div>
</template>
<script>
import { CollectionView } from '@grapecity/wijmo';
import { computed, ref, reactive, toRefs } from 'vue';
import { expando } from '@/utils';
import { prepend } from '@/api/comCode.js';

export default {
  name: 'OwSearchSelect',
  inheritAttrs: false,
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-select');
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    items: {
      type: [Array, CollectionView],
      default : () => {
        return new CollectionView();
      }
    },
    link: {
      type: Object,
      default: [],
    },
    modelValue: [String, Number, Object],
    style: {
      type: String,
      default: '--width: 150px',
    },
    all: {
      type: Boolean,
      default: true,
    },
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
    const root = ref(null),
          Style = props.style;

    let combo = ref(null);

    const state = reactive({
      linkView: props.link,
      itemsSource: computed(() => {
        let items = props.items;

        if (items instanceof CollectionView) {
          items = items.items;
        }
        
        if (items.length > 0) {
          if (props.all && items[0][props.selectedValuePath] != '') {
            items = prepend(items, [{ [props.selectedValuePath]: '', [props.displayMemberPath]: '전체' }]);
          }

          if (combo.value) {
            combo.value.selectedIndex = 0;
            combo.value.refresh();
          }
        }

        return items;
      }),
    });

    const initialized = (c) => {
      c.selectedValue = props.modelValue;
      combo.value = c;
    };

    const selectedIndexChanged = (c) => {
      emit('update:modelValue', c.selectedValue);

      let filteredLinkView;
      if (c.selectedValue) {
        filteredLinkView = state.linkView.filter(item => item.link == c.selectedValue);
      } else {
        filteredLinkView = state.linkView;
      }
      emit('update:link', filteredLinkView);
    };

    return {
      root,
      ...toRefs(state),
      initialized,
      selectedIndexChanged,
      Style,
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
</style>
