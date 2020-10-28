<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
      <div class="col s12 m6 l4">
        <homeBill/>
      </div>

      <div class="col s12 m6 l8">
        <homeExchange/>
      </div>
    </div>
  </div>
</template>

<script>
import homeBill from '@/components/home-bill.vue'
import homeExchange from '@/components/home-exchange.vue'

export default {
  components: {
    homeBill,
    homeExchange
  }
}
</script>

<style>

</style>
