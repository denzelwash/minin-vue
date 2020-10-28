<template>
  <form ref='auth-form' class="card auth-card" @submit.prevent="signIn">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" name="email" type="text" v-model="email" :class="{invalid: $v.email.$error}">
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">Пожалуйста заполните поле</small>
        <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">Введите корректный email</small>
      </div>
      <div class="input-field">
        <input id="password" name="password" type="password" v-model="password" :class="{invalid: $v.password.$error}">
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Введите пароль</small>
        <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">Пароль должен быть минимум {{ $v.password.$params.minLength.min }} символов, сейчас {{ password.length }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        Нет аккаунта?
        <router-link to="/registration" tag="a">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, minLength, email, between } from 'vuelidate/lib/validators'
import messages from '@/utils/messages.js'
import {mapActions} from 'vuex'

export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    ...mapActions([
      'login'
    ]),
    async signIn() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      let formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.login(formData)
        this.$router.push('/')
      } catch(err) {}
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  mounted() {
    const message = messages[this.$route.query.message]
    if (message) {
      this.$message(message)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-title {
    margin-bottom: 2rem !important;
  }
</style>
