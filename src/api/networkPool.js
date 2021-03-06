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
    formSuccess: Boolean
};

const getters = {
    choices: state => state.choices,
    formArr: state => state.formArr,
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess
};

const actions = {
    async createPool({commit, state}) {
        commit(FORM_VALIDATION);

        const response = await client.post(
            'network/pool/create',
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
    },
    async deletePool({commit}, data) {
        const response = await client.delete(
            `network/pool/delete/${data.id}`
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
    async getChoices({commit}) {
        const response = await client.get(
            'network/pool/choices'
        );

        commit(FORM_CHOICES, response);
    },
    async getProfile({commit}, data) {
        commit(FORM_CLEAN);

        const responseChoices = await client.get(
            'network/pool/choices'
        );

        commit(FORM_CHOICES, responseChoices);

        const responseProfile = await client.get(
            `network/pool/profile/${data.id}`
        );

        commit(FORM_OBJECT, responseProfile);
    },
    async getSearch({commit}) {
        commit(FORM_CLEAN);

        const response = await client.get(
            'network/pool/search'
        );

        commit(FORM_ARRAY, response);
    },
    async updateProfile({commit, state}, data) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            `network/pool/profile/${data.id}`,
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
