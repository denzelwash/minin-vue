<template>
  <div class="app-main-layout">
    <Loader v-if="loader"/>
    <template v-else>
      <navbar
        @burger-click="toggleSidebar"
      />

      <sidebar
        :sidebarStatus="sidebar"
        :key="locale"
      />

      <main class="app-content" :class="{full: !sidebar}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <add-btn v-tooltip="'Добавить запись'"></add-btn>
    </template>
  </div>
</template>

<script>
import AddBtn from './add-btn'
import Navbar from './navbar'
import Sidebar from './sidebar'
import Loader from './loader'
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      sidebar: true,
      loader: true
    }
  },
  components: {
    AddBtn,
    Navbar,
    Sidebar
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.$error(value)
        this.$store.commit('clearError')
      }
    }
  },
  methods: {
    toggleSidebar() {
      const main = document.querySelector('main')
      main.classList.toggle('full')
      this.sidebar = !this.sidebar
    }
  },
  async mounted() {
    const info = this.$store.getters.info
    if (!Object.keys(info).length) {
      await this.$store.dispatch('loadUserInfo')
    }
    this.loader = false
  }
}
</script>

<style scoped>
  .overlay {
    height: 100vh;
  }
</style>
