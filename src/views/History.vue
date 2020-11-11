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
      <template v-if="records.length">
        <Table
          :records="items"
          :categories="categories"
        />
        <Paginate
          v-model="page"
          :page-count="pageItems"
          :click-handler="clickPage"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
          :page-link-class="''"
          :next-text="`<i class='material-icons'>chevron_right</i>`"
          :prev-text="`<i class='material-icons'>chevron_left</i>`"
          :prev-class="'waves-effect'"
          :next-class="'waves-effect'">
        </Paginate>
      </template>
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
import pagination from '@/mixins/pagination.mixin'
import Table from '@/components/history/table.vue'

export default {
  components: {
    Table
  },
  mixins: [pagination],
  data: () => ({
    loading: true,
    records: [],
    categories: [],
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
    this.setPagination(records)
  }
}
</script>

<style>
  .pagination li a {
    outline: none;
  }
</style>
