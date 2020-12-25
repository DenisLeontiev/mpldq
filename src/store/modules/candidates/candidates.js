import { FETCH_CANDIDATES, SET_CANDIDATES_LOADER } from '../../mutations-types'

const state = {
    loader: true,
    candidatesList: []
}

const getters = {
    candidatesList: state => state.candidatesList,
    candidatesLoader: state => state.loader,
}

const mutations = {
    [FETCH_CANDIDATES](state, list) {
        state.candidatesList = list;
    },

    [SET_CANDIDATES_LOADER](state, payload) {
        state.loader = payload;
    }
}

const actions = {
    async loadCandidatesList({ commit }) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/participants`
        );

        let data = await response.json();
        data = data.filter(item => item.user);

        commit(FETCH_CANDIDATES, data);
        commit(SET_CANDIDATES_LOADER, false);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}