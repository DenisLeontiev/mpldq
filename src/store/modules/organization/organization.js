import { 
    FETCH_ORGANIZATION, 
    SET_ORGANIZATION_LOADER, 
    FETCH_ORGANIZATIONS,
    SET_ORGANIZATIONS_LOADER
} from '../../mutations-types';

const state = {
    organization: null,
    organizations: null,
    organizationLoader: false,
    organizationsLoader: false
}

const getters = {
    organization: state => state.organization,
    organizationLoader: state => state.organizationLoader,
    organizations: state => state.organizations,
    organizationsLoader: state => state.organizationsLoader
}

const mutations = {
    [FETCH_ORGANIZATIONS](state, payload) {
        state.organizations = payload;
    },
    [SET_ORGANIZATIONS_LOADER](state, payload) {
        state.organizationsLoader = payload;
    }, 
    [FETCH_ORGANIZATION](state, payload) {
        state.organization = payload;
    }, 
    [SET_ORGANIZATION_LOADER](state, payload) {
        state.organizationLoader = payload;
    }
}

const actions = {
    async loadOrganization({ commit }, url) {
        commit(SET_ORGANIZATION_LOADER, true);

        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/organizations/${url}`
        );
        const data = await response.json();
        delete data.competitions_stat.all;

        commit(FETCH_ORGANIZATION, data);
        commit(SET_ORGANIZATION_LOADER, false);
    },

    async loadOrganizations({ commit }) {
        commit(SET_ORGANIZATIONS_LOADER, true);

        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/organizations`
        );
        const data = await response.json();

        commit(SET_ORGANIZATIONS_LOADER, false);
        commit(FETCH_ORGANIZATIONS, data);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}