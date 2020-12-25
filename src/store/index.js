import Vue from 'vue';
import Vuex from 'vuex';
import database from './modules/database/database';
import placefinder from './modules/placefinder/placefinder';
import graphs from './modules/graphs/graphs';
import partners from './modules/partners/partners';
import candidates from './modules/candidates/candidates';
import news from './modules/news/news';
import home from './modules/home/home';
import competitions from './modules/competitions/competitions';
import auth from './modules/auth/auth';
import organization from './modules/organization/organization';
import user from './modules/user/user';
import pages from './modules/pages/pages';
import comments from './modules/comments/comments';
import tags from './modules/tags/tags';
import search from './modules/search/search';
import menu from './modules/menu/menu';
import alertbox from './modules/alertbox/alertbox';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        alertbox,
        database,
        placefinder,
        graphs,
        partners,
        candidates,
        news,
        home,
        competitions,
        auth,
        organization,
        user,
        pages,
        comments,
        tags,
        search,
        menu
    },
    strict: true
})