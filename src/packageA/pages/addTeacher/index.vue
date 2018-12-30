<template>
  <div class='main'>
    <div class="zan-panel-title">基本信息</div>
    <div class="zan-panel">
      <zan-field v-model="name" title="姓名" placeholder='请输入您的名字'/>
      <zan-field title="手机号" placeholder='请输入您的手机号'/>
      <zan-pick @click="choosePicker('sex')" title="性别" :placeholder="sex || '请选择您的性别'"/>
      <zan-pick @click="choosePicker('grade')" title="年级" :placeholder="grade || '请选择您的年级'"/>
      <zan-field title="微信号" placeholder='请输入您的微信号'/>
      <zan-field title="所在学校" placeholder='请输入您的所在学校'/>
      <zan-field title="所在专业" placeholder='请输入您的所在专业'/>
      <zan-pick @click="choosePicker('region')" title="籍贯" :placeholder="region || '请选择籍贯'"/>
      <mp-citypicker ref="region" @onConfirm="selectPicker('region')"></mp-citypicker>
      <mp-picker :pickerValueArray="pickerValueArray" ref="sex" @onConfirm="selectPicker('sex')"></mp-picker>
      <mp-picker :pickerValueArray="gradeArray" ref="grade" @onConfirm="selectPicker('grade')"></mp-picker>
    </div>

    <div class="zan-panel-title">授课信息</div>
    <div class="zan-panel">
      <zan-pick @click="choosePicker('teach_grade')" title="授课年级" :placeholder="teach_grade || '请选择授课年级'"/>
      <zan-pick @click="choosePicker('teach_subject')" title="授课科目" :placeholder="teach_subject || '请选择授课科目'"/>
      <zan-pick @click="choosePicker('teach_area')" title="授课区域" :placeholder="teach_area || '请选择授课区域'"/>
      
      <zan-field title="预期时薪" placeholder='请输入您的预期时薪'/>
      <zan-pick @click="choosePicker('teach_time')" title="上课时间" :placeholder="teach_time || '请选择授课时间'"/>
      
      <picker-list ref="teach_grade" :pickerValueArray="teachGradeArray" @onConfirm="pickerList($event,'teach_grade')" />
      <mp-picker :pickerValueArray="gradeArray" ref="teach_subject" @onConfirm="selectPicker('teach_subject')"></mp-picker>
      <mp-citypicker ref="teach_area" @onConfirm="selectPicker('teach_area')"></mp-citypicker>
      <mp-datepicker ref="teach_time" @onConfirm="selectPicker('teach_time')"></mp-datepicker>
    </div>
  </div>
</template>

<script>
  import ZanField from '@/components/zan/field'
  import ZanPick from '@/components/zan/pick'
  import mpCitypicker from 'mpvue-weui/src/city-picker'
  import mpPicker from 'mpvue-weui/src/picker';
  import mpDatepicker from 'mpvue-weui/src/date-picker';
  import pickerList from '@/components/pickList'
  export default {
    data() {
      return {
        region: '',
        name: '',
        sex: '',
        grade: '',
        teach_grade: '',
        teach_subject: '',
        teach_area: '',
        teach_time: '',
        pickerValueArray: [
          {
            label: '男',
            value: '男'
          },{
            label: '女',
            value: '女'
          }
        ],
        gradeArray: [
          {
            label: '其他'
          },
          {
            label: '大一'
          },
          {
            label: '大二'
          }
        ],
        teachGradeArray: [
          {
            name: '学前',
            value: '学前',
            checked: false
          },
          {
            name: '小学',
            value: '小学',
            checked: false
          },
          {
            name: '初中',
            value: '初中',
            checked: false
          },
          {
            name: '高中',
            value: '高中',
            checked: false
          },
          {
            name: '大学',
            value: '大学',
            checked: false
          },
          {
            name: '成人',
            value: '成人',
            checked: false
          },
          {
            name: '其他',
            value: '其他',
            checked: false
          }
        ]
      }
    },
    components: {
      ZanField,
      ZanPick,
      mpCitypicker,
      mpPicker,
      mpDatepicker,
      pickerList
    },
    methods: {
      choosePicker(name) {
        this.$refs[name].show()

      },
      selectPicker(data) {
        this[name] = data.label
      },
      pickerList(data,name) {
        this[name] = data
      }
    }
  }
</script>

<style scoped>
</style>