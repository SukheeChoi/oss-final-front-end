<template>
  <template v-if="label">
    <label class="title-field">{{ label }}</label>
  </template>
  <div class="item">
    <div class="state">
      <template v-for="(item, index) in items" :key="index">
        <div class="state-item" :style="{ color: item.color }">
          {{ item.name }}<strong>{{ item.value }}</strong>{{ item.end }}
          <span v-if="item.plusValue">/<strong>{{ item.plusValue }}</strong>{{ item.plusend }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>

export default {
  name: 'OwStatusBar',
  props: {
    label: String,

    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>
<style scoped>

</style>
