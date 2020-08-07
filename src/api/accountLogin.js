import client from "@/api/client";
import {
    ACCOUNT_LOGIN_DELETE,
    ACCOUNT_LOGIN_FORM_CLEAN,
    ACCOUNT_LOGIN_FORM_DATA,
    ACCOUNT_LOGIN_FORM_ERRORS,
    ACCOUNT_LOGIN_FORM_SUCCESS,
    ACCOUNT_LOGIN_FORM_VALIDATION,
    ACCOUNT_LOGIN_PERMISSION_BASE,
    ACCOUNT_LOGIN_PERMISSION_USER
} from "@/api/types";

const state = {
    formData: {},
    formErrors: [],
    formSuccess: 0,
    permissionBase: [],
    permissionUser: []
};

const getters = {};

const actions = {
    createAccount({commit, state}) {
        commit(ACCOUNT_LOGIN_FORM_VALIDATION);

        return client.post('account/login/create', state.formData)
            .then(response => {
                if (response.error) {
                    commit(ACCOUNT_LOGIN_FORM_ERRORS, response.errors);
                } else {
                    commit(ACCOUNT_LOGIN_FORM_SUCCESS);
                }
            })
    },
    deleteAccount({commit}, data) {
        commit(ACCOUNT_LOGIN_DELETE, data);

        return client.delete(`account/login/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(ACCOUNT_LOGIN_FORM_CLEAN);
    },
    getPermissions({commit}, data) {
        client.get('account/login/permission/base')
            .then(data => commit(ACCOUNT_LOGIN_PERMISSION_BASE, data));

        client.get(`account/login/permission/${data.id}`)
            .then(data => commit(ACCOUNT_LOGIN_PERMISSION_USER, data));
    },
    updatePassword({commit, state}) {
        commit(ACCOUNT_LOGIN_FORM_VALIDATION);

        return client.patch('account/login/password', state.data)
            .then(response => {
                if (response.error) {
                    commit(ACCOUNT_LOGIN_FORM_ERRORS, response.errors);
                } else {
                    commit(ACCOUNT_LOGIN_FORM_SUCCESS);
                }
            });
    },
    updatePermissions({commit}, data) {
        commit(ACCOUNT_LOGIN_FORM_VALIDATION);

        return client.patch(`account/login/permission/${data.id}`, {'user_permissions': data.perms})
            .then(response => {
                if (response.error) {
                    commit(ACCOUNT_LOGIN_FORM_ERRORS, response.errors);
                } else {
                    commit(ACCOUNT_LOGIN_FORM_SUCCESS);
                }
            });
    }
};

const mutations = {
    [ACCOUNT_LOGIN_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [ACCOUNT_LOGIN_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [ACCOUNT_LOGIN_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [ACCOUNT_LOGIN_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [ACCOUNT_LOGIN_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [ACCOUNT_LOGIN_PERMISSION_BASE](state, data) {
        const perm = [];

        for (const base of data) {
            perm.push({
                value: base.id,
                label: base.name
            })
        }

        state.permissionBase = perm;
    },
    [ACCOUNT_LOGIN_PERMISSION_USER](state, data) {
        state.permissionUser = data.user_permissions;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
