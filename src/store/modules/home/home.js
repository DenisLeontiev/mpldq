import { FETCH_HOME_META } from '../../mutations-types'

const state = {
    homeMeta: ''
}

const getters = {
    homeMeta: state => {
        return state.homeMeta
    }
}

const mutations = {
    [FETCH_HOME_META](state, metas) {
        state.homeMeta = metas
    }
}

const actions = {
    async fetchHomeMeta({ commit }) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/pages/home`
        );
        const data = await response.json();
            
        commit(FETCH_HOME_META, data.metas)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}