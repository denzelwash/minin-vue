<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.getError
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.$error(value)
        this.$store.commit('clearError')
      }
    }
  }
}
</script>

<style>

</style>
