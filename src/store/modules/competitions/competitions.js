import { 
    FETCH_COMPETITION, 
    FETCH_COMPETITIONS_LIST, 
    SET_COMPETITION_ADD_STATUS,
    SET_COMPETITION_CANDIDATE_STATUS 
} from '../../mutations-types'

const state = {
    competitionsList: {},
    competition: {},
    candidateStatus: '',
    candidateInfo: {}
}

const getters = {
    competitionsList: state => {
        return state.competitionsList
    },
    competition: state => {
        return state.competition
    },
    candidateStatus: state => {
        return state.candidateStatus
    },
    candidateInfo: state => {
        return state.candidateInfo
    }
}

const mutations = {
    [FETCH_COMPETITION](state, item) {
        state.competition = item
    },
    [FETCH_COMPETITIONS_LIST](state, list) {
        state.competitionsList = list
    },
    [SET_COMPETITION_ADD_STATUS](state, status) {
        state.candidateStatus = status
    },
    [SET_COMPETITION_CANDIDATE_STATUS](state, data) {
        state.candidateInfo = data
    }
}

const actions = {
    async fetchCompetitionsList({ commit }) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/clinics`
        );
        const data = await response.json()

        commit(FETCH_COMPETITIONS_LIST, data)
    },

    async fetchCompetition({commit},{slug}) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/clinics/${slug}`
        );
        const data = await response.json()
        commit(FETCH_COMPETITION, data)
    },

    async addCandidate({commit}, {comp_id, token}) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/competitions/add-candidate/${comp_id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        const data = response.ok
        commit(SET_COMPETITION_ADD_STATUS, data)
    },

    async fetchCandidateStatus({commit}, {id}){
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/participants/${id}`
        );

        const data = await response.json();
        commit(SET_COMPETITION_CANDIDATE_STATUS, data)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}