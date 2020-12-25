import { FETCH_DATABASE } from '../../mutations-types'

const state = {
    databaseList: []
}

const getters = {
    databaseList: state => {
        return state.databaseList;
    }
}

const mutations = {
    [FETCH_DATABASE](state, list) {
        state.databaseList = list;
    }
}

const actions = {
    async loadDatabaseList({ commit }) {
        const response = await fetch(
            `${process.env.VUE_APP_API_URL}/stats`
        );
        const data = await response.json();

        for (let prop in data) {
            if (prop == 'organizations') {
                data[prop].overall_title = 'Надіслано запитів';
                data[prop].active_title = 'Підключено органів влади';
                data[prop].colors = '#24E5DB';
            } else if (prop == 'clinics') {
                data[prop].overall_title = 'Всіх закладів';
                data[prop].active_title = 'Зареєстровано закладів';
                data[prop].colors = '#FF8B03';
            } else if (prop == 'competitions') {
                data[prop].overall_title = 'Конкурсів на платформі';
                data[prop].active_title = 'Активні конкурси';
                data[prop].colors = '#2482FF';
            } else if (prop == 'participants') {
                data[prop].overall_title = 'Учасники платформи';
                data[prop].active_title = 'Кандидати на посади';
                data[prop].colors = '#63DF7B';
            }
        }

        commit(FETCH_DATABASE, data);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}