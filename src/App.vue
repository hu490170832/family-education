<script>
import { getDict } from './services'
import { mapMutations } from 'vuex'
export default {
  mounted() {
    this._getDict()
  },
  methods: {
    async _getDict() {
      const res = await getDict()
      this.setDict(res.data)
    },
    ...mapMutations('frame',{
      setDict: 'SET_DICT'
    })
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },
}
</script>

<style>
@import "./assets/font/iconfont.css";
page {
  color: #333; 
  font-size: 14px;
  height: 100%;
}

</style>
