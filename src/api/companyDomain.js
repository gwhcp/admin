import client from "@/api/client";

import {
    FORM_ARRAY,
    FORM_CHOICES,
    FORM_CLEAN,
    FORM_DELETE,
    FORM_ERRORS,
    FORM_OBJECT,
    FORM_SUCCESS,
    FORM_VALIDATION
} from "@/api/types";

const state = {
    choices: Object,
    formArr: Array,
    formErrors: Object,
    formObj: Object,
    formSuccess: false
};

const getters = {
    choices: state => state.choices,
    formArr: state => state.formArr,
    formErrors: state => state.formErrors,
    formObj: state => state.formObj,
    formSuccess: state => state.formSuccess
};

const actions = {
    async createDomain({commit, state}) {
        commit(FORM_VALIDATION);

        const response = await client.post(
            'company/domain/create',
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
    },
    async deleteDomain({commit}, data) {
        commit(FORM_DELETE, data);

        await client.delete(
            `company/domain/delete/${data.id}`
        );
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    async getChoices({commit}) {
        const response = await client.get(
            'company/domain/choices'
        );

        commit(FORM_CHOICES, response);
    },
    async getProfile({commit}, data) {
        commit(FORM_CLEAN);

        const response = await client.get(
            `company/domain/profile/${data.id}`
        );

        commit(FORM_OBJECT, response);
    },
    async getSearch({commit}) {
        commit(FORM_CLEAN);

        const response = await client.get(
            'company/domain/search'
        );

        commit(FORM_ARRAY, response);
    }
};

const mutations = {
    [FORM_ARRAY](state, data) {
        state.formArr = data;
    },
    [FORM_CHOICES](state, data) {
        state.choices = data;
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
