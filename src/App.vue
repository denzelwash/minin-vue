<template>
  <div id="app">
    <component :is="component"></component>
    <div>
      <router-link to="/login">login</router-link> <br>
      <router-link to="/registration">registration</router-link> <br>
      <router-link to="/categories">categories</router-link> <br>
      <router-link to="/detail-card">detail card</router-link> <br>
      <router-link to="/history">history</router-link> <br>
      <router-link to="/planning">planning</router-link> <br>
      <router-link to="/profile">profile</router-link> <br>
      <router-link to="/record">record</router-link> <br>
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
