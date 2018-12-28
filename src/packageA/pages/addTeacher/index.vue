<template>
  <div class='main'>
    <div class="zan-panel-title">基本信息</div>
    <div class="zan-panel">
      <zan-field v-model="name" title="姓名" placeholder='请输入您的名字'/>
      <zan-field title="手机号" placeholder='请输入您的手机号'/>
      <zan-field title="性别" placeholder='请输入您的性别'/>
      <zan-field title="年级" placeholder='请输入您的年级'/>
      <zan-field title="微信号" placeholder='请输入您的微信号'/>
      <zan-field title="所在学校" placeholder='请输入您的所在学校'/>
      <zan-field title="所在专业" placeholder='请输入您的所在专业'/>
      <zan-pick :onClick="chooseRegion" title="籍贯" :placeholder="region || '请选择籍贯'"/>
      <mp-citypicker ref="mpCityPicker" @onConfirm="selectCity"></mp-citypicker>
    </div>
  </div>
</template>

<script>
  import ZanField from '@/components/zan/field'
  import ZanPick from '@/components/zan/pick'
  import mpCitypicker from 'mpvue-weui/src/city-picker'
  export default {
    data() {
      return {
        region: '',
        name: ''
      }
    },
    components: {
      ZanField,
      ZanPick,
      mpCitypicker
    },
    methods: {
      chooseRegion() {
        this.$refs.mpCityPicker.show();
      },
      selectCity(data) {
        this.region = data.label
      }
    }
  }
</script>

<style scoped>
</style>