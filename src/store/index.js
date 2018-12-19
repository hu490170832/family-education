import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import frame from './modules/frame'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    frame: {
      namespaced: true,
      ...frame
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []   
})