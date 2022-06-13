<template>
  <ow-flex-wrap class="search-zone">
    <template v-if="label">
      <label class="input-label" :for="unique">{{ label }}</label>
    </template>
    <div class="ow-filter" ref="root" v-bind="$attrs">
      <template v-if="overflow">
        <button type="button" class="ow-filter-btn-move prev" @click="move('prev')">&#60;</button>
      </template>
      <ul class="ow-filter-list" ref="filter">
        <wj-tab-panel :selectedIndexChanged="selectedIndexChanged" :selectedIndex="selectedIndex" :isAnimated="true">
            <wj-tab v-for="({ path, value, disabled = false }, index) in itemsSource" :key="value">
              <img v-if="value" :src="require(`../../assets/images/${path}`)" class="ow-filter-button"/>
              <label v-else class="ow-filter-button" style="justify-content:center">
                <span class="wj-glyph-asterisk" style="margin-left:0"></span>
              </label>
              <div>
              </div>
            </wj-tab>
        </wj-tab-panel>
      </ul>
      <template v-if="overflow">
        <button type="button" class="ow-filter-btn-move next" @click="move('next')">&#62;</button>
      </template>
    </div>
  </ow-flex-wrap>
  <div class="headline-wrap">
    <ow-flex-item class="align-x-start">
      <h1 class="h1" v-if="title">{{ title }}</h1>
    </ow-flex-item>
    <ow-flex-item class="align-x-end">
      <slot name="right"></slot>
    </ow-flex-item>
  </div>
  <div>
    <slot></slot>
  </div>
</template>
<script>
import { computed, onMounted, onUnmounted, reactive, ref, toRefs, watch } from 'vue';
import { expando } from '@/utils';
import { CollectionView } from '@grapecity/wijmo';
import '@grapecity/wijmo.vue2.nav';

import _ from 'lodash';

export default {
  name: 'OwImageFilterRadio',
  props: {
    label: String,
    title: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-image-filter-radio');
      },
    },
    items: {
      type: [Array, CollectionView],
      default: () => {
        return [];
      },
    },
    modelValue: Number,
  },
  setup(props, { emit }) {
    const root = ref(null);
    const filter = ref(null);

    const state = reactive({
      selectedIndex: computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
      }),
      itemsSource: computed(() => {
        let items = props.items;
        if (items instanceof CollectionView) {
          items = items.sourceCollection;
        }
        return items;
      }),
      overflow: false,
    });

    const getContentRect = (dom) => {
      let boundingClientRect;
      if (dom) {
        boundingClientRect = dom.getBoundingClientRect();
      }
      return DOMRectReadOnly.fromRect(boundingClientRect);
    };

    let index = 0;
    const move = _.throttle((direction) => {
      const { value: outer } = root;
      const { value: inner } = filter;

      const { left: outerLeft, right: outerRight } = getContentRect(outer);
      const { left: innerLeft, right: innerRight, width: innerWidth } = getContentRect(inner);

      let tx;
      switch (direction) {
        case 'prev':
          if (outerLeft > innerLeft) {
            tx = innerWidth * (index += 1) * (1 / 3);
          }
          break;
        case 'next':
          if (outerRight < innerRight) {
            tx = innerWidth * (index -= 1) * (1 / 3);
          }
          break;
      }
      if (typeof tx === 'number') {
        inner.style.transform = `translateX(${tx}px)`;
      }
    }, 300);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: outerWidth } = entry.contentRect;
        const { width: innerWidth } = getContentRect(filter.value);
        if (entry.target === root.value) {
          state.overflow = outerWidth < innerWidth;
        }
      }
    });

    const selectedIndexChanged = (control) => {
      state.selectedIndex = control.selectedIndex;
    }

    onMounted(() => {
      observer.observe(root.value);
      if (state.itemsSource.length > 0 && _.isEmpty(state.selectedIndex)) {
        const first = state.itemsSource.filter((item) => !item.disabled).at(0);
        if (first) {
          state.selectedIndex = first.value;
        }
      }
    });

    onUnmounted(() => {
      observer.disconnect();
    });

    return {
      root,
      filter,
      ...toRefs(state),
      move,
      selectedIndexChanged,
    };
  },
};
</script>
<style lang="scss" scoped>
$icon-width: 48px;
$icon-height: 30px;

.search-zone {
    padding: 1px 13px;

}
.input-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -1.08px;
  color: #333;
  margin-right: 6px;
  line-height: 24px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.filter-radio-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -1.08px;
  color: #333;
  margin-right: 6px;
}
.ow-filter {
  padding: 2px;
  height: auto;
  background-color: transparent;
  .ow-filter-list {
    transition: all 0.2s ease-in-out;
  }
}
:deep(.wj-tabheaders) {
  display: flex;
  align-items: center;
}
:deep(.wj-tabpanel>div>.wj-tabpanes) {
  border-top: 0;
}
.wj-tabheader:hover {
  outline: 2px solid rgba(90, 160, 215, 0.5);
}
.wj-tabpanel > div {
  > .wj-tabheaders {
    > .wj-tabheader {
      padding: 2px;  //var(--bs-gutter);
      margin: 0;
      display: flex;
      width: $icon-width;
      height: $icon-height;
      border: 1px solid #cad1d6;
      box-sizing: border-box;
      background-color: #fff;
      &:not(:last-child) {
        margin-right: 2px;
      }
    }
  }
}
:deep(.wj-tabpanel>div>.wj-tabheaders>.wj-tabheader.wj-state-active) {
  outline: 2px solid #2f7eec;
  border-color: transparent;
}
.wj-control {
  background-color: transparent;
}

</style>
