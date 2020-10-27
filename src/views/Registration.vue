<template>
  <form class="card auth-card" @submit.prevent="registration">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text" v-model="email" :class="{invalid: $v.email.$error}"/>
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">Пожалуйста заполните поле</small>
        <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">Введите корректный email</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" v-model="password" :class="{invalid: $v.password.$error}"/>
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Введите пароль</small>
        <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">Пароль должен быть минимум {{ $v.password.$params.minLength.min }} символов, сейчас {{ password.length }}</small>
      </div>
      <div class="input-field">
        <input id="name" type="text" v-model="name" :class="{invalid: $v.name.$error}"/>
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Пожалуйста заполните поле</small>
        <small class="helper-text invalid" v-else-if="$v.name.$dirty && !$v.name.minLength">Не похоже на имя</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="check"/>
          <span>С правилами согласен</span>
          <div>
            <small class="helper-text invalid" v-if="$v.check.$dirty && !$v.check.$model">Примите правила</small>
          </div>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login" tag="a">Войти</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import {mapActions} from 'vuex'

export default {
  data: () => ({
    email: '',
    password: '',
    name: '',
    check: ''
  }),
  methods: {
    ...mapActions('auth', {
      register: 'register'
    }),
    async registration() {
      this.$v.$touch()
      if (this.$v.$invalid || !this.check) return;
      let formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.register(formData)
        this.$router.push('/')
      } catch(err) {}
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    name: {
      required,
      minLength: minLength(2),
    },
    check: {
      required
    }
  },
};
</script>

<style>
  .helper-text {
    font-size: 12px;
  }
</style>
