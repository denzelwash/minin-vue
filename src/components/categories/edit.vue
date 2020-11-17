<template>
  <div>
    <div class="page-subtitle">
      <h4>{{ 'edit' | localize }}</h4>
    </div>
    <form @submit.prevent="submitHandler">
      <div class="input-field select-input-field">
        <select ref="catSelect" v-model="current">
          <option
            v-for="item in categories"
            :key="item.id"
            :value="item.id"
          >{{ item.title }}</option>
        </select>
        <label>{{ 'changeCategory' | localize }}</label>
      </div>

      <div class="input-field">
        <input id="name-edit" type="text" v-model="title" :class="{invalid: $v.title.$error}"/>
        <label for="name-edit">{{ 'title' | localize }}</label>
        <small class="helper-text invalid" v-if="$v.title.$dirty && !$v.title.required">{{ 'enterTitle' | localize }}</small>
        <small class="helper-text invalid" v-else-if="$v.title.$dirty && !$v.title.minLength">{{ 'min' | localize }} {{ $v.title.$params.minLength.min }} {{ 'symbolNow' | localize }} {{ title.length }}</small>
      </div>

      <div class="input-field">
        <input id="limit-edit" type="number" v-model.number="limit" :class="{invalid: $v.limit.$error}"/>
        <label for="limit-edit">{{ 'limit' | localize }}</label>
        <small class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.required">{{ 'required' | localize }}</small>
        <small class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue">{{ 'min' | localize }} {{ $v.limit.$params.minValue.min }}</small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'update' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minLength, minValue} from 'vuelidate/lib/validators'

export default {
  props: ['categories'],
  data: () => ({
    title: '',
    limit: 1,
    select: null,
    current: null
  }),
  validations: {
    title: {
      required,
      minLength: minLength(3)
    },
    limit: {
      required,
      minValue: minValue(1)
    }
  },
  methods: {
    async submitHandler() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      try {
        await this.$store.dispatch('updateCategory', {
          id: this.current,
          title: this.title,
          limit: this.limit,
        })
        this.$emit('updateCat')
        this.$message('Категория обновлена')
      } catch(e) {}
    }
  },
  watch: {
    current(value) {
      const {title, limit} = this.categories.find(item => item.id === value)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.current = this.categories[0].id
    this.select = M.FormSelect.init(this.$refs.catSelect)
    M.updateTextFields()
  },
  beforeDestroy() {
    this.select.destroy()
  }
};
</script>

<style scoped>
  .select-input-field {
    margin-bottom: 23px;
  }
</style>
