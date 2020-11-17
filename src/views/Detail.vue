<template>
  <div>
    <Loader v-if="loading"/>
    <template v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" tag="a" class="breadcrumb">{{ 'history' | localize }}</router-link>
        <a class="breadcrumb"> {{ record.type | localize }} </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="colorClass">
            <div class="card-content white-text">
              <p>{{ 'description' | localize }}: {{ record.desc }}</p>
              <p>{{ 'amount' | localize }}: {{ record.summ | currencyFilter}}</p>
              <p>{{ 'category' | localize }}: {{ record.categoryName }}</p>

              <small>{{ new Date(record.date) | formatDate() }}</small>
            </div>
          </div>
        </div>
      </div>
    </template>  
  </div>
</template>

<script>

import formatDate from '@/utils/format-date.filter'

export default {
  data: () => ({
    loading: true,
    record: null
  }),
  computed: {
    colorClass() {
      return this.record.type === 'income' ? 'green' : "red"
    }
  },
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('getRecord', id)
    const category = await this.$store.dispatch('getCategory', record.category)
    this.record = {
      ...record,
      categoryName: category.title
    }
    this.loading = false
  }
};
</script>

<style>
</style>
