<template>
  <div id="filter" class="filter" :class="{lockScroll: tableIndex==0 || tableIndex==1 || tableIndex == 2}">
    <div class="cover" @touchmove.stop @click="coverClick" v-show="tableIndex!=-1"></div>
    <div class="filter-tab">
      <div class="tab-item" :class="{active: tableIndex==0}" @click="tabClick(0)">
        <span class="txt">{{moneySortText || '时薪高低'}}</span>
        <span class="icon iconfont icon-xiajiantou"></span>
        <span class="line"></span>
      </div>
      <div class="tab-item" :class="{active: tableIndex==1}" @click="tabClick(1)">
        <span class="txt">{{areaSortText || '授课区域'}}</span>
        <span class="icon iconfont icon-xiajiantou"></span>
        <span class="line"></span>
      </div>
      <div class="tab-item" :class="{active: tableIndex==2}" @click="tabClick(2)">
        <span class="txt">筛选</span>
        <span class="icon iconfont icon-xiajiantou"></span>
      </div>
    </div>
    <div class="tab-content" @click.stop >
        <div class="content-item content-one" :class="{show: tableIndex==0}">
          <div class="list">
            <div class="item" v-for="(item,index) in moneySortList" :key="item.value" @click="moneySort(index,item)" :class="{active: cruuentIndex==index}">
              <span class="txt">{{item.text}}</span>
              <span class="icon iconfont icon-gou"></span>
            </div>
          </div>
        </div>
        <div class="content-item content-two" :class="{show: tableIndex==1}">
          <scroll-view scroll-y class="cityList">
            <div class="item" v-for="(item,index) in cityList" :key="index" @click="cityChange(index)" :class="{active: cityIndex==index}">{{item.name}}</div>
          </scroll-view>
          <scroll-view scroll-y class="areaList">
            <div class="area" :class="{active: areaIndex == index}" @click="areaClick(index,item)" v-for="(item,index) in areaList" :key="index">{{item.name}}</div>
          </scroll-view>
        </div>
        <div class="content-item content-three" :class="{show: tableIndex==2}">
          <div class="sex">
            <div class="title">老师性别</div>
            <div class="list">
              <span @click="sexChange(index)" v-for="(item,index) in sexList" :key="index" class="item" :class="{active: sexIndex==index}">{{item.text}}</span>
            </div>
          </div>
          <div class="grade">
            <div class="title">授课年级</div>
            <div class="list">
              <span @click="gradeChange(index)" v-for="(item,index) in gradeList" :key="index" class="item" :class="{active: gradeIndex==index}">{{item.text}}</span>
            </div>
          </div>
          <div class="subject">
            <div class="title">授课科目</div>
            <div class="list">
              <span @click="subjectChange(index)" v-for="(item,index) in subjectList" :key="index" class="item" :class="{active: item.checked}">{{item.text}}</span>
            </div>
          </div>
          <div class="bottom">
            <span @click="reset" class="btn reset">重置</span>
            <span @click="confirm" class="btn confirm">确定</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import {
    throttle
  } from "@/utils"
  import {
    moneySortList
  } from '@/common/enum'
  import {
    mapState
  } from 'vuex'
  import {
    setTimeout
  } from 'timers';
  import { sexList, gradeList, subjectList } from '@/common/enum'
  export default {
    data() {
      return {
        catchUp: false,
        tableIndex: -1,
        cruuentIndex: 0,
        cityIndex: 0,
        areaIndex: -1,
        sexIndex: 0,
        gradeIndex: -1,
        activeAreaList: [],
        sexList: [],
        gradeList: [],
        subjectList: [],
        moneySortText: '',
        areaSortText: ''
      };
    },
    computed: {
      ...mapState('frame', ['dict']),
      moneySortList() {
        const dictItem = this.dict.find(v => v.hasOwnProperty('moneySortList'))
        const ret = dictItem && dictItem.moneySortList
        return ret || []
      },
      cityList() {
        const dictItem = this.dict.find(v => v.hasOwnProperty('cityList'))
        const ret = dictItem && dictItem.cityList
        return ret || []
      },
      areaList() {
        if (this.activeAreaList.length) {
          return this.activeAreaList
        }
        return this.cityList[0] ? this.cityList[0].areaList : []
      }
    },
    created() {
      this.sexList = sexList.toArray()
      this.subjectList = subjectList.toArray().map(v=>{
        v.checked = false
        return v
      })
      this.gradeList = gradeList.toArray()
    },
    async mounted() {
      this.moneySortList = moneySortList.toArray()
      this.fillterOffsetTop = await this._getFilterTop()
    },
    methods: {
      coverClick() {
        this.tableIndex = -1
      },
      async tabClick(index) {
        if (index == this.tableIndex) {
          this.tableIndex = -1
        } else {
          const filterTop = await this._getFilterTop()
          if (filterTop != 0) {
            wx.pageScrollTo({
              scrollTop: this.fillterOffsetTop,
              duration: 0
            })
          }
          this.tableIndex = index
        }
      },
      cityChange(index) {
        this.cityIndex = index
        this.activeAreaList = this.cityList[index].areaList
      },
      areaClick(index,item) {
        const { name } = item
        this.areaIndex = index
        this.areaSortText = name
        this.$emit('filterList',{area: name})
        this.tableIndex = -1
      },
      moneySort(index, item) {
        const { text,value } = item
        if (index !== this.cruuentIndex) {
          this.cruuentIndex = index
          this.$emit('filterList', {
            moneySortType: value
          })
          this.moneySortText = text
        }
        this.tableIndex = -1
      },
      sexChange(index) {
        this.sexIndex = index
      },
      gradeChange(index) {
        if(this.gradeIndex == index) {
          this.gradeIndex = -1
          return
        }
        this.gradeIndex = index
      },
      subjectChange(index) {
        const checked = this.subjectList[index].checked
        this.$set(this.subjectList[index],'checked',!checked)
      },
      reset() {
        this.sexIndex = 0,
        this.gradeIndex = -1
        this.subjectList = this.subjectList.map(v=>{
          v.checked = false
          return v
        })
      },
      confirm() {
        let sex = this.sexList[this.sexIndex] && this.sexList[this.sexIndex].text
        const targetGrade = this.gradeList[this.gradeIndex] && this.gradeList[this.gradeIndex].text
        const tragetSubjectList = this.subjectList.filter(v=>v.checked).map(v=>v.text)
        sex = sex=='不限' ? '' : sex
        this.$emit('filterList',{sex,targetGrade,tragetSubjectList})
        this.tableIndex = -1
      },
      _getFilterTop() {
        return new Promise((resolve, reject) => {
          const query = wx.createSelectorQuery()
          query.select('#filter').boundingClientRect()
          query.selectViewport().scrollOffset()
          query.exec(res => {
            resolve(res[0].top)
          })
        })
      }
    }
  };
