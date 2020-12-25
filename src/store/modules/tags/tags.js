import { FETCH_ALL_TAGS } from '../../mutations-types'

const state = {
    tagsList: []
}

const getters = {
    tagsList: state => {
        return state.tagsList
    }
}

const mutations = {
    [FETCH_ALL_TAGS](state, list) {
        state.tagsList = list
    }
}

const actions = {
    async fetchTagsList({ commit }) {
        const response = await fetch(
            `${process.env.VUE_APP_AUTH_URL}/api/tags/1`
        );
        const data = await response.json()

        commit(FETCH_ALL_TAGS, data.message)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}