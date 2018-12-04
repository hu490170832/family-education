<template>
  <div class="searchBar">
    <div class="search-box">
      <input type="text" class="search-input"><span class=" icon iconfont icon-magnifier"></span>
    </div>
    
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang='stylus' scoped>
  .searchBar
    .search-box
      height 44px
      background #1f9dd7
      padding 0 20px
      .search-input
        height 28px
        background #69b6e0
        border-radius 4px
      .icon
        color #fff
</style>