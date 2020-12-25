import { FETCH_NEWS_LIST, FETCH_NEWS_SINGLE, FETCH_RELATED_NEWS, FETCH_LAST_NEWS } from '../../mutations-types'

const state = {
    newsList: {},
    news: {},
    relatedNews: {},
    lastNewsList: []
}

const getters = {
    newsList: state => {
        return state.newsList
    },
    getNewsSingle: state => {
        return state.news
    },
    getRelatedNews: state => {
        return state.relatedNews
    },
    lastNewsList: state => {
        return state.lastNewsList;
    }
}

const mutations = {
    [FETCH_NEWS_LIST](state, list) {
        state.newsList = list
    },
    [FETCH_NEWS_SINGLE](state, news) {
        state.news = news
    },
    [FETCH_RELATED_NEWS](state, news) {
        state.relatedNews = news
    },
    [FETCH_LAST_NEWS](state, list) {
        state.lastNewsList = list;
    }
}

const actions = {
    async fetchNewsList({ commit }) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/news`
        );
        const data = await response.json()

        commit(FETCH_NEWS_LIST, data)
    },

    async fetchNewsSingle({ commit }, { slug }) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/news/${slug}`
        );
        const data = await response.json()
        commit(FETCH_NEWS_SINGLE, data)
    },

    async fetchRelatedNews({ commit }) {
        const response = await fetch(
            '/json/relatednews.json'
        )
        const data = await response.json()
        commit(FETCH_RELATED_NEWS, data)
    },

    async loadLastNewsList({ commit }) {
        const response = await fetch(
            '/json/last-news.json'
        );
        const data = await response.json();

        commit(FETCH_LAST_NEWS, data);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}