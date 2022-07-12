<template>
  <template v-if="label">
    <label class="title-field">{{ label }}</label>
  </template>
  <div class="item">
    <div class="state">
      <template v-for="({ name, value, end, plusValue, plusend, color }, index) in items" :key="index">
        <div class="state-item" :style="{ color: color }">
          {{ name }}<strong>{{ value }}</strong>{{ end }}
          <span v-if="plusValue">/<strong>{{ plusValue }}</strong>{{ plusend }}</span>
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
.d {
  background-color: red;
}
</style>
