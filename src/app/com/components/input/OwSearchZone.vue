<template>
  <ow-flex-wrap class="search-zone" @keyup.enter="lookup">
    <template v-if="$slots.default">
      <ow-flex-item v-for="slot of $slots.default()" :key="slot.type.__scopeId">
        <component :is="slot"></component>
      </ow-flex-item>
    </template>
    <ow-flex-item to="right">
      <slot name="right">
        <button class="ow-btn type-reference ml-auto" id="query" @click="lookup">조회</button>
      </slot>
    </ow-flex-item>
  </ow-flex-wrap>
</template>
<script>
import {
  //
  isFunction,
} from '@grapecity/wijmo';
export default {
  name: 'OwSearchZone',
  components: {},
  props: {
    store: null,
    query: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const lookup = () => {
      const store = props.store;
      if (isFunction(store?.implementsInterface)) {
        if (store.implementsInterface('GridApi')) {
          store.getList(
            props.query,
            {
              pageNo: 1,
              pageSize: props.store._opt.pageSize,
            },
            true
          );
        } else if (store.implementsInterface('RestCollectionView')) {
          store.lookup(props.query);
        }
      }
    };

    return {
      lookup,
    };
  },
};
</script>
<style lang="scss" scoped>
.search-zone {
  --gap: 10px !important;
  & > .item {
    flex: 0 0 auto;
  }
  :deep(.ow-combobox),
  :deep(.ow-input) {
    --width: 150px;
  }
}
</style>
