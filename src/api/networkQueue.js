import client from "@/api/client";

import {FORM_ARRAY, FORM_CLEAN, FORM_ERRORS, FORM_OBJECT, FORM_SUCCESS, FORM_VALIDATION} from "@/api/types";

const state = {
    formArr: Array,
    formError: Boolean,
    formErrors: Object,
    formObj: Object,
    formSuccess: Boolean
};

const getters = {
    formArr: state => state.formArr,
    formError: state => state.formError,
    formErrors: state => state.formErrors,
    formObj: state => state.formObj,
    formSuccess: state => state.formSuccess
};

const actions = {
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    async getProfile({commit}, data) {
        commit(FORM_CLEAN);

        const response = await client.get(
            `network/queue/profile/${data.id}`
        );

        commit(FORM_OBJECT, response.queue_status);
        commit(FORM_ARRAY, response.queue_items);
    },
    async getSearch({commit}) {
        commit(FORM_CLEAN);

        const response = await client.get(
            'network/queue/search'
        );

        commit(FORM_ARRAY, response);
    },
    async retryQueue({commit}, data) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            'network/queue/retry',
            data
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
        state.formError = false;
        state.formErrors = {};
        state.formObj = {};
        state.formSuccess = false;
    },
    [FORM_ERRORS](state, data) {
        state.formError = true;
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [FORM_OBJECT](state, data) {
        state.formObj = Object.assign({}, state.formObj, data);
    },
    [FORM_SUCCESS](state) {
        state.formError = false;
        state.formErrors = {};
        state.formSuccess = true;
    },
    [FORM_VALIDATION](state) {
        state.formError = false;
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
