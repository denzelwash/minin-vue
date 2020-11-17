<template>
  <div class="card light-blue bill-card">
    <div class="card-content white-text">
      <span class="card-title">{{ 'currencyAccount' | localize }}</span>
      <p class="currency-line"
        v-for="item in myCurrency"
        :key="item">
        <span>{{calcRate(item) | currencyFilter(item)}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currency'],
  data: () => ({
    myCurrency: ['RUB', 'USD', 'EUR']
  }),
  computed: {
    bill() {
      return this.$store.getters.info.bill
    }
  },
  methods: {
    calcRate(str) {
      const base = this.bill / this.currency.rates['RUB']
      return Math.floor(base * this.currency.rates[str])
    }
  }
};
</script>

<style>
</style>
