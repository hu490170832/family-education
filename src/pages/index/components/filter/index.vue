<template>
  <div id="filter" class="filter" :class="{catch: catchUp}">
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
    <div class="tab-content">
      <div class="content-one">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        catchUp: false
      }
    },
    created() {
      const query = wx.createSelectorQuery()
      query.select('#filter').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(res=>{
        this.filterOffsetTop = res[0].top       // #the-id节点的上边界坐标
      })
    },
    onPageScroll(e) {
      const scrollTop = e.scrollTop
      if(scrollTop>this.filterOffsetTop) {
        if(this.catchUp) return;
        this.catchUp = true
      }else {
        if(!this.catchUp) return;
        this.catchUp = false
      }
    },
    methods: {
    }
  }
</script>

<style lang='stylus' scoped>
  .filter
    &.catch
      position fixed
      top 0
      width 100%
      background #fff
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