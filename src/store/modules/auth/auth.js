import { SET_AUTH_TOKEN, 
    SET_AUTH_REFRESH_TOKEN, 
    SET_AUTH_LOADING, 
    SET_AUTH_ERRORS, 
    SET_AUTH_ACCOUNT, 
    SET_REGISTRATION_LOADING, 
    SET_REGISTRATION_ERRORS,
    SET_USER_DETAILS
} from '../../mutations-types';

const state = {
    token: null,
    refreshToken: '',
    loading: false,
    error: null,
    account: null,
    user: {}
}

const getters = {
    getToken: state => state.token,
    loginLoading: state => state.loading,
    loginError: state => state.error,
    registrationLoading: state => state.loading,
    registrationError: state => state.error,
    getUserDetails: state => state.user
}

const mutations = {
    [SET_AUTH_TOKEN](state, payload) {
        state.token = payload;
    },
    [SET_AUTH_REFRESH_TOKEN](state, payload) {
        state.refreshToken = payload;
    },
    [SET_AUTH_LOADING](state, payload) {
        state.loading = payload;
    },
    [SET_AUTH_ERRORS](state, payload){
        state.error = payload;
    },
    [SET_AUTH_ACCOUNT](state, payload){
        state.account = payload
    },
    [SET_REGISTRATION_LOADING](state, payload) {
        state.loading = payload;
    },
    [SET_REGISTRATION_ERRORS](state, payload) {
        state.error = payload;
    },
    [SET_USER_DETAILS](state, payload) {
        state.user = payload;
    }
}

const actions = {

    async socialAuth(context, {data}) {
        try {
            const response = await fetch(
                `${process.env.VUE_APP_AUTH_URL}/api/social`,
                {
                    method: 'POST',
                    body: data
                }
            );

            return await response.json();
        } catch(error) {
            return error;
        }
    },

    async forgotPassword(context, { email }) {
        try {
            const response = await fetch(
                `${process.env.VUE_APP_AUTH_URL}/api/forgot`,
                {
                    method: 'POST',
                    body: email
                }
            );

            return await response.json();
        } catch(error) {
            return error;
        }
    },

    async resetPassword(context, { data }) {
        try {
            const response = await fetch(
                `${process.env.VUE_APP_AUTH_URL}/api/reset`,
                {
                    method: 'POST',
                    body: data
                }
            );

            return await response.json();
        } catch(error) {
            return error;
        }
    },

    async getToken(credentials) {
        try {
            const response = await fetch(
                `${process.env.VUE_APP_AUTH_URL}/api/login`,
                {
                    method: 'POST',
                    body: credentials
                }
            );

            return await response.json();
        } catch(error) {
            return error;
        }
    },

    async setToken(accessToken, refreshToken) {
        let now = new Date();
        let time = now.getTime();
        let expireTime = time + 15*60000;
        now.setTime(expireTime);
        localStorage.setItem('access_token', JSON.stringify({'token': accessToken, 'expires': now.toGMTString()}));

        expireTime = time + 30*60000;
        now.setTime(expireTime);

        localStorage.setItem('refresh_token', JSON.stringify({'token': refreshToken, 'expires': now.toGMTString()}));
    },

    async refreshToken(token) {
        const response = await fetch(
            `${process.env.VUE_APP_AUTH_URL}/api/refreshtoken`,
            {
                method: 'POST',
                headers: {
                    'Refreshtoken': token
                }
            }
        );

        const data = await response.json();

        if (!data.access_token) {
            return {status: '400'};
        } else {
            actions.setToken(data.access_token, data.refresh_token);
            return {status: '200'};
        }
    },

    async logout(context, { token }) {
        const response = await fetch(
            `${process.env.VUE_APP_AUTH_URL}/api/logout`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (data) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('userDetails');

            return {status: '200'};
        }
    },

    checkToken({ commit }) {
        const time = new Date().toGMTString();
        const accessToken = JSON.parse(localStorage.getItem('access_token'));

        if (accessToken && accessToken.expires <= time) {
            const refreshToken = JSON.parse(localStorage.getItem('refresh_token'));

            if (refreshToken && refreshToken.expires >= time) {
                actions.refreshToken(refreshToken.token);
            } else {
                actions.logout({token: accessToken.token});
                commit('SET_AUTH_TOKEN', null);
            }
        }
    },

    login({ commit }, credentials) {
        return new Promise(resolve => {

            commit('SET_AUTH_LOADING', true);
            commit('SET_AUTH_ERRORS', null);

            actions.getToken(credentials).then((response, err) => {
                if (response) {
                    if (response.access_token) {
                        commit('SET_AUTH_TOKEN', response.access_token);
                        commit('SET_AUTH_REFRESH_TOKEN', response.refresh_token);

                        actions.setToken(state.token, state.refreshToken);

                        actions.getDetails(state.token).then((response, err) => {

                            if (response) {
                                console.log(response)
                                if (response.status == '200') {
                                    commit('SET_USER_DETAILS', response.data);
                                    resolve({status: '200'});
                                } else {
                                    commit('SET_AUTH_ERRORS', 'Status: 400');
                                    resolve({status: '400'});
                                }
                            } else {
                                commit('SET_AUTH_ERRORS', err);
                                resolve({error: err});
                            }
    
                            commit('SET_AUTH_LOADING', false);
                        });
                    } else {
                        commit('SET_AUTH_ERRORS', response);
                        commit('SET_AUTH_LOADING', false);
                        resolve([response]);
                    }
                } else if (err) {

                    commit('SET_AUTH_ERRORS', err);
                    commit('SET_AUTH_LOADING', false);
                    resolve({error: err});
                }
            });
        })
    },

    async sendUserData(credentials) {
        const response = await fetch(
            `${process.env.VUE_APP_AUTH_URL}/api/register`,
            {
                method: 'POST',
                body: credentials
            }
        );

        const data = await response.json();

        return data;
    },

    registration({ commit }, credentials) {
        return new Promise((resolve, reject) => {

            commit('SET_REGISTRATION_LOADING', true);
            commit('SET_REGISTRATION_ERRORS', null);

            actions.sendUserData(credentials).then((response, err) => {

                commit('SET_REGISTRATION_LOADING', false);

                if (response) {
                    if (response.access_token) {

                        commit('SET_AUTH_TOKEN', response.access_token);
                        commit('SET_AUTH_REFRESH_TOKEN', response.refresh_token);

                        actions.setToken(response.access_token, response.refresh_token);
                        commit('SET_AUTH_TOKEN', response.access_token);

                        actions.getDetails(response.access_token).then((res, err) => {

                            if (res) {

                                if (res.status == '200') {

                                    commit('SET_USER_DETAILS', res.data);
                                    resolve({status: '200'});
                                } else {
                                    reject({status: '400'});
                                }
                            } else {
                                reject({error: err});
                            }
                        });
                    } else {
                        commit('SET_REGISTRATION_ERRORS', response);

                        reject({status: '400'});
                    }
                } else if (err) {
                    commit('SET_REGISTRATION_ERRORS', err);

                    reject({error: err});
                }
            });
        });
    },

    async getDetails(token) {
        try {
            const response = await fetch(
                `${process.env.VUE_APP_AUTH_URL}/api/users/me`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            if (data) {
                const userDetails = {
                    name: data.name,
                    surname: data.surname,
                    id: data.id
                };

                if (data.avatar && data.avatar.length) {
                    userDetails.avatar = data.avatar;
                }

                localStorage.setItem('userDetails', JSON.stringify(userDetails));

                return {status: '200', data: userDetails};
            } else {
                return {status: '400'};
            }
        } catch(err) {
            return {error: err}
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}