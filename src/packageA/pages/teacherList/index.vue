<template>
  <div class="teacherList">
    <van-cell v-for="item in list" :key="item.id" :title="item.name">
      <van-button type="danger">删除</van-button>
    </van-cell>
  </div>
</template>

<script>
  import { getList } from './services'
  export default {
    data() {
      return {
        list: []
      }
    },
    mounted() {
      this._getList()
    },
    methods: {
      async _getList() {
        const res = await getList()
        this.list = res.data
        console.log(this.list)
      }
    }
  }
</script>

<style scoped>

</style>