<template>
  <div id="app">
    <component :is="component"></component>
  </div>
</template>

<script>
import EmptyLayout from '@/components/empty-layout';
import MainLayout from '@/components/main-layout';

export default {
  components: {
    EmptyLayout,
    MainLayout
  },
  computed: {
    component() {
      return this.$route.meta.layout;
    }
  }
}
</script>

<style lang="scss">
  .green {
    background-color: green;
  }
  .yellow {
    background-color: yellow;
  }
  .red {
    background-color: red;
  }
</style>
