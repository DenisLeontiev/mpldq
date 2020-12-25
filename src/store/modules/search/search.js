import { FETCH_SEARCH_RESULT } from '../../mutations-types'

const state = {
    searchResult: []
}

const getters = {
    searchResult: state => {
        return state.searchResult
    }
}

const mutations = {
    [FETCH_SEARCH_RESULT](state, list) {
        state.searchResult = list
    }
}

const actions = {
    async fetchSearchResult({ commit }, {query}) {
        let categorys = ''
        let searchQuery = ''
        let tags = ''
        let queryLine = ''

        if(query.category.length > 0) {
            query.category.forEach((el, index) => {
                if(index == query.category.length - 1) {
                    categorys += el.key
                } else {
                    categorys += el.key + ',' 
                }  
            });
            categorys = encodeURIComponent(categorys)
            queryLine += `category=${categorys}`
            if(query.words.length > 0 || query.tag_id.length > 0) {
                queryLine += '&'
            }
        }

        if(query.words.length > 0) {
            searchQuery = encodeURIComponent(query.words)
            queryLine += `words=${searchQuery}`
            if(query.tag_id.length > 0) {
                queryLine += '&'
            }
        }
        
        if(query.tag_id.length > 0) {
            tags = encodeURIComponent(query.tag_id)
            queryLine += `tag_id=${tags}`
        }

        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/search?${queryLine}`
        );
        const data = await response.json()

        commit(FETCH_SEARCH_RESULT, data)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}