import client from "@/api/client";

import {
    FORM_ARRAY,
    FORM_CHOICES,
    FORM_CLEAN,
    FORM_DELETE,
    FORM_ERRORS,
    FORM_NON_FIELD_ERROR,
    FORM_OBJECT,
    FORM_SUCCESS,
    FORM_VALIDATION
} from "@/api/types";

const state = {
    choices: Object,
    formArr: Array,
    formErrors: Object,
    formObj: Object,
    formSuccess: false,
    nonFieldFormError: false,
    nonFieldFormMessage: null
};

const getters = {
    choices: state => state.choices,
    formArr: state => state.formArr,
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess,
    nonFieldFormError: state => state.nonFieldFormError,
    nonFieldFormMessage: state => state.nonFieldFormMessage
};

const actions = {
    async createPaymentGateway({commit, state}) {
        commit(FORM_VALIDATION);

        const response = await client.post(
            'billing/payment/create',
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
    },
    async deletePaymentGateway({commit}, data) {
        commit(FORM_DELETE, data);

        await client.delete(
            `billing/payment/delete/${data.id}`
        );
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    async getAuthentication({commit}, data) {
        commit(FORM_CLEAN);

        const response = await client.get(
            `billing/payment/${data.merchant}/${data.id}/authentication`
        );

        commit(FORM_OBJECT, response);
    },
    async getChoices({commit}) {
        const response = await client.get(
            'billing/payment/choices'
        );

        commit(FORM_CHOICES, response);
    },
    async getMethod({commit}, data) {
        commit(FORM_CLEAN);

        const response = await client.get(
            `billing/payment/${data.merchant}/${data.id}/method`
        );

        commit(FORM_OBJECT, response);
    },
    async getProfile({commit}, data) {
        commit(FORM_CLEAN);

        const response = await client.get(
            `billing/payment/profile/${data.id}`
        );

        commit(FORM_OBJECT, response);
    },
    async getSearch({commit}) {
        commit(FORM_CLEAN);

        const response = await client.get(
            'billing/payment/search'
        );

        commit(FORM_ARRAY, response);
    },
    async updateAuthentication({commit, state}, data) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            `billing/payment/${data.merchant}/${data.id}/authentication`,
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
    },
    async updateMethod({commit, state}, data) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            `billing/payment/${data.merchant}/${data.id}/method`,
            state.formObj
        );

        if (response.error) {
            if ('non_field_errors' in response.errors) {
                commit(FORM_NON_FIELD_ERROR, response.errors['non_field_errors'][0]);
            } else {
                commit(FORM_ERRORS, response.errors);
            }
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
        state.nonFieldFormError = false;
        state.nonFieldFormMessage = null;
    },
    [FORM_DELETE](state, data) {
        state.formArr = state.formArr.filter(item => item.id !== data.id);
    },
    [FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [FORM_NON_FIELD_ERROR](state, data) {
        state.nonFieldFormError = true;
        state.nonFieldFormMessage = data;
    },
    [FORM_OBJECT](state, data) {
        state.formObj = Object.assign({}, state.formObj, data);
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
