import client from "@/api/client";
import session from "@/api/session";
import {
    AUTH_PERMISSIONS,
    AUTH_PROFILE,
    AUTH_REMOVE_TOKEN,
    AUTH_SET_TOKEN,
    FORM_CLEAN,
    FORM_ERRORS,
    FORM_NON_FIELD_ERROR,
    FORM_SUCCESS,
    FORM_VALIDATION
} from "@/api/types";

const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY';

const state = {
    formErrors: Object,
    formObj: Object,
    formSuccess: Boolean,
    nonFieldFormError: Boolean,
    nonFieldFormMessage: null,
    permit: Array,
    profile: Object,
    token: null
};

const getters = {
    isAuthenticated: state => !!state.token,
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess,
    nonFieldFormError: state => state.nonFieldFormError,
    nonFieldFormMessage: state => state.nonFieldFormMessage
};

const actions = {
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    initialize({commit}) {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);

        if (token) {
            commit(AUTH_SET_TOKEN, token);
        }
    },
    async login({commit, state}) {
        commit(FORM_VALIDATION);

        const response = await client.post(
            'rest-auth/login/',
            state.formObj
        );

        if (response.error) {
            if ('non_field_errors' in response.errors) {
                commit(FORM_NON_FIELD_ERROR, response.errors['non_field_errors'][0]);
            } else {
                commit(FORM_ERRORS, response.errors);
            }
        } else {
            commit(AUTH_SET_TOKEN, response.key);

            const responseProfile = await client.get(
                'employee/account/profile'
            );

            commit(AUTH_PROFILE, responseProfile);

            const responsePerm = await client.get(
                'employee/manage/permission/user'
            );

            commit(AUTH_PERMISSIONS, responsePerm);

            commit(FORM_SUCCESS);
        }
    },
    async logout({commit}) {
        await client.post(
            'rest-auth/logout/',
            {}
        );

        commit(AUTH_REMOVE_TOKEN);

        commit(FORM_CLEAN);
    }
};

const mutations = {
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
        localStorage.setItem(TOKEN_STORAGE_KEY, token);

        session.defaults.headers.Authorization = `Token ${token}`;

        state.token = token;
    },
    [FORM_CLEAN](state) {
        state.formErrors = {};
        state.formObj = {};
        state.nonFieldFormError = false;
        state.nonFieldFormMessage = null;
        state.permit = [];
        state.profile = {};
        state.token = null;
    },
    [FORM_ERRORS](state, data) {
        state.formErrors = data;
    },
    [FORM_NON_FIELD_ERROR](state, data) {
        state.nonFieldFormError = true;
        state.nonFieldFormMessage = data;
    },
    [FORM_SUCCESS](state) {
        state.formErrors = {};
        state.formSuccess = true;
        state.nonFieldFormError = false;
        state.nonFieldFormMessage = null;
    },
    [FORM_VALIDATION](state) {
        state.formErrors = {};
        state.formSuccess = false;
        state.nonFieldFormError = false;
        state.nonFieldFormMessage = null;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
