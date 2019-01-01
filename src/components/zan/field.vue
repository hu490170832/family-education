<template>
    <div class="zan-cell zan-field"
         :class="{ 'zan-field--error': error , 'zan-field--wrapped': mode === 'wrapped' }">
      <span v-if="title && isrequire" class="isrequire">*</span>
      <div
        v-if="title"
        class="zan-cell__hd zan-field__title">{{ title }}</div>
      <textarea
        v-if="type === 'textarea'"
        auto-height
        :name="name || componentId || ''"
        :value="value"
        :focus="focus"
        :key="'textarea-'+componentId"
        :placeholder="placeholder"
        class="zan-field__input zan-cell__bd textarea"
        :class="{ 'zan-field__input--right' : right }"
        placeholder-class="zan-field__placeholder"
        @change="_handleZanFieldChange"
        @focus="_handleZanFieldFocus"
        @blur="_handleZanFieldBlur"
        :data-component-id="componentId || ''"></textarea>
      <input
        v-else
        :type="inputType || 'text'"
        :name="name || componentId || ''"
        :value="value"
        :focus="focus"
        :key="'input-'+componentId"
        :placeholder="placeholder"
        class="zan-field__input zan-cell__bd"
        :class="{ 'zan-field__input--right' : right }"
        placeholder-class="zan-field__placeholder"
        @change="_handleZanFieldChange"
        @focus="_handleZanFieldFocus"
        @blur="_handleZanFieldBlur"
        :data-component-id="componentId || ''"/>
    </div>
</template>

<script>
  import {extractComponentId} from '../../utils/helper'
  const EVENT_INPUT = 'input'
  const EVENT_CHANGE = 'change'
  const EVENT_BLUR = 'blur'
  const EVENT_FOCUS = 'focus'
  export default {
    props: {
      error: Boolean,
      mode: String,
      isrequire: Boolean,
      title: String,
      type: String,
      focus: {default: false,type:Boolean},
      name: String,
      componentId: String,
      value: String,
      inputType: String,
      right: Boolean,
      placeholder: String,
      handleZanFieldChange: Function,
      handleZanFieldFocus: Function,
      handleZanFieldBlur: Function
    },
    methods: {
      _handleZanFieldChange (e) {
        this.$emit(EVENT_CHANGE,e.target.value)
      },
      _handleZanFieldFocus (e) {
        this.$emit(EVENT_FOCUS,e)
      },
      _handleZanFieldBlur (e) {
        this.$emit(EVENT_BLUR,e)
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .isrequire 
    color #e93b1c
</style>
