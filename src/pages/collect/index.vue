<template>
  <div class="collect">
    <div class="list">
      <teacher-list :teacherList='collectList' />
      <div class="notMore">没有更多课程了哦</div>
    </div>
  </div>
</template>

<script>
  import TeacherList from '../index/components/teacherList'
  import { setTitleMixin } from '@/common/mixin'

  export default {
    mixins: [setTitleMixin],
    name: '收藏',
    data() {
      return {
        collectList: []
      }
    },
    created() {
      this.getCollectList()
    },
    methods: {
      getCollectList() {
        let collectList = wx.getStorageSync('collectList')
        collectList = collectList ? JSON.parse(collectList) : []
        this.collectList = collectList
      }
    },
    components: {
      TeacherList
    }
  }
</script>

<style lang='stylus' scoped>
  .collect
    height 100%
    background #f5f5f5
    .list
      .notMore
        text-align center
        color #ccc
</style>