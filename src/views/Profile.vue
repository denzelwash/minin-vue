<template>
  <div>
    <div class="page-title">
      <h3>{{ 'profileTitle' | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="formSubmit">
      <div class="input-field">
        <input id="description" type="text" v-model="name" :class="{invalid: $v.name.$error}">
        <label for="description" :class="{'active': !!name}">{{ 'name' | localize }}</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">{{'required' | localize}}</small>
        <small class="helper-text invalid" v-else-if="$v.name.$dirty && !$v.name.minLength">{{'min2' | localize}}</small>
      </div>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ 'update' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {required, minLength} from "vuelidate/lib/validators";

export default {
  data: () => ({
    isRuLocale: true,
    name: '',
  }),
  validations: {
    name: {
      required,
      minLength: minLength(2),
    }
  },
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    async formSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      try {
        await this.$store.dispatch('updateInfo', {name: this.name, locale: this.isRuLocale ? 'ru-RU' : 'en-US'})
      } catch(e) {}
    }
  },
  watch: {
    info() {
      this.name = this.info.name
      this.isRuLocale = this.info.locale === 'ru-RU' ? true : false
    }
  },
  mounted() {
    if (this.info) {
      this.name = this.info.name
      this.isRuLocale = this.info.locale === 'ru-RU' ? true : false
    }
  }
}
</script>

<style>
  .switch {
    margin-top: 1rem;
    margin-bottom: 3rem;
  }
</style>
