<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <div class="row" v-if="currency && bill">
      <div class="col s12 m6 l4">
        <homeBill 
          :currency="currency"
        />
      </div>

      <div class="col s12 m6 l8">
        <homeExchange :rates="currency"/>
      </div>
    </div>
    <Loader v-else/>
  </div>
</template>

<script>
import homeBill from '@/components/home-bill.vue'
import homeExchange from '@/components/home-exchange.vue'
import Loader from '@/components/loader';

export default {
  components: {
    homeBill,
    homeExchange,
    Loader
  },
  data() {
    return {
      currency: null,
    }
  },
  computed: {
    bill() {
      return this.$store.getters.info.bill
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
  }
}
</script>

<style>

</style>
