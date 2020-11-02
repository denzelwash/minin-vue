<template>
  <div>
    <div class="page-subtitle">
      <h4>Создать</h4>
    </div>

    <form @submit.prevent="submitHandler">
      <div class="input-field">
        <input id="name" type="text" v-model="title" :class="{invalid: $v.title.$error}"/>
        <label for="name">Название</label>
        <small class="helper-text invalid" v-if="$v.title.$dirty && !$v.title.required">Введите название</small>
        <small class="helper-text invalid" v-else-if="$v.title.$dirty && !$v.title.minLength">Минимум {{ $v.title.$params.minLength.min }} символа, сейчас {{ title.length }}</small>
      </div>

      <div class="input-field">
        <input id="limit" type="number" v-model.number="limit" :class="{invalid: $v.limit.$error}"/>
        <label for="limit">Лимит</label>
        <small class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.required">Заполните поле</small>
        <small class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue">Минимум {{ $v.limit.$params.minValue.min }}</small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minLength, minValue} from 'vuelidate/lib/validators'

export default {
  data: () => ({
    title: '',
    limit: 1
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
        const category = await this.$store.dispatch('addCategory', {
          title: this.title,
          limit: this.limit
        })
        this.$message(`Категория ${category.title} создана`)
        this.title = ''
        this.limit = 1
        this.$v.$reset()
        this.$emit('newCatAdded', category)
      } catch(e) {}
    }
  },
  mounted() {
    M.updateTextFields()
  }
};
</script>

<style>
</style>
