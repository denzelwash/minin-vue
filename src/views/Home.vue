<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <div class="row" v-if="currency && bill">
      <div class="col s12 m6 l4">
        <Bill 
          :currency="currency"
        />
      </div>

      <div class="col s12 m6 l8">
        <Exchange 
          :currency="currency"
        />
      </div>
    </div>
    <Loader v-else/>
  </div>
</template>

<script>
import Bill from '@/components/home/bill.vue'
import Exchange from '@/components/home/exchange.vue'


export default {
  components: {
    Bill,
    Exchange
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
  methods: {
    async refresh() {
      this.$store.commit('clearUserInfo')
      this.currency = null
      this.currency = await this.$store.dispatch('fetchCurrency')
      await this.$store.dispatch('loadUserInfo')
      
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
  }
}
</script>

<style>

</style>
