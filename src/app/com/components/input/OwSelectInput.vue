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
        :initialized="initCombo"
        :selectedIndexChanged="selectedIndexChanged"
        :all="all"
      ></wj-combo-box>
    </div>
    <div class="ow-input" :style="style">
      <wj-combo-box
        ref="input"
        v-bind="$attrs"
        :id="`${unique}-2`"
        :initialized="initInput"
        :textChanged="textChanged"
      ></wj-combo-box>
    </div>
</template>
<script>
import { CollectionView } from '@grapecity/wijmo';
import { computed, ref, reactive, toRefs } from 'vue';
import { expando } from '@/utils';
import { prepend } from '@/api/comCode.js';

export default {
  name: 'OwSelectInput',
  inheritAttrs: false,
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-select-input');
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    items: {
      type : [Array, CollectionView],
      default : () => {
        return new CollectionView();
      }
    },
    select: Object,
    input: String,
    style : {
      type: String,
      default: "--width: 150px"
    },
    all: {
      type: Boolean,
      default: true,
    },
    displayMemberPath : {
      type: String,
      default: 'name'
    },
    selectedValuePath : {
      type: [String, Boolean],
      default: 'value'
    },
    modelValue: {
      type: [String, Object],
    },
  },
  setup(props, { emit }) {
    const root = ref(null);
    
    let combo = ref(null),
        input = ref(null);

    const state = reactive({
      Style: props.style,
      all: props.all,
      query: props.modelValue,
      select: props.select,
      selectValue: null,
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
      })
    });

    const initCombo = (c) => {
      combo.value = c;
    };

    const initInput = (i) => {
      input = i;
    }

    const selectedIndexChanged = async (c) => {
      let oldValue = state.selectValue;
      if (oldValue) {
        state.query[oldValue] = '';
      }
      await setValue(c);
    }

    const setValue = (c) => {
      let value = _.get(props.select, c.selectedValue);
      state.selectValue = value;
      if(state.selectValue) {
        state.query[state.selectValue] = input.text;
      } else {
        input.text = '';
      }
      emit('update:modelValue', state.query);
    }

    const textChanged = (e) => {
      state.query[state.selectValue] = e.text;
      emit('update:modelValue', state.query);
    }

    return {
      root,
      ...toRefs(state),
      initCombo,
      initInput,
      selectedIndexChanged,
      textChanged
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
.ow-input {
  &:after {
    display: none;
  }
}
</style>
