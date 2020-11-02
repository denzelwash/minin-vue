<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <div class="col s12 m6">
          <Create @newCatAdded="newCatAdded"/>
        </div>
        <div class="col s12 m6">
          <Edit :newCategory="newCategory"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Create from '@/components/categories/create.vue'
import Edit from '@/components/categories/edit.vue'

export default {
  data: () => ({
    newCategory: null
  }),
  components: {
    Create,
    Edit
  },
  methods: {
    newCatAdded(category) {
      this.newCategory = category
      console.log(category)
    }
  }
};
</script>

<style>
</style>
