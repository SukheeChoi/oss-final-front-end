<template>
  <ow-content>
    <div class="ow-flex-wrap search-zone">
      <div class="item size-fix">
        <slot></slot>
      </div>
    </div>
  </ow-content>
</template>
<script>
import { reactive, ref } from 'vue';

export default {
  name: 'OwSearch',
  components: {
  },
  props: {
    buttons: {
      default: {
        search : true,
      }
    },
  },
  setup(props) {
    let state = reactive({
      store: ref(props.buttons),
    })
    return {
      state
    };
  },
};
</script>
