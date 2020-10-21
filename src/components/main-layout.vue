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
  methods: {
    toggleSidebar() {
      const main = document.querySelector('main')
      main.classList.toggle('full')
      this.sidebar = !this.sidebar
    }
  }
}
</script>

<style>

</style>
