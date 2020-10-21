<template>
  <ul class="sidenav app-sidenav" :class="{open: sidebarStatus}">
    <router-link
      v-for="(item, index) in links"
      :key="index"
      tag="li"
      :to="item.url">
      <a class="waves-effect waves-orange pointer">{{ item.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['sidebarStatus'],
  data() {
    return {
      links: [
        {
          title: 'Счет',
          url: '/'
        },
        {
          title: 'История',
          url: '/history'
        },
        {
          title: 'Планирование',
          url: '/planning'
        },
        {
          title: 'Новая запись',
          url: '/record'
        },
        {
          title: 'Категории',
          url: '/categories'
        }
      ]
    }
  },
  computed: {
    // sidebarStatus() {
    //   console.log(this.sidebarOpen)
    // }
  }
}
</script>

<style lang="scss" scoped>
  .router-link-exact-active {
    background-color: #ffddaa;
  }
</style>
