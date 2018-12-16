<template>
  <div id="filter" class="filter">
    <div class="cover" @click="coverClick" @touchmove.stop v-show="tableIndex!=-1"></div>
    <div class="filter-tab">
      <div class="tab-item" :class="{active: tableIndex==0}" @click="tabClick(0)">
        <span class="txt">时薪高低</span>
        <span class="icon iconfont icon-xiajiantou"></span>
        <span class="line"></span>
      </div>
      <div class="tab-item" :class="{active: tableIndex==1}" @click="tabClick(1)">
        <span class="txt">授课区域</span>
        <span class="icon iconfont icon-xiajiantou"></span>
        <span class="line"></span>
      </div>
      <div class="tab-item" :class="{active: tableIndex==2}" @click="tabClick(2)">
        <span class="txt">筛选</span>
        <span class="icon iconfont icon-xiajiantou"></span>
      </div>
    </div>
    <div class="tab-content" @touchmove.stop>
      <div class="content-item content-one" :class="{show: tableIndex==0}">
        <div class="list">
          <div class="item" @click="itemClick(0)" :class="{active: cruuentIndex==0}">
            <span class="txt">全部</span>
            <span class="icon iconfont icon-gou"></span>
          </div>
          <div class="item" @click="itemClick(1)" :class="{active: cruuentIndex==1}"> 
            <span class="txt">时薪由高到低</span>
            <span class="icon iconfont icon-gou"></span>
          </div>
          <div class="item" @click="itemClick(2)" :class="{active: cruuentIndex==2}">
            <span class="txt">时薪由低到高</span>
            <span class="icon iconfont icon-gou"></span>
          </div>
        </div>
      </div>
      <div class="content-item content-two" :class="{show: tableIndex==1}">
        <div class="slide-menu">
          <div class="item">深圳市</div>
          <div class="item">广州市</div>
        </div>
        <div class="areaList">
          <div class="area">南山区</div>
          <div class="area">南山区</div>
          <div class="area">南山区</div>
          <div class="area">南山区</div>
          <div class="area">南山区</div>
          <div class="area">南山区</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from "@/utils";
export default {
  data() {
    return {
      catchUp: false,
      tableIndex: -1,
      cruuentIndex: 0
    };
  },
  async created() {
    this.fillterOffsetTop = await this._getFilterTop()
  },
  methods: {
    coverClick() {
      this.tableIndex = -1
    },
    async tabClick(index) {
      if(index == this.tableIndex) {
        this.tableIndex = -1
      }else {
        const filterTop = await this._getFilterTop()
        if(filterTop!=0) {
          wx.pageScrollTo({
            scrollTop: this.fillterOffsetTop,
            duration: 0
          })
        }
        this.tableIndex = index
      }
    },
    itemClick(index) {
      this.cruuentIndex = index
    },
    _getFilterTop() {
      return new Promise((resolve,reject)=>{
        const query = wx.createSelectorQuery()
        query.select('#filter').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(res=> {
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
  }
}
</style>