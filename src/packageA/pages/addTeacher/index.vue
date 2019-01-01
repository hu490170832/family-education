<template>
  <div class='main'>
    <div class="zan-panel-title">基本信息</div>
    <div class="zan-panel">
      <zan-field ref="name" :isrequire='true' title="姓名" placeholder='请输入您的名字'/>
      <zan-field ref="tel" title="手机号" :isrequire='true' placeholder='请输入您的手机号'/>
      <zan-pick @click="choosePicker('sex')" :isrequire='true' title="性别" :placeholder="sex || '请选择您的性别'"/>
      <zan-pick @click="choosePicker('grade')" :isrequire='true' title="年级" :placeholder="grade || '请选择您的年级'"/>
      <zan-field ref="wechat" title="微信号" :isrequire='true' placeholder='请输入您的微信号'/>
      <zan-field ref="school" title="所在学校" :isrequire='true' placeholder='请输入您的所在学校'/>
      <zan-field ref="major" title="所在专业" placeholder='请输入您的所在专业'/>
      <zan-pick @click="choosePicker('region')" :isrequire='true' title="籍贯" :placeholder="region || '请选择籍贯'"/>
      <mp-citypicker ref="region" @onConfirm="selectPicker('region',$event)"></mp-citypicker>
      <mp-picker :pickerValueArray="pickerValueArray" ref="sex" @onConfirm="selectPicker('sex',$event)"></mp-picker>
      <mp-picker :pickerValueArray="gradeArray" ref="grade" @onConfirm="selectPicker('grade',$event)"></mp-picker>
    </div>
    <div class="zan-panel-title">授课信息</div>
    <div class="zan-panel">
      <zan-pick @click="choosePicker('teach_grade')" title="授课年级" :isrequire='true' :placeholder="(teach_grade.length && teach_grade ) || '请选择授课年级'"/>
      <zan-pick @click="choosePicker('teach_subject')" title="授课科目" :isrequire='true' :placeholder="(teach_subject.length && teach_subject) || '请选择授课科目'"/>
      <zan-pick @click="choosePicker('teach_area')" title="授课区域" :isrequire='true' :placeholder="teach_area || '请选择授课区域'"/>
      <zan-field ref="min_wage" title="预期时薪" :isrequire='true' placeholder='请输入您的预期时薪'/>
      <zan-pick :isrequire='true' @click="choosePicker('teach_time')" title="上课时间" :placeholder="( teach_time.length && teach_time) || '请选择授课时间'"/>
      <picker-list ref="teach_grade" :pickerValueArray="teachGradeArray" @onConfirm="pickerList($event,'teach_grade')" />
      <picker-list ref="teach_time" :pickerValueArray="teachTimeArray" @onConfirm="pickerList($event,'teach_time')" />
      <picker-list ref="teach_subject" :pickerValueArray="teachSubjectArray" @onConfirm="pickerList($event,'teach_subject')" />
      <mp-citypicker ref="teach_area" @onConfirm="selectPicker('teach_area',$event)"></mp-citypicker>
    </div>
    <div class="zan-panel-title"><span style="color: #e93b1c" class="txt">*</span>教学特点(至少一个，最多可选择三个)</div>
    <div class="zan-panel">
      <div class="characteristics">
        <span v-for="(item,index) in characteristics" :key="index" @click="chooseCharacter(index)" :class="{active: item.checked}" class="item">{{item.txt}}</span>
      </div>
    </div>
    <div class="experience-list" :key="index" v-for="(item,index) in teach_experienceList">
      <div class="zan-panel-title teach_title">
        <div class="txt">教学经历</div>
        <div class="del" @click="delExperience(index)" v-show="index!==0">删除</div>
      </div>
      <div class="zan-panel">
        <div class="teach_experience">
          <zan-pick @click="chooseDataPicker('startTime'+index)" title="开始时间" :placeholder="item.start_time || '选择开始时间'"/>
          <zan-pick @click="chooseDataPicker('endTime'+index)" title="结束时间" :placeholder="item.stop_time || '选择结束时间'"/>
          <mp-datepicker :ref='"startTime"+index' @onConfirm="teachStartTime(index,$event)" />
          <mp-datepicker :ref='"endTime"+index' @onConfirm="teachEndTime(index,$event)" />
          <zan-field :ref="'description'+index" type='textarea' placeholder='请输入教学经历及辅导效果(例如,深圳市高级中学，孙同学，在被我辅导期间，成绩从班级20到班级前三，并顺利考上深圳大学)'/>
        </div>
      </div>
    </div>
    <mp-button @click='addExperience' type="primary" size="large" btnClass="mb15">增加教学经历</mp-button>
    <div class="zan-panel-title">教学心得</div>
    <div class="zan-panel">
      <zan-field ref='teach_review' type='textarea' placeholder='请输入教学心得(20个字以内)'/>
    </div>
    <div class="zan-panel-title">个人介绍</div>
    <div class="zan-panel introductTextArea">
      <zan-field ref="introduction" type='textarea' placeholder='请输入个人介绍( 例如，个人介绍、特点、以及中高考成绩，特别是相关科目的成绩，或者初中、高中、大学获得的奖项！)'/>
    </div>
    <div class="zan-panel-title">老师头像</div>
    <div class="zan-panel imgUploader">
      <mp-uploader @upLoadSuccess='upLoadSuccess' @uploadDelete='uploadDelete' :maxLength='1' :showTip='false' />
    </div>
    <mp-button @click='save' type="primary" size="large" btnClass="mb15">保存</mp-button>
  </div>
