<template>
  <div>
    <div class="page-title">
      <h3>{{ 'categories' | localize }}</h3>
    </div>
    <section>
      <div class="row" v-if="!loading">
        <div class="col s12 m6">
          <Create @newCatAdded="newCatAdded"/>
        </div>
        <div class="col s12 m6">
          <Edit
            v-if="categories.length"
            :categories="categories" 
            @updateCat="updateCat"
            :key="categories.length + updateCounter"
          />
          <div class="page-subtitle" v-else>
            <h4 class="no-category">{{ 'noCategories' | localize }}</h4>
          </div>
        </div>
      </div>
      <Loader v-else/>
    </section>
  </div>
</template>

<script>
import Create from '@/components/categories/create.vue'
import Edit from '@/components/categories/edit.vue'


export default {
  metaInfo() {
    return {
      title: this.$title('categories')
    }
  },
  data: () => ({
    newCategory: null,
    categories: [],
    loading: true,
    updateCounter: 0
  }),
  components: {
    Create,
    Edit
  },
  methods: {
    newCatAdded(category) {
      this.newCategory = category
      this.updateCat()
    },
    async updateCat() {
      this.categories = await this.$store.dispatch('getCategories')
      this.updateCounter++
    }
  },
  async mounted() {
    const categories = await this.$store.dispatch('getCategories')
    this.categories = categories ? categories : []
    this.loading = false
  }
};
</script>

<style scoped>
  .no-category {
    text-align: center;
  }
</style>
