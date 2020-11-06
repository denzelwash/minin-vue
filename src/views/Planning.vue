<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill || '' | currencyFilter }}</h4>
    </div>

    <section>
      <Loader v-if="loading"/>
      <div v-else-if="categories.length">
        <div
          v-for="item in categories"
          :key="item.title"
        >
          <p>
            <strong>{{ item.title }}</strong>
            {{ item.balance }} из {{ item.limit }}
          </p>
          <div class="progress">
            <div class="determinate green" :style="`width:${item.percents}%`"></div>
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
import Loader from '@/components/loader.vue'
import {mapGetters} from 'vuex'

export default {
  components: {
    Loader
  },
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    try {
      const records = await this.$store.dispatch('getRecords')
      let categories = await this.$store.dispatch('getCategories')

      categories = categories.map(elem => {
        const filteredRecords = records.filter(rec => (rec.category === elem.id && rec.type === 'outcome'))
        const catSumm = filteredRecords.reduce((total, current) => total - current.summ, elem.limit)
        let percents = 100 - catSumm / (elem.limit / 100)
        percents = percents >= 100 ? 100 : percents
        return {
          ...elem,
          percents,
          balance: catSumm,
        }
      })
      
      this.categories = categories
      this.loading = false
    } catch(e) {}
  }
}
</script>

<style>

</style>
