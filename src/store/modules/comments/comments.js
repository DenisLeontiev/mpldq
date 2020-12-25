import { 
    FETCH_COMMENTS, 
    SET_COMMENT_SEND_INFO, 
    SET_COMMENT_REMOVE_INFO, 
    SET_COMMENT_USER_STATUS 
} from '../../mutations-types'

const state = {
    comments: [],
    sendData: {},
    removeData: {},
    userStatus: null
}

const getters = {
    commentsList: state => {
        return state.comments
    },
    sendData: state => {
        return state.sendData
    },
    removeData: state => {
        return state.removeData
    },
    userStatus: state => {
        return state.userStatus
    }
}

const mutations = {
    [FETCH_COMMENTS](state, list) {
        state.comments = list
    },
    [SET_COMMENT_SEND_INFO](state, data) {
        state.sendData = data
    },
    [SET_COMMENT_REMOVE_INFO](state, data) {
        state.removeData = data
    },
    [SET_COMMENT_USER_STATUS](state, data) {
        state.userStatus = data.role
    }
}

const actions = {
    async fetchComments({ commit }, {params}) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/comments/${params.type}/${params.id}`
        );
        const data = await response.json()

        commit(FETCH_COMMENTS, data)
    },

    async sendComment({commit}, {params, id, token}) {
        const body = new FormData()
        body.append('post_type', params.post_type)
        body.append('post_id', params.post_id)
        body.append('reply_id', id)
        body.append('text', params.text)
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/comments/add`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: body
            }
        );
        const data = await response.json()
        commit(SET_COMMENT_SEND_INFO, data)
        
    },

    async deleteComment({commit}, {id, token}) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/comments/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        const data = await response.json()
        commit(SET_COMMENT_REMOVE_INFO, data)
    },

    async fetchUserStatus({commit}, {category, token}){
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/roleFor?category=${category}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                } 
            }
        );

        const data = await response.json();
        commit(SET_COMMENT_USER_STATUS, data)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}