import client from "@/api/client";
import session from "@/api/session";
import {
    AUTH_BEGIN_LOGIN,
    AUTH_FORM_CLEAN,
    AUTH_FORM_ERRORS,
    AUTH_FORM_NON_FIELD_ERROR,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    AUTH_PERMISSIONS,
    AUTH_PROFILE,
    AUTH_REMOVE_TOKEN,
    AUTH_SET_TOKEN
} from "@/api/types";

const isProduction = process.env.NODE_ENV === 'production';
const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY';

const state = {
    authenticating: false,
    email: String,
    error: false,
    formData: {},
    formErrors: [],
    nonFieldFormError: 0,
    nonFieldFormMessage: '',
    password: String,
    permit: [],
    profile: {},
    token: null
};

const getters = {
    isAuthenticated: state => !!state.token
};

const actions = {
    formClean({commit}) {
        commit(AUTH_FORM_CLEAN);
    },
    initialize({commit}) {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);

        if (isProduction && token) {
            commit(AUTH_REMOVE_TOKEN);
        }

        if (!isProduction && token) {
            commit(AUTH_SET_TOKEN, token);
        }
    },
    login({commit, state}) {
        commit(AUTH_BEGIN_LOGIN);

        return client.post('rest-auth/login/', state.formData)
            .then(response => {
                if (response.error) {
                    commit(AUTH_LOGIN_FAILURE);

                    if ('non_field_errors' in response.errors) {
                        commit(AUTH_FORM_NON_FIELD_ERROR, response.errors['non_field_errors'][0]);
                    } else {
                        commit(AUTH_FORM_ERRORS, response.errors);
                    }
                } else {
                    commit(AUTH_SET_TOKEN, response.key);
                    commit(AUTH_LOGIN_SUCCESS);

                    client.get('account/account/profile')
                        .then(response => commit(AUTH_PROFILE, response));

                    client.get('account/login/permission/user')
                        .then(response => commit(AUTH_PERMISSIONS, response));
                }
            });
    },
    logout({commit}) {
        return client.post('rest-auth/logout/', {})
            .then(() => commit(AUTH_LOGOUT))
            .finally(() => commit(AUTH_REMOVE_TOKEN));
    }
};

const mutations = {
    [AUTH_BEGIN_LOGIN](state) {
        state.authenticating = true;
        state.error = false;
    },
    [AUTH_FORM_CLEAN](state) {
        state.authenticating = false;
        state.error = false;
        state.formData = {};
        state.formErrors = [];
        state.permit = [];
        state.profile = {};
        state.token = null;
    },
    [AUTH_FORM_ERRORS](state, data) {
        state.formErrors = data;
    },
    [AUTH_FORM_NON_FIELD_ERROR](state, data) {
        state.nonFieldFormError = 5;
        state.nonFieldFormMessage = data;
    },
    [AUTH_LOGIN_FAILURE](state) {
        state.authenticating = false;
        state.error = true;
    },
    [AUTH_LOGIN_SUCCESS](state) {
        state.authenticating = false;
        state.error = false;
    },
    [AUTH_LOGOUT](state) {
        state.authenticating = false;
        state.error = false;
    },
    [AUTH_PERMISSIONS](state, data) {
        const permissions = [];

        for (let item of data) {
            permissions.push(item.perm);
        }

        state.permit = permissions;
    },
    [AUTH_PROFILE](state, data) {
        state.profile = data;
    },
    [AUTH_REMOVE_TOKEN](state) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        delete session.defaults.headers.Authorization;
        state.token = null;
    },
    [AUTH_SET_TOKEN](state, token) {
        if (!isProduction) localStorage.setItem(TOKEN_STORAGE_KEY, token);
        session.defaults.headers.Authorization = `Token ${token}`;
        state.token = token;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