</template>

<script>
  import ZanField from '@/components/zan/field'
  import ZanPick from '@/components/zan/pick'
  import mpCitypicker from 'mpvue-weui/src/city-picker'
  import mpPicker from 'mpvue-weui/src/picker';
  import mpDatepicker from 'mpvue-weui/src/date-picker';
  import pickerList from '@/components/pickList'
  import mpButton from 'mpvue-weui/src/button';
  import mpUploader from 'mpvue-weui/src/uploader';
  import { addTeacher } from './services'
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
        ],
        teachTimeArray: [
          {
            name: '周一上午',
            value: '周一上午',
            checked: false
          },
          {
            name: '周一下午',
            value: '周一下午',
            checked: false
          },
          {
            name: '周一晚上',
            value: '周一晚上',
            checked: false
          },
          {
            name: '周二上午',
            value: '周二上午',
            checked: false
          },
          {
            name: '周二下午',
            value: '周二下午',
            checked: false
          },
          {
            name: '周二晚上',
            value: '周二晚上',
            checked: false
          },
          {
            name: '周三上午',
            value: '周三上午',
            checked: false
          },
          {
            name: '周三下午',
            value: '周三下午',
            checked: false
          },
          {
            name: '周三晚上',
            value: '周三晚上',
            checked: false
          },
          {
            name: '周四上午',
            value: '周四上午',
            checked: false
          },
          {
            name: '周四下午',
            value: '周四下午',
            checked: false
          },
          {
            name: '周四晚上',
            value: '周四晚上',
            checked: false
          },
          {
            name: '周五上午',
            value: '周五上午',
            checked: false
          },
          {
            name: '周五下午',
            value: '周五下午',
            checked: false
          },
          {
            name: '周五晚上',
            value: '周五晚上',
            checked: false
          },
          {
            name: '周六上午',
            value: '周六上午',
            checked: false
          },
          {
            name: '周六下午',
            value: '周六下午',
            checked: false
          },
          {
            name: '周六晚上',
            value: '周六晚上',
            checked: false
          },
          {
            name: '周日上午',
            value: '周日上午',
            checked: false
          },
          {
            name: '周日下午',
            value: '周日下午',
            checked: false
          },
          {
            name: '周日晚上',
            value: '周日晚上',
            checked: false
          },
        ],
        teachSubjectArray: [
          {
            name: '语文',
            value: '语文',
            checked: false
          },
          {
            name: '数学',
            value: '数学',
            checked: false
          },
          {
            name: '英语',
            value: '英语',
            checked: false
          },
          {
            name: '物理',
            value: '物理',
            checked: false
          },
          {
            name: '化学',
            value: '化学',
            checked: false
          },
          {
            name: '生物',
            value: '生物',
            checked: false
          },
          {
            name: '地理',
            value: '地理',
            checked: false
          },
          {
            name: '奥数',
            value: '奥数',
            checked: false
          },
          {
            name: '文综',
            value: '文综',
            checked: false
          },
          {
            name: '其他',
            value: '其他',
            checked: false
          },
        ],
        characteristics: [
          {
            txt: '善于沟通',
            checked: false
          },{
            txt: '全英授课',
            checked: false
          },{
            txt: '亲和力强',
            checked: false
          },{
            txt: '备课充分',
            checked: false
          },{
            txt: '幽默风趣',
            checked: false
          },{
            txt: '有效果',
            checked: false
          },{
            txt: '有针对性',
            checked: false
          },{
            txt: '会粤语',
            checked: false
          },{
            txt: '严格',
            checked: false
          }
        ],
        teach_experienceList:[
          {
            start_time: '',
            stop_time: '',
            description: ''
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
      pickerList,
      mpButton,
      mpUploader
    },
    methods: {
      choosePicker(name) {
        this.$refs[name].show()
      },
      chooseDataPicker(name) {
        this.$refs[name][0].show()
      },
      selectPicker(name,data) {
        this[name] = data.label
      },
      pickerList(data,name) {
        this[name] = data
      },
      chooseCharacter(index) {
        let activeCount = 0
        this.characteristics.forEach(v=>{
          if(v.checked) {
            activeCount++
          }
        })
        if(activeCount < 3 || (this.characteristics[index].checked && activeCount==3)) {
          this.$set(this.characteristics[index],'checked',!this.characteristics[index].checked)
        }
      },
      teachStartTime(index,data) {
        this.$set(this.teach_experienceList[index],'start_time',data.value)
      },
      teachEndTime(index,data) { 
        this.$set(this.teach_experienceList[index],'stop_time',data.value)
      },
      delExperience(index) {
        this.teach_experienceList.splice(index,1)
      },
      addExperience() {
        this.teach_experienceList.push(
          {
            start_time: '',
            stop_time: '',
            description: ''
          }
        )
      },
      async upLoadSuccess(successRes) {
        let filePath = successRes.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        const self = this
        wx.showLoading({
          title: '上传中',
        })
        wx.cloud.uploadFile({
          cloudPath,//云存储图片名字
          filePath,//临时路径
          success: res => {
            wx.hideLoading()
            self.icon = res.fileID
          }
        })
      },
      async save() {
        const teach_experienceList = this.teach_experienceList.map((item,index)=>{
          item.description = this.$refs[`description${index}`][0]._value
          return item
        })
        const teach_feature = this.characteristics.filter(v=>v.checked).map(v=>v.txt)
        const data = {
          name: this.$refs.name._value,
          tel: this.$refs.tel._value,
          sex: this.sex,
          grade: this.grade,
          wechat: this.$refs.wechat._value,
          school: this.$refs.school._value,
          major: this.$refs.major._value,
          region: this.region.split('-'),
          teach_grade: this.teach_grade,
          teach_subject: this.teach_subject,
          teach_area: this.teach_area,
          min_wage: this.$refs.min_wage._value,
          teach_time: this.teach_time,
          teach_feature,
          teach_experienceList,
          teach_review: this.$refs.teach_review._value,
          introduction: this.$refs.introduction._value,
          icon: this.icon
        }
        const res = await addTeacher(data)
        if(res.code==0) {
          wx.switchTab({
            url: '/pages/index/mian'
          })
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .zan-panel-title
    background #f5f5f5
    padding 10px 15px
  .zan-panel
    margin-top 0
  .characteristics 
    display flex
    flex-wrap wrap
    padding 20px 40px
    justify-content space-between
    .item
      width 74px
      height 25px
      margin-bottom 15px
      line-height 25px
      text-align center  
      border 1px solid #81c7f9
      border-radius 2px
      color #81c7f9
      &.active 
        color #ffffff
        background #81c7f9
  .teach_title 
    display flex
    justify-content space-between
    .del
      color #81c7f9
  >>>.mb15 {
    background: #1f9dd7 !important;
  }
  .teach_experience
    border-bottom 1px solid #efefef
    >>>.textarea 
      min-height: 80px;
      line-height: 1.4px
  .introductTextArea
    >>>.textarea
      min-height: 80px;
      line-height: 1.4px
  .imgUploader
    padding 20px
  >>>.weui-uploader__img
    width 75px
</style>