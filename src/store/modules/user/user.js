import { FETCH_USER_BY_ID, FETCH_PARTICIPANTS_BY_ID, FETCH_PARTICIPANTS } from '../../mutations-types'

const state = {
    user: {},
    participant: {},
    participantsList: [],
    loading: false,
}

const getters = {
    userInfo: state => {
        return state.user
    },

    participantInfo: state => {
        return state.participant
    },
    participantsList: state => {
        return state.participantsList
    }
}

const mutations = {
    [FETCH_USER_BY_ID](state, user) {
        state.user = user
    },

    [FETCH_PARTICIPANTS_BY_ID](state, participant) {
        state.participant = participant
    },
    [FETCH_PARTICIPANTS](state, participants) {
        console.log(participants)
        state.participantsList = participants
    }
}

const actions = {
    async updateUserInfo(context, {id, token, formData }) {

        const response = await fetch(
            `${process.env.VUE_APP_AUTH_URL}/api/user/${id}/update`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            }
        );

        const data = await response.json();

        return data;
    },

    async updateParticipantsInfo(context, { token, formData }) {

        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/participants/add`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            }
        );

        const data = await response.json();

        return data;
    },

    async fetchCandidateInfo({ commit }, { id }) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/participants/${id}`
        );
        const data = await response.json();
        
        commit(FETCH_PARTICIPANTS_BY_ID, data)
    },

    async fetchCandidates({commit}) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/participants`
        );
        const data = await response.json()
        commit(FETCH_PARTICIPANTS, data)
    },

    async getUserData({ commit, dispatch }, { id }) {
        const response = await fetch(
            `${process.env.VUE_APP_AUTH_URL}/api/users/${id}`
        );

        const data = await response.json();

        dispatch('fetchCandidateInfo', {
            id: id,
        });

        commit(FETCH_USER_BY_ID, data);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}