<template>
  <div class="filter">
    <div class="filter-tab">
      <div class="tab-item">
        <span class="txt">时薪高低</span>
        <span class="icon iconfont icon-xiajiantou"></span>
        <span class="line"></span>
      </div>
      <div class="tab-item">
        <span class="txt">授课区域</span>
        <span class="icon iconfont icon-xiajiantou"></span>
        <span class="line"></span>
      </div>
      <div class="tab-item">
        <span class="txt">筛选</span>
        <span class="icon iconfont icon-xiajiantou"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang='stylus' scoped>
  .filter
    .filter-tab
      display flex
      border-bottom 1px solid #e0e0e0
      .tab-item
        position relative
        font-size 14px
        color #333
        display flex
        width 33%
        box-sizing border-box
        justify-content center
        align-items center
        height 35px
        .line
          position absolute
          right 0
          top 50%
          transform translateY(-50%)
          width 1px
          height 16px
          background #ccc
        .txt
          margin-right 6px
        .icon
          position relative
          top 1px
</style>