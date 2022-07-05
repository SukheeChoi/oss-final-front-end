OwGrid
OwTreeGrid
OwNGrid
OwGrid
OwTreeGrid
OwNGrid

<template>
  <div>
    <template v-if="isNotBlank">
      <div
        ref="header"
        class="d-flex justify-content-between align-items-end mt-10"
      >
        <div>
          <slot name="left">
            <h1 class="h1">그리드</h1>
          </slot>
        </div>
        <div>
          <template v-if="editable">
            <button
              v-if="insert"
              type="button"
              class="ow-btn type-state"
              @click="addNew"
            >
              추가
            </button>
          </template>
          <slot name="right"> </slot>
        </div>
      </div>
    </template>
    <div class="ow-grid-wrap mt-8 mb-8">
      <template
        v-for="i in n"
        :key="i"
      >
        <ow-flex-grid
          :initialized="initialize.bind(null, i)"
          v-bind="$attrs"
        >
          <slot></slot>
        </ow-flex-grid>
      </template>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <button
          type="button"
          class="ow-button type-icon mr-5"
        >
          <i class="fas fa-cog fa-fw" />
        </button>
        <ow-select
          v-model="pageSize"
          :items="pageSizeList"
          style="--width: 80px"
        ></ow-select>
      </div>
      <div>
        <b-pagination
          v-model="pageNo"
          class="ow-pagination"
          first-class="go-first"
          prev-class="go-prev"
          next-class="go-next"
          last-class="go-last"
          :total-rows="totalCount"
          :per-page="perPage"
          :limit="10"
        ></b-pagination>
      </div>
      <div>전체 {{ totalCount }} 건</div>
    </div>
  </div>
</template>

<script>
import {
  //
  isFunction,
} from '@grapecity/wijmo';
import {
  //
  NGridRestCollectionView,
} from '@/model';
import {
  //
  computed,
  reactive,
  watch,
  ref,
  toRefs,
  onMounted,
  nextTick,
} from 'vue';

// TODO 메시지로 이동
const ITEM_SOURCE_ERROR_MESSAGE = `NGridRestCollectionView는 itemsSource를 설정할 수 없습니다.`;

/**
 * 그리드의 프록시 객체 생성
 *
 * @param {FlexGrid} s
 */
function asProxyFlexGrid(s) {
  return new Proxy(s, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      if (prop === 'itemsSource') {
        console.error(ITEM_SOURCE_ERROR_MESSAGE);
        return true;
      }
      return Reflect.set(target, prop, value, receiver);
    },
  });
}

export default {
  name: 'OwNGrid',
  inheritAttrs: false,
  props: {
    initialized: Function,
    n: { type: Number, default: 1 },
    query: Object,
    page: {
      type: Object,
      default: () => ({
        pageNo: 1,
        pageSize: 20,
        // pageSizeList: [pageSize]
      }),
    },
    read: { type: Function, required: true },
    insert: Function,
    update: Function,
    remove: Function,
    editable: Boolean,
  },
  setup(props) {
    const header = ref();

    const state = reactive({
      grids: [],
      query: Object.assign({}, props.query),
      pageNo: props.page.pageNo ?? 1,
      pageSize: props.page.pageSize ?? 10,
      pageSizeList: [],
      totalCount: 0,
      api: {
        getItems: props.read,
        addItem: props.insert,
        patchItem: props.update,
        deleteItem: props.remove,
      },
      isNotBlank: true,
      // 보여지는 페이지의 수
      perPage: computed(() => state.pageSize * props.n),
    });

    /**
     * 페이지 정보 설정
     *
     * @param {NGridRestCollectionView} c
     * @param {EventArgs} e
     */
    const setPage = (c) => {
      if (c.first) {
        const { pageNo, pageSize, totalItemCount, pageSizeList } = c;
        state.pageNo = pageNo;
        state.pageSize = pageSize;
        state.totalCount = totalItemCount;
        state.pageSizeList = pageSizeList;
      }
    };

    /**
     * 이벤트 설정
     *
     * @param {FlexGrid} s
     * @param {NGridRestCollectionView} c
     */
    const setDefaultEvents = (s, c) => {
      // 데이터 로드시 페이지 정보 설정
      c.loaded.addHandler(setPage);
    };

    /**
     * 그리드 초기화
     *
     * @param {Number} i
     * @param {FlexGrid} s
     */
    const initialize = (i, s) => {
      // 그리드
      const grid = s;

      state.grids.push(grid);

      // 컬렉션뷰
      const collection = new NGridRestCollectionView({
        grid,
        n: props.n,
        i,
        query: state.query,
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        getItems: props.read,
        addItem: props.insert,
        patchItem: props.update,
        deleteItem: props.remove,
      });

      // 아이템 설정
      grid.itemsSource = collection;

      // 이벤트 설정
      setDefaultEvents(grid, collection);

      watch(
        () => state.pageSize,
        (pageSize) => (collection.pageSize = pageSize)
      );

      watch(
        () => state.pageNo,
        (pageNo) => collection.moveToPage(pageNo)
      );

      if (isFunction(props.initialized)) {
        props.initialized(asProxyFlexGrid(grid));
      }
    };

    const addNew = () => {
      const grid = state.grid;
      const sourceCollection = grid.sourceCollection;
      const editableCollectionView = grid.editableCollectionView;
      const defaultNewItem = isFunction(editableCollectionView.newItemCreator)
        ? editableCollectionView.newItemCreator()
        : sourceCollection && sourceCollection.length
        ? new sourceCollection[0].constructor()
        : {};
      grid.editor.start(defaultNewItem);
    };

    onMounted(async () => {
      await nextTick();
      const el = header.value;
      const textContent = el.textContent.trim();
      state.isNotBlank = textContent !== '';
    });

    return {
      header,
      initialize,
      addNew,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.h1),
:deep(.h2),
:deep(.h3) {
  position: relative;
  padding-left: 0.75rem;
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: cornflowerblue;
  }
}
</style>
