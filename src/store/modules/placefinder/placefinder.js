import { FETCH_PLACEFINDER, FETCH_PLACEFINDER_LOCATION, SET_PLACEFINDER_LOADER } from '../../mutations-types'

const state = {
    placefinderList: [],
    locationList: [],
    loader: true,
}

const getters = {
    placefinderList: state => state.placefinderList,
    locationList: state => state.locationList,
    placefinderLoader: state => state.loader,
}

const mutations = {
    [FETCH_PLACEFINDER](state, list) {
        state.placefinderList = list;
    },

    [FETCH_PLACEFINDER_LOCATION](state, list) {
        state.locationList = list;
    },

    [SET_PLACEFINDER_LOADER](state, payload) {
        state.loader = payload;
    }
}

const actions = {
    async loadPlacefinderList({ commit }) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/clinics`
        );
        const data = await response.json();

        commit(FETCH_PLACEFINDER, data);
        commit(SET_PLACEFINDER_LOADER, false);
    },

    async loadLocationList({ commit }) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/clinics/locations`
        );
        const data = await response.json();

        commit(FETCH_PLACEFINDER_LOCATION, data);
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}