<template>
  <div class="home">
    <search-bar />
    <Banner />
    <Filter />
    <teacher-list :teacherList='teacherList' />
  </div>
</template>

<script>
import searchBar from './components/searchBar'
import Banner from './components/banner'
import Filter from './components/filter'
import TeacherList from './components/teacherList'
import { getTeacherList } from './services'
export default {
  data() {
    return {
      teacherList: []
    }
  },
  created() {
    this._getTeacherList()
  },
  methods: {
    async _getTeacherList() {
      const res = await getTeacherList()
      this.teacherList = res.data
      console.log(this.teacherList)
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
