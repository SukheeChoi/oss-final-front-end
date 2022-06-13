<template>
  <template v-if="label">
    <label class="input-label" :for="unique">{{ label }}</label>
  </template>
  <div class="ow-combobox" ref="root" :style="style">
    <wj-combo-box
      :id="unique"
      v-bind="$attrs"
      :textChanged="textChanged"
    ></wj-combo-box>
  </div>
</template>
<script>
import { ref} from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwSearchInput',
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-search-input');
      },
    },
    style : {
      type: String,
      default: "--width: 200px"
    },
    modelValue: String,
  },
  
  setup(props, { emit }) {
    const root = ref(null);

    const textChanged = (e) => {
      emit('update:modelValue', e.text);
    }

    return {
      root,
      textChanged
    };
  },
};
</script>
<style lang="scss" scoped>
.input-label {
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
