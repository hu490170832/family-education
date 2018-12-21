<template>
  <div @click="goDetail(data._id)" class="teacher">
    <div class="title">
      <img mode='widthFix' class="title-img" src="./jiangpai.png">
      <span class="name">{{data.name}}</span>
      <span class="number">(NO:{{data.id}})</span>
      <span class="sex">{{data.sex}}</span>
      <span class="money"><span class="red">￥{{data.min_wage}}</span>/时</span>
    </div>
    <div class="content">
      <div class="icon-box">
        <img mode='widthFix' class="icon" :src="data.icon">
      </div>
      <div class="teacher-info">
        <div class="school">
          <span class="school-name">{{data.school}}</span>
          <span class="school-level">3A优师</span>
        </div>
        <div class="teach_subject">
          <span v-for="(item,index) in data.teach_subject" :key="index" class="subject">{{item}}<span v-show="index!=data.teach_subject.length-1">/</span></span>
        </div>
        <div class="teach_feature">
          <span v-for="(item,index) in data.teach_feature" :key="index" class="feature">{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    methods: {
      goDetail(id) {
        wx.navigateTo({
          url: `/pages/detail/main?id=${id}`
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .teacher
    background #fff
    margin-bottom 6px
    .title
      display flex
      font-size 14px
      height 36px
      align-items center
      padding 0 10px
      border-bottom 1px solid #dfdfdf
      .name
        margin-right 12px
      .number
        margin-right 12px
      .title-img
        width 25px
        margin-right 12px
      .money
        margin-left auto
        .red
          color #fc4733
    .content
      padding 15px
      display flex
      .icon-box
        width 60px
        height 60px
        border-radius 50%
        overflow hidden
        display flex
        align-items center
        justify-content center
        .icon
          width 60px
      .teacher-info
        margin-left 14px
        .school
          color #747474
          font-size 16px
          margin-bottom 4px
          display flex
          align-items center
          .school-level
            color #fff
            background #fcc15b
            padding 2px 12px
            border-radius 2px
            margin-left 8px
            font-size 12px
        .teach_subject 
          margin-bottom 10px
        .teach_feature
          .feature
            border 1px solid #7fc6fe
            color #7fc6fe
            padding 2px 4px
            border-radius 2px
            margin-right 12px
</style>