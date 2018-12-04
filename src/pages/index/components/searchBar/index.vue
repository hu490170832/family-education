<template>
  <div class="searchBar">
    <div class="search-box">
      <input type="text" class="search-input" placeholder-style="color: #fff" placeholder="搜索老师姓名/编号/科目/年级/授课区域">
      <span class=" icon iconfont icon-magnifier"></span>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang='stylus' scoped>
  .searchBar
    padding 0 20px
    height 44px
    background #1f9dd7
    .search-box
      background #69b6e0
      height 28px
      border-radius 4px
      display flex
      align-items center
      justify-content space-between
      padding 0 12px
      .search-input
        width 294px
        height 20px
        color #fff
        font-size 14px
      .icon
        color #fff
</style>