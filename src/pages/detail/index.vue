<template>
  <div class="detail">
    <banner />
    <div class="tips">温馨提示: 预约试课时长默认为两个小时/次</div>
    <div class="content">
      <div class="section1">
        <div class="title">
          <img mode='widthFix' class="title-img" src="../index/components/teacher/jiangpai.png">
          <span class="name" v-show="dataInfo.name">{{dataInfo.name}} (NO:{{dataInfo.id}}) {{dataInfo.sex}}</span>
          <span class="price" v-show="dataInfo.min_wage">￥{{dataInfo.min_wage}}元/时</span>
        </div>
        <div class="teachList">
          <div class="subject">授课科目: {{subject}} </div>
          <div class="area">授课区域: {{dataInfo.area}} </div>
          <div class="grade" v-show="dataInfo.grade">授课年级: {{dataInfo.grade}} </div>
          <div class="jinyan">教育心得: 循循善诱 </div>
          <div class="time">上课时间: 周末 </div>
          <div class="status">空闲</div>
        </div>
      </div>
      <div class="identify">
        <div class="item">
          <span class="icon iconfont icon-gouxuan"></span>
          <span class="txt">身份认证</span>
        </div>
        <div class="item">
          <span class="icon iconfont icon-gouxuan"></span>
          <span class="txt">学历认证</span>
        </div>
        <div class="item">
          <span class="icon iconfont icon-gouxuan"></span>
          <span class="txt">教师资格</span>
        </div>
      </div>
      <div class="teacher-info">
        <div class="info-one info">
          <div class="title">
            <div class="text">基本信息</div>
          </div>
          <div class="content-info">
            <div class="grade">所在年级: 大二</div>
            <div class="native-place">籍贯所在: 广东省,东莞市，虎门镇</div>
            <div class="school">所在学校: 深圳大学</div>
            <div class="major">所学专业: 数学与应用数学 金融学</div>
          </div>
        </div>
        <div class="info-two info">
          <div class="title">
            <div class="text">教学特点</div>
            <div class="specialty">
              <span class="item">备课充分</span>
              <span class="item">有针对性</span>
              <span class="item">有效果</span>
            </div>
          </div>
        </div>
        <!-- <div class="info-three info">
          <div class="title">
            <div class="text">教学经历</div>
          </div>
          <div class="content-info">

          </div>
        </div> -->
      </div>
    </div>
  </div>
</template> 

<script>
  import Banner from '../index/components/banner'
  import { getDetail } from './services'
  export default {
    data() {
      return {
        dataInfo: {}
      }
    },
    computed: {
      subject() {
        return this.dataInfo.teach_subject && this.dataInfo.teach_subject.join('/')
      },
    },
    onLoad(options) {
      // this.id = options.id
      this.id = "5c07f736cdfcef024a960fc3"
    },
    mounted() {
      this._getDetail()
    },
    methods: {
      async _getDetail() {
        const res = await getDetail({_id: this.id})
        this.dataInfo = res.data[0]
        console.log(this.dataInfo)
      }
    },
    components: {
      Banner
    }
  }
</script>

<style lang='stylus' scoped>
  .detail
    .tips
      height 38px
      line-height 38px
      text-align center
      background #f7f7f7
      color #92c1ef 
    .content
      .section1
        padding 0 8px
        .title
          display flex
          align-items center
          height 38px
          border-bottom 1px solid #e7e7e7
          .title-img
            width 25px
            margin-right 10px
          .name
            color #333
          .price
            margin-left auto 
            color #b43d33
        .teachList
          position relative
          margin-top 10px
          padding-bottom 10px
          color #6b6b6b
          line-height 20px
          border-bottom 1px solid #e7e7e7
          .status
            color #fff
            position absolute 
            right 12px
            top 0px
            width 70px 
            height 25px
            line-height 25px
            text-align center
            background #81c7f9
            border-radius 4px
      .identify
        padding 0 8px
        display flex
        justify-content space-around
        align-items center
        height 44px
        border-bottom 1px solid #f5f5f5
        .item
          .icon 
            color #81c7f9
            margin-right 10px
      .teacher-info
        padding 0 8px
        .info
          .title
            display flex
            align-items center
            height 38px
            border-bottom 1px solid #e7e7e7
            .text
              font-weight 600
            &::before
              display inline-block
              content ''
              width 3px
              height 18px
              background #81c7f9
              margin-right 8px
          .content-info
            color #6b6b6b
            padding 12px 0
            line-height 20px

</style>