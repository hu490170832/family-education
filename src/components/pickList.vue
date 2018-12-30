<template>
  <div class="mpvue-picker">
    <div :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></div>
    <div class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
      <div class="mpvue-picker__hd">
        <div class="mpvue-picker__action" @click="pickerCancel">取消</div>
        <div class="mpvue-picker__action" @click="pickerConfirm">确定</div>
      </div>
      <!-- 单列 -->
      <picker-view indicator-style="height: 40px;" class="mpvue-picker-view">
        <checkbox-group class="checkbox-group" @change="checkboxChange">
          <label class="checkbox" :key="index" v-for="(item,index) in pickerList">
            <span :class="{active: item.checked}" class="txt">{{item.name}}</span>
            <checkbox :value="item.name" />
          </label>
        </checkbox-group>
      </picker-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPicker: false,
      pickerList: []
    };
  },
  props: {
    /* picker 数值 */
    pickerValueArray: {
      type: Array,
      default: []
    },
  },
  mounted() {
    this.pickerList = this.pickerValueArray
  },
  methods: {
    show() {
      this.showPicker = true;
    },
    maskClick() {
      this.pickerCancel();
    },
    pickerCancel() {
      this.showPicker = false;
    },
    pickerConfirm(e) {
      const pickList = this.pickerList.filter(v=>v.checked).map(v=>v.name)
      console.log(pickList)
      this.$emit('onConfirm', pickList);
      this.showPicker = false
    },
    checkboxChange(e) {
      const checkList = e.mp.detail.value
      this.pickerList = this.pickerList.map(v=>{
        if(checkList.includes(v.value)) {
          v.checked = true
        }else{
          v.checked = false
        }
        return v
      })
    },
  }
};
</script>

<style>
.pickerMask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.mpvue-picker-content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 3000;
}
.mpvue-picker-view-show {
  transform: translateY(0);
}
.mpvue-picker__hd {
  display: flex;
  padding: 9px 15px;
  background-color: #fff;
  position: relative;
  text-align: center;
  font-size: 17px;
}
.mpvue-picker__hd:after {
  content: ' ';
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}
.mpvue-picker__action {
  display: block;
  flex: 1;
  color: #1aad19;
}
.mpvue-picker__action:first-child {
  text-align: left;
  color: #888;
}
.mpvue-picker__action:last-child {
  text-align: right;
}
.picker-item {
  text-align: center;
  line-height: 40px;
}
.mpvue-picker-view {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 238px;
  background-color: rgba(255, 255, 255, 1);
  overflow-y: scroll;
}
.checkbox-group {
  width: 100%;
}

.checkbox {
  display: flex;
  justify-content: space-between;
  padding: 9px 15px;
  align-items: center;
}
.checkbox .txt {
  font-size: 16px;
  color: #999;
}
.checkbox .txt.active {
  color: #1aad19;
}
</style>
