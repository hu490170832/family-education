<template>
  <div class="teacherList">
    <Teacher v-for="item in teacherList" :key="item.id" :data='item' />
  </div>
</template>

<script>
  import Teacher from '../teacher'
  export default {
    props:['teacherList'],
    components: {
      Teacher
    }
  }
</script>

<style lang='stylus' scoped>
  .teacherList
    background: #f6f6f6;

</style>