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
    formArr: Array,
    formErrors: Object,
    formObj: Object,
    formSuccess: false,
    permissionBase: Array,
    permissionUser: Array
};

const getters = {
    formArr: state => state.formArr,
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess,
    permissionBase: state => state.permissionBase,
    permissionUser: state => state.permissionUser
};

const actions = {
    async createAccount({commit, state}) {
        commit(FORM_VALIDATION);

        const response = await client.post(
            'employee/manage/create',
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
    },
    async deleteAccount({commit}, data) {
        commit(FORM_DELETE, data);

        await client.delete(
            `employee/manage/delete/${data.id}`
        );
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    async getAccessLog({commit}, data) {
        commit(FORM_CLEAN);

        const response = await client.get(
            `employee/manage/accesslog/${data.id}`
        );

        commit(FORM_ARRAY, response);
    },
    async getAccounts({commit}) {
        commit(FORM_CLEAN);

        const response = await client.get(
            'employee/manage/search'
        );

        commit(FORM_ARRAY, response);
    },
    async getPermissions({commit}, data) {
        commit(FORM_CLEAN);

        const responseBase = await client.get(
            'employee/manage/permission/base'
        );

        commit(EMPLOYEE_MANAGE_PERMISSION_BASE, responseBase);

        const responseUser = await client.get(
            `employee/manage/permission/${data.id}`
        );

        commit(EMPLOYEE_MANAGE_PERMISSION_USER, responseUser);
    },
    async getProfile({commit}, data) {
        commit(FORM_CLEAN);

        const response = await client.get(
            `employee/manage/profile/${data.id}`
        );

        commit(FORM_OBJECT, response);
    },
    async updatePermissions({commit}, data) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            `employee/manage/permission/${data.id}`,
            {
                'user_permissions': data.perms
            }
        );

        if (response.error) { // TODO Do we need this?
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
    },
    async updateProfile({commit, state}, data) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            `employee/manage/profile/${data.id}`,
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
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
        state.permissionBase = [];
        state.permissionUser = [];
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
};
