<template>
  <div class="home">
    <search-bar />
    <Banner />
    <Filter @filterList='filterList' />
    <teacher-list :teacherList='teacherList' />
  </div>
</template>

<script>
import searchBar from './components/searchBar'
import Banner from './components/banner'
import Filter from './components/filter'
import TeacherList from './components/teacherList'
import { getTeacherList } from './services'
const defaultState = {
  param: {
    page: 0,
    pageSize: 10
  }
}
export default {
  data() {
    return {
      teacherList: [],
      lockScroll: false,
      hasData: true,
      ...defaultState
    }
  },
  created() {
    this._getTeacherList()
  },
  onReachBottom() {
    this.hasData && this.loadMore()
  },
  methods: {
    async _getTeacherList() {
      const res = await getTeacherList(this.param)
      this.teacherList = res.data
    },
    async filterList(data) {
      this.param.page = 0
      this.hasData = true
      this.param = {...this.param,...data}
      const res = await getTeacherList({...this.param})
      this.teacherList = res.data
    },
    async loadMore() {
      this.param.page++
      const res = await getTeacherList({...this.param})
      if(res.data.length) {
        this.teacherList = this.teacherList.concat(res.data)
      }else {
        this.hasData = false
      }
    }
  },
  components: {
    searchBar,
    Banner,
    Filter,
    TeacherList
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
