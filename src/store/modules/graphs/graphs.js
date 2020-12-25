import { FETCH_GRAPHS } from '../../mutations-types'

const state = {
    graphsList: []
}

const getters = {
    graphsList: state => {
        return state.graphsList;
    }
}

const mutations = {
    [FETCH_GRAPHS](state, list) {
        state.graphsList = list;
    }
}

const actions = {
    async loadGraphsList({ commit }) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/organizations/rank`
        );
        const data = await response.json();

        commit(FETCH_GRAPHS, data);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}