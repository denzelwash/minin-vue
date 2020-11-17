<template>
  <div>
    <div class="page-title">
      <h3>{{ 'planning' | localize }}</h3>
      <h4>{{ info.bill || '' | currencyFilter }}</h4>
    </div>

    <section>
      <Loader v-if="loading"/>
      <div v-else-if="categories.length">
        <div
          v-for="item in categories"
          :key="item.id"
        >
          <p class="d-inline-block">
            <strong>{{ item.title }}</strong>
            {{ item.spend | currencyFilter }} {{ 'of' | localize }} {{ item.limit | currencyFilter }}
          </p>
          <div class="progress" v-tooltip="item.tooltip">
            <div
              class="determinate" 
              :class="item.color" 
              :style="`width:${item.percents}%`"
            ></div>
          </div>
        </div>
      </div>
      <div v-else class="page-subtitle">
        <h4>Категорий нет</h4>
        <router-link :to="{name: 'Categories'}" tag="button" class="waves-effect waves-light btn">
          <span>Добавить</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import currencyFilter from '@/utils/currency.filter'
import localizeFilter from '@/utils/localize.filter'

export default {
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  computed: {
    ...mapGetters(['info']),
    progressClass() {

    }
  },
  async mounted() {
    try {
      const records = await this.$store.dispatch('getRecords')
      let categories = await this.$store.dispatch('getCategories')

      categories = categories.map(elem => {
        const filteredRecords = records.filter(rec => (rec.category === elem.id && rec.type === 'outcome'))
        const spend = filteredRecords.reduce((total, current) => total + current.summ, 0)
        let percents = Math.round(spend / (elem.limit / 100))
        let color = percents <= 60 ? 'green' : 
          percents <= 100 ? 'yellow' : 'red'
        let balance = elem.limit - spend
        let tooltip = `${balance >= 0 ? localizeFilter('left') + ' ' + currencyFilter(balance) : localizeFilter('limitOver') + ' ' + currencyFilter(-balance)}`
        return {
          ...elem,
          percents,
          color,
          spend: spend,
          tooltip
        }
      })
      
      this.categories = categories
      this.loading = false
    } catch(e) {}
  }
}
</script>

<style>
.d-inline-block {
  display: inline-block;
}
</style>
