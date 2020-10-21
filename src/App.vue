<template>
  <div id="app">
    <component :is="component"></component>
    <div v-if="!component">
      <router-link to="/login">login</router-link>
      <router-link to="/categories">categories</router-link>
    </div>
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
  
</style>
