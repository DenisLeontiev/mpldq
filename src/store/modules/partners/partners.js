import { FETCH_PARTNERS } from '../../mutations-types'

const state = {
    partnersList: []
}

const getters = {
    partnersList: state => {
        return state.partnersList;
    }
}

const mutations = {
    [FETCH_PARTNERS](state, list) {
        state.partnersList = list;
    }
}

const actions = {
    async loadPartnersList({ commit }) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/partners`
        );
        const data = await response.json();

        commit(FETCH_PARTNERS, data);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}