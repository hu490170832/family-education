<template>
  <div class='main'>
    <div v-for="(group, idx) in list" :key="title">
      <div class="zan-panel-title">{{ group.title }}</div>
      <div class="zan-panel">
        <a v-for="(item, itemidx) in group.content" :key="name" class="zan-cell zan-cell--access" :href="item.path">
          <div class="zan-cell__bd">{{ item.name }}</div>
          <div class="zan-cell__ft"></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import componentsConfig from './config'
export default {
  data() {
    return {
      list: componentsConfig
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>