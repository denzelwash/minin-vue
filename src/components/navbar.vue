<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('burger-click', $event.target.value)">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | formatDate}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a ref="dropdown" class="dropdown-trigger black-text" href="#" data-target="dropdown">
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <router-link to="/profile" tag="li">
              <a class="black-text" href="#">
                <i class="material-icons">account_circle</i>Профиль
              </a>
            </router-link>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="onLogout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
// import {mapGetters} from 'vuex'

export default {
  data: () => ({
    date: new Date(),
    timer: null,
    dropdown: null
  }),
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar')
    },
    async onLogout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown);
    this.timer = setInterval(() => {
      this.date = new Date()
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.dropdown.destroy();
  },
  filters: {
    formatDate(value) {
      return value.toLocaleString("ru", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }) 
    }
  }
}

</script>

<style>

</style>
