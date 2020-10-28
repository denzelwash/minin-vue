<template>
  <div id="app">
    <component :is="component"></component>
    <component :is="loader"></component>
  </div>
</template>

<script>
import EmptyLayout from '@/components/empty-layout';
import MainLayout from '@/components/main-layout';
import Loader from '@/components/loader';

export default {
  components: {
    EmptyLayout,
    MainLayout,
    Loader
  },
  computed: {
    component() {
      return this.$route.meta.layout;
    },
    loader() {
      const loader = this.$store.getters.loader
      if (loader) {
        return 'loader'
      }
    }
  }
}
</script>

<style lang="scss">

</style>
