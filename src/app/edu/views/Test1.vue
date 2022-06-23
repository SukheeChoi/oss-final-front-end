<template>
  <ow-tree-grid :initialized="initialize" 
                :read="read" 
                :query="['name']" 
                :childItemsPath="['children', 'children']">
                <!-- childitem 순서대로 입력하기 children(albert)아래 children(anton) -->
    <wj-flex-grid-column header="Name" binding="name" width="*"></wj-flex-grid-column>
    <wj-flex-grid-column header="Country" binding="country" width="2*" :is-required="true"></wj-flex-grid-column>
    <wj-flex-grid-column header="Sales" binding="sales" width="*" format="n2"></wj-flex-grid-column>
    <wj-flex-grid-column header="Expenses" binding="expenses" width="*" format="n2"></wj-flex-grid-column>
  </ow-tree-grid>
</template>

<script>
const items = [
  {
    name: '전체',
    children: [
      {
        name: '이가을', sales: '20',
        children: [{ name: '오성엠엔디' }, { name: 'NSK 덴탈' }],
      },
      {
        name: '안병희',
        children: [
          {
            name: '태화메디칼',
            children: [{ name: 'Billy' }, { name: 'Bernard' }],
          },
          { name: '다온덴탈' },
          { name: 'Bob' },
        ],
      },
      {
        name: '최민정',
        children: [{ name: 'ivoclar vivadent' }, { name: 'Meisinger' }, { name: 'Carrie' }],
      },
      {
        name: 'Douglas',
        children: [{ name: 'Dinah' }, { name: 'Donald' }],
      },
    ],
  },
];

console.log(items);
const retrieve = (param) => {
  console.log('param', param);
  let filteredItems = _.cloneDeep(items);
  const totalCount = filteredItems.length;
  console.log('param', filteredItems);
  return Promise.resolve({
    data: filteredItems,
    status: 200,
    code: 'OK',
    message: 'Success',
    totalCount,
  });
};

async function read(query, pageNo, pageSize) {
  const result = await retrieve({
    ...query,
    pageNo,
    pageSize,
  });
  console.log('result', result);
  return result;
}

console.log('items', items);
import OwNGrid from '@/components/grid/new/OwNGrid';
import { reactive } from 'vue';
export default {
  name: 'TheOwNewGrid',
  components: {
    OwNGrid,
  },
  setup() {

    const initialize = (s) => {};

    return {
      initialize,
      read,
    };
  },
};
</script>

<style></style>