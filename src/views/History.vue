<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <Loader v-if="loading"/>
    <section v-else>
      <div class="history-chart">
        <canvas></canvas>
      </div>
      <Table
        v-if="records.length"
        :records="records"
        :categories="categories"
      />
      <div class="page-subtitle" v-else>
        <h4>Записей нет</h4>
        <router-link :to="{name: 'Record'}" tag="button" class="waves-effect waves-light btn">
          <span>Добавить</span>
        </router-link>
      </div>
    </section> 
  </div>
</template>

<script>
import Loader from '@/components/loader.vue'
import Table from '@/components/history/table.vue'

export default {
  components: {
    Loader,
    Table
  },
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted() {
    const records = await this.$store.dispatch('getRecords')
    this.categories = await this.$store.dispatch('getCategories')
    this.records = records.map(record => ({
      ...record,
      categoryName: this.categories.find(cat => cat.id === record.category).title,
      recordClass: record.type === 'income' ? 'green' : 'red',
      recordText: record.type === 'income' ? 'Доход' : 'Расход'
    }))
    this.loading = false
  }
}
</script>

<style>

</style>
