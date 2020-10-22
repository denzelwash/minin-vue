<template>
  <div class="fixed-action-btn">
    <a class="btn-floating btn-large blue" href="#" @click.prevent="click">
      <i class="large material-icons">add</i>
    </a>
    <!-- <router-link to="/record">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </router-link> -->
  </div>
</template>

<script>
export default {
  methods: {
    click() {
      const pathname = window.location.pathname;
      if (pathname !== '/record') {
        this.$router.push({name: 'Record'})
      }
    }
  }
}
</script>

<style>

</style>
