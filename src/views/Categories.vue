<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row" v-if="!loading">
        <div class="col s12 m6">
          <Create @newCatAdded="newCatAdded"/>
        </div>
        <div class="col s12 m6">
          <Edit :categories="categories"/>
        </div>
      </div>
      <Loader v-else/>
    </section>
  </div>
</template>

<script>
import Create from '@/components/categories/create.vue'
import Edit from '@/components/categories/edit.vue'
import Loader from '@/components/loader';

export default {
  data: () => ({
    newCategory: null,
    categories: [],
    loading: true
  }),
  components: {
    Create,
    Edit,
    Loader
  },
  methods: {
    newCatAdded(category) {
      this.newCategory = category
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('getCategories')
    this.loading = false
  }
};
</script>

<style>
</style>
