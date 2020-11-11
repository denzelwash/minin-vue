<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading"/>
    <form class="form" v-else-if="!loading && categories.length" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="selectedCategory">
          <option 
            v-for="cat in categories" 
            :key="cat.id"
            :value="cat.id"
          >{{ cat.title }}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type"/>
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type"/>
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount" type="number" v-model.number="summ" :class="{invalid: $v.summ.$error}">
        <label for="amount">Сумма</label>
        <small class="helper-text invalid" v-if="$v.summ.$dirty && !$v.summ.required">Введите сумму</small>
        <small class="helper-text invalid" v-if="$v.summ.$dirty && !$v.summ.numeric">Не число</small>
        <small class="helper-text invalid" v-if="$v.summ.$dirty && !$v.summ.minValue">Минимум 1</small>
      </div>

      <div class="input-field">
        <input id="description" type="text" v-model="desc" :class="{invalid: $v.desc.$error}">
        <label for="description">Описание</label>
        <small class="helper-text invalid" v-if="$v.desc.$dirty && !$v.desc.required">Добавьте описание</small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
    <div class="page-subtitle" v-else>
      <h4>Категорий нет</h4>
      <router-link :to="{name: 'Categories'}" tag="button" class="waves-effect waves-light btn">
        <span>Добавить</span>
      </router-link>
    </div>
  </div>
</template>

<script>

import { required, minValue, numeric} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

export default {
  data: () => ({
    select: null,
    categories: [],
    loading: true,
    selectedCategory: null,
    type: 'income',
    summ: 1,
    desc: '',
    bill: null
  }),
  validations: {
    summ: {
      required,
      numeric,
      minValue: minValue(1)
    },
    desc: {
      required,
    }
  },
  methods: {
    async submitHandler() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      try {
        this.bill = await this.getInfo.bill
        if (!this.canAddOutcome) {
          this.$error(`Недостаточно средств на счете: ${this.summ - this.bill}руб.`)
          return
        }
        await this.$store.dispatch('addRecord', {
          category: this.selectedCategory,
          summ: this.summ,
          desc: this.desc,
          type: this.type,
          date: new Date().toJSON()
        })
        const newBill = this.type === 'income' ?
          this.bill + this.summ :
          this.bill - this.summ
        await this.$store.dispatch('updateInfo', {bill: newBill})
        this.$message('Запись добавлена')
        this.summ = 1
        this.desc = ''
        this.$v.$reset()
      } catch(e) {}
    }
  },
  computed: {
    ...mapGetters({
      getInfo: 'info'
    }),
    canAddOutcome() {
      return this.type === 'income' || this.summ <= this.bill
    }
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch('getCategories')
      this.loading = false
      if (this.categories.length) {
        this.selectedCategory = this.categories[0].id
      }
      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select)
        M.updateTextFields();
      }, 0)
    } catch(e) {}
  },
  beforeDestroy() {
    if (this.select) this.select.destroy()
  }
}
</script>

<style>

</style>
