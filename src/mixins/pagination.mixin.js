export default {
  data: () => ({
    page: 1,
    pageSize: 5,
    pageItems: 0,
    allItems: [],
    items : []
  }),
  methods: {
    setPagination(array) {
      let size = this.pageSize
      let subarray = []
      for (let i = 0; i <Math.ceil(array.length/size); i++){
          subarray[i] = array.slice((i*size), (i*size) + size);
      }
      this.allItems = subarray
      this.pageItems = subarray.length
      const queryPage = this.$route.query.page
      if (queryPage) {
        this.page = +queryPage
      }
      this.items = subarray[this.page - 1]
    },
    clickPage() {
      this.$router.push(`${this.$route.path}?page=${this.page}`)
      this.items = this.allItems[this.page - 1]
    }
  }
}
