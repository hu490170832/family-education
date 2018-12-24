export const setTitleMixin = {
  mounted() {
    this.setTitle()
  },
  methods: {
    setTitle() {
      wx.setNavigationBarTitle({
        title: this.$options.name || '首页'
      })
    }
  }
}