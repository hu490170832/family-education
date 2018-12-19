import * as types from './mutation-types'

const mutations = {
    [types.SET_DICT](state, dict) {
        state.dict = dict
    }
}

export default mutations