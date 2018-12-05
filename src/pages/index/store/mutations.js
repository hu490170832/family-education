import * as types from './mutation-types'

const mutations = {
    [types.SET_TEACHERLIST](state, list) {
        state.teacherList = list
    }
}

export default mutations