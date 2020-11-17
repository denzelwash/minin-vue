<template>
  <ul class="sidenav app-sidenav" :class="{open: sidebarStatus}">
    <router-link
      v-for="(item, index) in links"
      :key="index "
      tag="li"
      :to="item.url">
      <a class="waves-effect waves-orange pointer">{{ item.title }}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/utils/localize.filter'

export default {
  props: ['sidebarStatus'],
  data() {
    return {
      links: [
        {
          title: localizeFilter('bill'),
          url: '/'
        },
        {
          title: localizeFilter('history'),
          url: '/history'
        },
        {
          title: localizeFilter('planning'),
          url: '/planning'
        },
        {
          title: localizeFilter('newRecord'),
          url: '/record'
        },
        {
          title: localizeFilter('categories'),
          url: '/categories'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .router-link-exact-active {
    background-color: #ffddaa;
  }
</style>
