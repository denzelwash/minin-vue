<template>
  <div class="card light-blue bill-card">
    <div class="card-content white-text">
      <span class="card-title">Счет в валюте</span>
      <p class="currency-line"
        v-for="item in myCurrency"
        :key="item">
        <span>{{calcRate(item)}} {{ item }}</span>
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
      console.log(this.bill)
      console.log(this.currency.rates['RUB'])
      const base = this.bill / this.currency.rates['RUB']
      console.log(base * this.currency.rates[str])
      return Math.floor(base * this.currency.rates[str])
    }
  }
};
</script>

<style>
</style>
