<template>
  <div class="zan-cell zan-cell--access" @click="onClick">
    <div class="zan-cell__bd pickTitle">{{title}}</div>
    <div class="placeholder" v-if="placeholder">{{placeholder}}</div>
    <div class="zan-cell__ft"></div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      placeholder: String
    },
    methods: {
      onClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .pickTitle
    min-width:65PX;
    padding-right:10PX;
    flex-grow 0 !important
  .placeholder
    color #808080
    flex 1

</style>