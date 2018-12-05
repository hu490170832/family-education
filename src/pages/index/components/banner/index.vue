<template>
  <div class="banner">
    <swiper class="swiper" :autoplay="true" 
        :indicator-dots='true'
        indicator-active-color='#1f9dd7'
        :circular='true'
        >
        <block v-for="(item,index) in bannerList" :key="index">
            <swiper-item>
                <img mode='widthFix' :src="item" alt="">
            </swiper-item>
        </block>
    </swiper>
  </div>
</template>

<script>
  const banner1 = require('@/assets/img/banner1.jpg')
  const banner2 = require('@/assets/img/banner2.jpg')
  export default {
    data() {
      return {
        bannerList: [banner1, banner2]
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .banner
    .swiper
      height 168px
      image
        width 100%

</style>