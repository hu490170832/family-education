<template>
  <div class="teacherList">
    <Teacher v-for="(item,index) in teacherList" :key="index" :data='item' />
  </div>
</template>

<script>
  import Teacher from '../teacher'
  export default {
    props: {
      teacherList:{
        type: Array,
        default: []
      }
    },
    components: {
      Teacher
    },
  }
</script>

<style lang='stylus' scoped>
  .teacherList
    background: #f6f6f6;

</style>