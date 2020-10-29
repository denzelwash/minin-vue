<template>
  <div class="app-main-layout">

    <navbar
      @burger-click="toggleSidebar"
    />

    <sidebar
      :sidebarStatus="sidebar"
    />

    <main class="app-content" :class="{full: !sidebar}">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <add-btn></add-btn>
  </div>
</template>

<script>
import AddBtn from './add-btn'
import Navbar from './navbar'
import Sidebar from './sidebar'
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      sidebar: true
    }
  },
  components: {
    AddBtn,
    Navbar,
    Sidebar
  },
  computed: {

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
  }
}
</script>

<style>

</style>
