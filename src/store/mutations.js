import * as types from './mutation-types'

const mutations = {
    [types.SET_GOODSINFO](state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}

export default mutations