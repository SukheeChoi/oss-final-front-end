<template>
  <ow-n-grid
    :initialized="initialize"
    :n="4"
    :read="read"
    :insert="insert"
    :update="update"
    :remove="remove"
    :visible-rows-count="state.visibleRowsCount"
    draggable
  >
    <wj-flex-grid-column header="ID" binding="id" width="*"></wj-flex-grid-column>
    <wj-flex-grid-column header="Country" binding="country" width="2*" :is-required="true"></wj-flex-grid-column>
    <wj-flex-grid-column header="Sales" binding="sales" width="*" format="n2"></wj-flex-grid-column>
    <wj-flex-grid-column header="Expenses" binding="expenses" width="*" format="n2"></wj-flex-grid-column>
  </ow-n-grid>
  <div draggable="true" @dragstart="start">드래그 해보기</div>
</template>

<script>
const countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
const items = [];
for (let i = 0; i < 100; i += 1) {
  const index = parseInt(Math.random() * 100) % countries.length;
  items.push({
    id: i + 1,
    country: countries[index],
    sales: Math.random() * 10000,
    expenses: Math.random() * 5000,
  });
}

const retrieve = (param) => {
  console.log('param', param);
  let filteredItems = _.cloneDeep(items);
  if (param.country) {
    filteredItems = filteredItems.filter(
      (item) => (item.country ?? '').toUpperCase().indexOf(param.country.toUpperCase()) > -1
    );
  }
  if (param.sales) {
    filteredItems = filteredItems.filter((item) => item.sales > param.sales);
  }
  if (param.expenses) {
    filteredItems = filteredItems.filter((item) => item.expenses > param.expenses);
  }
  const totalCount = filteredItems.length;
  if (param.sort) {
    filteredItems = _.sortBy(filteredItems, param.sort);
    if (['desc', 'DESC'].includes(param.direction)) {
      filteredItems = filteredItems.reverse();
    }
  }
  if (param.pageNo) {
    filteredItems = filteredItems.splice((param.pageNo - 1) * param.pageSize ?? 10, param.pageSize ?? 10);
  }

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

async function insert(item) {
  items.push(item);
  return true;
}

async function update(item) {
  const at = items.findIndex((target) => target.id === item.id);
  items[at] = item;
  return true;
}

async function remove(item) {
  const at = items.findIndex((target) => target.id === item.id);
  items.splice(at, 1);
  return true;
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
    const state = reactive({
      visibleRowsCount: 2,
    });

    const initialize = (s) => {};

    let globalIndex = 0;

    const start = (e) => {
      const index = parseInt(Math.random() * 100) % countries.length;
      const item = {
        id: 10000 + (globalIndex += 1),
        country: countries[index],
        sales: Math.random() * 10000,
        expenses: Math.random() * 5000,
      };
      e.dataTransfer.setData(DragDataItemFormat, JSON.stringify(item));
    };

    return {
      initialize,
      read,
      insert,
      update,
      remove,
      state,
      start,
    };
  },
};
</script>

<style></style>