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
          <div class="area">授课区域: {{teach_county}} </div>
          <div class="grade" v-show="dataInfo.grade">授课年级: {{teach_grade}} </div>
          <div class="jinyan">教育心得: {{dataInfo.teach_review || "无"}} </div>
          <div class="time">上课时间: {{dataInfo.teach_time || "无"}} </div>
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
            <div class="grade">所在年级: 2017届毕业生</div>
            <div class="native-place">籍贯所在: 内蒙古，鄂尔多斯市，东胜区</div>
            <div class="school">毕业院校: 深圳大北京师范大学珠海分校学</div>
            <div class="major">所学专业: 电气工程及其自动化</div>
          </div>
        </div>
        <div class="info-two info">
          <div class="title">
            <div class="text">教学特点</div>
            <div class="specialty">
              <span class="item" :key="index" v-for="(item,index) in dataInfo.teach_feature">{{item}}</span>
            </div>
          </div>
        </div>
        <div class="info-three info">
          <div class="title">
            <div class="text">教学经历</div>
          </div>
          <div class="content-info" :key="index" v-for="(item,index) in dataInfo.teach_exprience">
            <div class="experience">
              <div class="time">{{item.start_time}}-{{item.stop_time}}</div>
              <div class="experience-text">
                {{item.description}}
              </div>
            </div>
          </div>
        </div>
        <div class="introduce info">
          <div class="title">
            <div class="text">个人介绍</div>
          </div>
          <div class="content-info">
            获得英国纽卡斯尔大学、利物浦大学等三所世界百强名校预录取通知书，现工作于国家能源集团内蒙古东胜热电有限公司智慧电厂办公室，接触当前时代最前端云大物移智技术及产品。
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <button open-type='contact' class="service">
        <div class="icon iconfont icon-kefu"></div>
        <div class="text">客服</div>
      </button>
      <div class="collect" :class="{active: collectStatu}" @click="collect()">
        <div class="icon iconfont icon-shoucang"></div>
        <div class="text">收藏</div>
      </div>
      <div class="subscribe">预约课程</div>
      <div class="buy">立即购买</div>
    </div>
    <Button open-type="share" class="share" @click="share">
      <div class="icon iconfont icon-fenxiang"></div>
      <div class="text">分享</div>
    </Button>
  </div>
</template> 

<script>
  import Banner from '../index/components/banner'
  import { getDetail } from './services'
  import { setTitleMixin } from '@/common/mixin'
  export default {
    mixins: [setTitleMixin],
    name: '老师详情',
    data() {
      return {
        collectStatu: false,
        dataInfo: {}
      }
    },
    computed: {
      subject() {
        return this.dataInfo.teach_subject && this.dataInfo.teach_subject.join('/')
      },
      teach_grade() {
        return this.dataInfo.teach_grade && this.dataInfo.teach_grade.join('/')
      },
      teach_county() {
        return this.dataInfo.teach_county && this.dataInfo.teach_county.join('/')
      },
      region() {
        return this.dataInfo.region && this.dataInfo.region.join(',')
      }
    },
    onLoad(options) {
      this.id = options.id
      // this.id = "5c07f736cdfcef024a960fc3"
    },
    onShareAppMessage(res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '优等生计划',
        path: '/pages/index/main'
      }
    },
    mounted() {
      this._getDetail()
    },
    methods: {
      async _getDetail() {
        const res = await getDetail({_id: this.id})
        this.dataInfo = res.data[0]
        console.log(this.dataInfo)
        this.isCollect()
      },
      isCollect() {
        let collectList = wx.getStorageSync('collectList')
        collectList = collectList ? JSON.parse(collectList) : []
        const index = collectList.findIndex(v=> v._id == this.dataInfo._id)
        if(index!=-1) {
          this.collectStatu = true
        }else {
          this.collectStatu = false
        }
      },
      collect() {
        let collectList = wx.getStorageSync('collectList')
        collectList = collectList ? JSON.parse(collectList) : []
        const index = collectList.findIndex(v=>v._id==this.dataInfo._id)
        if(index!=-1) {
          collectList.splice(index,1)
        }else {
          collectList.push(this.dataInfo)
        }
        wx.setStorageSync('collectList',JSON.stringify(collectList))
        this.collectStatu = !this.collectStatu
        if(!this.collectStatu) {
          wx.showToast({
            title: '取消收藏',
            icon: 'success',
            duration: 2000
          })
        }else {
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    },
    components: {
      Banner
    }
  }
</script>

<style lang='stylus' scoped>
  .detail
    background #f5f5f5
    padding-bottom 60px
    .tips
      height 38px
      line-height 38px
      text-align center
      background #f7f7f7
      color #92c1ef 
    .content
      background #fff
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
          border-bottom 1px solid #f5f5f5
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
            .specialty
              display flex
              margin-left 12px
              .item
                width 70px
                height 25px
                text-align center
                line-height 25px
                background #81c7f9
                border-radius 4px
                color #fff
                font-size 14px
                margin-right 12px
          .content-info
            color #6b6b6b
            padding 12px 0
            line-height 20px
            .time
              color #81c7f9
    .bottom
      position fixed
      bottom 0
      width 100%
      height 54px
      display flex
      text-align center
      background #fff
      box-shadow 0 -2px 2px rgba(0,0,0,.1)
      .service
        width 55px
        color #81c7f9
        border-right 1px solid #e7e7e7
        display flex
        flex-direction column
        align-items center
        justify-content center
        background #fff
        font-size 14px
        padding 0
        line-height 1.2
        &::after
          border 0
        .icon
          color #81c7f9
      .collect
        width 55px
        color #dadada
        border-right 1px solid #e7e7e7
        display flex
        flex-direction column
        align-items center
        justify-content center
        &.active 
          color #f8de71
          .icon
            color #f8de71
        .icon
          color #dadada
      .subscribe
        width 100px
        background #f8de71
        text-align center
        line-height 54px
        color #fff
      .buy
        flex 1
        text-align center
        color #fff
        background #81c7f9
        line-height 54px
    .share
      width 52px
      height 52px
      border-radius 50%
      display flex
      align-items center
      justify-content center
      flex-direction column
      color #fff
      position fixed
      right 15px
      background #81c7f9
      bottom 125px
      padding 0
      line-height 1
      font-size 14px
      .icon
        font-size 25px
          
</style>