import { SET_ALERTBOX, SET_ALERTBOX_STATUS, SET_ALERTBOX_TEXT } from '../../mutations-types'

const state = {
    alertBoxText: null,
    alertBoxStatus: true,
    alertBox: false
}

const getters = {
    getAlertBoxText: state => state.alertBoxText,
    getAlertBoxStatus: state => state.alertBoxStatus,
    getAlertBox: state => state.alertBox
}

const mutations = {
    [SET_ALERTBOX](state, payload) {
        state.alertBox = payload;
    },
    [SET_ALERTBOX_STATUS](state, payload) {
        state.alertBoxStatus = payload;
    },
    [SET_ALERTBOX_TEXT](state, payload) {
        state.alertBoxText = payload;
    }
}

const actions = {
    setAlertBox({ commit }, { status, text, timeout = 5000 }) {
        setTimeout(() => {
            commit('SET_ALERTBOX', true);
            commit('SET_ALERTBOX_STATUS', status);
            commit('SET_ALERTBOX_TEXT', text);
    
            setTimeout(() => {
                commit('SET_ALERTBOX', false);
            }, timeout);
        }, 500);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}