</script>

<style lang='stylus' scoped>
.filter {
  position: sticky;
  top: 0;
  background #fff
  &.lockScroll {
    position fixed
    width 100%
    z-index 99
  }
  .cover {
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    background rgba(0,0,0,.3)
    z-index 1
  }
  .filter-tab {
    position relative
    z-index 2
    background #fff
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    .tab-item {
      position: relative;
      font-size: 14px;
      color: #333;
      display: flex;
      width: 33%;
      box-sizing: border-box;
      justify-content: center;
      align-items: center;
      height: 35px;
      &.active {
        color #7fc6fe
        .icon {
          color #7fc6fe
          transform rotate(180deg)
        }
      }
      .line {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 16px;
        background: #ccc;
      }

      .txt {
        margin-right: 6px;
      }

      .icon {
        position: relative;
        top: 1px;
      }
    }
  }
  .tab-content {
    position fixed
    z-index 2
    background #fff
    top 36px
    width 100%
    .content-item {
      display none
      &.show {
        display block
      }
    }
    .content-one {
      .list {
        .item {
          height 40px
          display flex
          align-items center
          justify-content space-between
          border-bottom 1px solid #e0e0e0
          padding 0 15px
          .icon {
            display none
          }
          &.active {
            color #7fc6fe
            .icon {
              display block
              color #7fc6fe
            }
          }
        }
      }
    }
    .content-two {
      display none
      &.active {
        display block
      }
      .cityList {
        width 30%
        float left
        height 300px
        overflow-y scroll
        .item {
          height 40px
          line-height 40px
          text-align center
          &.active {
            color #69cafd
            background #f5f5f5
          }
        }
          
      }
      .areaList {
        height 300px
        float left
        overflow-y scroll
        background #f5f5f5
        padding-left 30px
        box-sizing border-box
        width 70%
        .area {
          height 40px
          line-height 40px
          &.active {
            color #69cafd
          }
        }
      }
    }
    .content-three {
      padding-top 15px
      .sex,.grade,.subject {
        margin-bottom 15px
        padding-left 15px
        .title {
          color #6b6b6b
          margin-bottom 14px
        }
        .list {
          display flex
          flex-wrap wrap
        }
        .item {
          width 74px
          height 25px
          margin-right 15px
          margin-bottom 15px
          line-height 25px
          text-align center  
          border 1px solid #81c7f9
          border-radius 2px
          color #81c7f9
          &:nth-of-type(4n) {
            margin-right 0
          }
          &.active {
            color #ffffff
            background #81c7f9
          }
        }
      }
      .bottom {
        display flex
        justify-content space-between
        height 60px
        background #f5f5f5
        padding 15px
        box-sizing border-box
        .btn {
          width 60px
          height 32px
          border-radius 2px 
          text-align center
          line-height 32px
        }
        .reset {
          color #6b6b6b
          background #fff
          border 1px solid #e7e7e7
        }
        .confirm {
          color #fff
          background #4b9ad0
        }
      }
    }
  }
}
</style>