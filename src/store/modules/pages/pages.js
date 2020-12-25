
import { SET_PAGE, SET_PAGES_LOADING } from '../../mutations-types'

const state = {
    page: null,
    laoder: false,
}

const getters = {
    pageData: state => state.page,
    pageLoader: state => state.laoder
}

const mutations = {
    [SET_PAGE](state, payload) {
        state.page = payload;
    },
    [SET_PAGES_LOADING](state, payload) {
        state.laoder = payload;
    }
}

const actions = {
    async loadPage({ commit }, url) {
        commit(SET_PAGES_LOADING, true);

        try {
            const response = await fetch(
                `${process.env.VUE_APP_API_URL}/pages${url}`
            );
            const data = await response.json();
    
            commit(SET_PAGE, data);
            commit(SET_PAGES_LOADING, false);
    
            if (response.ok) {
                return ({status: 200});
            } else {
                return ({status: 400});
            }
        } catch(error) {
            console.error(error);
            return ({status: error});
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}