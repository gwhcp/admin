import client from "@/api/client";

import {
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
    formSuccess: Boolean
};

const getters = {
    formArr: state => state.formArr,
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess
};

const actions = {
    async createCompany({commit, state}) {
        commit(FORM_VALIDATION);

        const response = await client.post(
            'company/company/create',
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
    },
    async deleteCompany({commit}, data) {
        const response = await client.delete(
            `company/company/delete/${data.id}`
        );

        if (!response.error) {
            commit(FORM_DELETE, data);
        } else {
            commit(FORM_ERRORS, response.errors);
        }

        return response.error;
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    async getProfile({commit}, data) {
        commit(FORM_CLEAN);

        const response = await client.get(
            `company/company/profile/${data.id}`
        );

        commit(FORM_OBJECT, response);
    },
    async getSearch({commit}) {
        commit(FORM_CLEAN);

        const response = await client.get(
            'company/company/search'
        );

        commit(FORM_ARRAY, response);
    },
    async updateProfile({commit, state}, data) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            `company/company/profile/${data.id}`,
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
