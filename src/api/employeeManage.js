import client from "@/api/client";

import {
    EMPLOYEE_MANAGE_PERMISSION_BASE,
    EMPLOYEE_MANAGE_PERMISSION_USER,
    FORM_ARRAY,
    FORM_CLEAN,
    FORM_DELETE,
    FORM_ERRORS,
    FORM_OBJECT,
    FORM_SUCCESS,
    FORM_VALIDATION
} from "@/api/types";

const state = {
    formArr: [],
    formErrors: {},
    formObj: {},
    formSuccess: false,
    permissionBase: [],
    permissionUser: []
};

const getters = {
    formArr: state => state.formArr,
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess,
    permissionBase: state => state.permissionBase,
    permissionUser: state => state.permissionUser
};

const actions = {
    createAccount({commit, state}) {
        commit(FORM_VALIDATION);

        return client.post('employee/manage/create', state.formObj)
            .then(response => {
                if (response.error) {
                    commit(FORM_ERRORS, response.errors);
                } else {
                    commit(FORM_SUCCESS);
                }
            })
    },
    deleteAccount({commit}, data) {
        commit(FORM_DELETE, data);

        return client.delete(`employee/manage/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    getAccessLog({commit}, data) {
        client.get(`employee/manage/accesslog/${data.id}`)
            .then(data => commit(FORM_ARRAY, data));
    },
    getAccounts({commit}) {
        client.get('employee/manage/search')
            .then(data => commit(FORM_ARRAY, data));
    },
    getPermissions({commit}, data) {
        client.get('employee/manage/permission/base')
            .then(data => commit(EMPLOYEE_MANAGE_PERMISSION_BASE, data));

        client.get(`employee/manage/permission/${data.id}`)
            .then(data => commit(EMPLOYEE_MANAGE_PERMISSION_USER, data));
    },
    getProfile({commit}, data) {
        commit(FORM_CLEAN);

        client.get(`employee/manage/profile/${data.id}`)
            .then(data => commit(FORM_OBJECT, data));
    },
    updatePermissions({commit}, data) {
        commit(FORM_VALIDATION);

        return client.patch(`employee/manage/permission/${data.id}`, {
            'user_permissions': data.perms
        })
            .then(response => {
                if (response.error) {
                    commit(FORM_ERRORS, response.errors);
                } else {
                    commit(FORM_SUCCESS);
                }
            });
    },
    updateProfile({commit, state}, data) {
        commit(FORM_VALIDATION);

        return client.patch(`employee/manage/profile/${data.id}`, state.formObj)
            .then(response => {
                if (response.error) {
                    commit(FORM_ERRORS, response.errors);
                } else {
                    commit(FORM_SUCCESS);
                }
            });
    }
};

const mutations = {
    [FORM_ARRAY](state, data) {
        state.formArr = data;
    },
    [FORM_CLEAN](state) {
        state.formArr = [];
        state.formErrors = {};
        state.formObj = {};
        state.formSuccess = false;
    },
    [FORM_DELETE](state, data) {
        state.formArr = state.formArr.filter(item => item.id !== data.id);
    },
    [FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [FORM_OBJECT](state, data) {
        state.formObj = Object.assign({}, state.formObj, data);
    },
    [FORM_SUCCESS](state) {
        state.formErrors = {};
        state.formSuccess = true;
    },
    [FORM_VALIDATION](state) {
        state.formErrors = {};
        state.formSuccess = false;
    },
    [EMPLOYEE_MANAGE_PERMISSION_BASE](state, data) {
        const perm = [];

        for (const base of data) {
            perm.push({
                value: base.id,
                label: base.name
            })
        }

        state.permissionBase = perm;
    },
    [EMPLOYEE_MANAGE_PERMISSION_USER](state, data) {
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
