import { FETCH_MENU_LIST } from '../../mutations-types'

const state = {
    navigationHeader: [],
    navigationFooter: [],
    footerInfo: [],
    footerSocials: []
}

const getters = {
    navigationHeader: state => {
        return state.navigationHeader
    },
    navigationFooter: state => {
        return state.navigationFooter
    },
    footerInfo: state => {
        return state.footerInfo
    },
    footerSocials: state => {
        return state.footerSocials
    }
}

const mutations = {
    [FETCH_MENU_LIST](state, {list, url}) {
        if(url === 'main-menu') {
            state.navigationHeader = list
        } else if (url === 'footer-menu') {
            state.navigationFooter = list
        } else if (url === 'footer-info') {
            state.footerInfo = list
        } else if (url === 'footer-social') {
            state.footerSocials = list
        }
        
    }
}

const actions = {
    async fetchNavigation({ commit }, url) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/menus/${url}`
        );
        const data = await response.json()

        commit(FETCH_MENU_LIST, {list: data.content, url:url})
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}