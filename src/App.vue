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
@import "./assets/style/zanui.wxss";
.container::before {
  position: fixed;
  top: 0;
  left: 0;
  content: ' ';
  width: 100%;
  height: 1rpx;
  background-color: #e2e2e2;
  z-index: 5;
}
.doc-title {
  position: relative;
  padding: 15px 0;
  margin: 10px 15px;
  line-height: 25px;
  font-size: 25px;
  color: #666;
}
.doc-description {
  margin: 14px 0;
  padding: 0 15px;
  font-size: 14px;
  line-height: 20px;
  color: #666;
}
page {
  color: #333; 
  font-size: 14px;
  height: 100%;
}

</style>
