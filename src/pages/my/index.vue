<template>
  <div class="my">
    <div class="userInfo">
      <div class="userImg">
        <open-data class="userImg" type="userAvatarUrl"></open-data>
      </div>
      <open-data class="name" type="userNickName"></open-data>
    </div>
    <div class="my-list">
      <div class="my-lesson item">
        <span class="txt">我的课程</span>
        <span class="icon iconfont icon-youjiantou"></span>
      </div>
      <div class="my-lesson item">
        <span class="txt">我的收藏</span>
        <span class="icon iconfont icon-youjiantou"></span>
      </div>
      <button open-type='contact' @click="contactClick" class="contact item">
        <span class="txt">联系客服</span>
        <span class="icon iconfont icon-youjiantou"></span>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    onShareAppMessage(res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '家教哈哈',
        path: '/pages/index/main'
      }
    },
    mounted() {
      wx.setNavigationBarTitle({
        title: '我的'
      })
    },
    methods: {
      contactClick() {
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .my
    .userInfo
      display flex
      padding-left 20px
      background #1f9dd7
      height 60px
      color #fff
      .userImg
        width 50px
        height 50px
        border-radius 50%
        overflow hidden
      .name
        flex 1
        text-align center
        line-height 60px
    .my-list
      padding-left 12px
      .item
        display flex
        justify-content space-between
        align-items center
        padding-right 20px
        height 40px
        border-bottom 1px solid #e7e7e7
        position relative
        &.contact
          padding-left 0px
          font-size 14px
          color #333
          background #fff
          border-radius 0
          &::after {
            border: 0;
          } 
</style>