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
    choices: {},
    formArr: [],
    formErrors: {},
    formObj: {},
    formSuccess: false,
    nonFieldFormError: false,
    nonFieldFormMessage: ''
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
    createPaymentGateway({commit, state}) {
        commit(FORM_VALIDATION);

        return client.post('billing/payment/create', state.formObj)
            .then(response => {
                if (response.error) {
                    commit(FORM_ERRORS, response.errors);
                } else {
                    commit(FORM_SUCCESS);
                }
            });
    },
    deletePaymentGateway({commit}, data) {
        commit(FORM_DELETE, data);

        return client.delete(`billing/payment/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    getAuthentication({commit}, data) {
        commit(FORM_CLEAN);

        client.get(`billing/payment/${data.merchant}/${data.id}/authentication`)
            .then(data => commit(FORM_OBJECT, data));
    },
    getChoices({commit}) {
        client.get('billing/payment/choices')
            .then(data => commit(FORM_CHOICES, data));
    },
    getMethod({commit}, data) {
        commit(FORM_CLEAN);

        client.get(`billing/payment/${data.merchant}/${data.id}/method`)
            .then(data => commit(FORM_OBJECT, data));
    },
    getProfile({commit}, data) {
        commit(FORM_CLEAN);

        client.get(`billing/payment/profile/${data.id}`)
            .then(data => commit(FORM_OBJECT, data));
    },
    getSearch({commit}) {
        client.get('billing/payment/search')
            .then(data => commit(FORM_ARRAY, data));
    },
    updateAuthentication({commit, state}, data) {
        commit(FORM_VALIDATION);

        return client.patch(`billing/payment/${data.merchant}/${data.id}/authentication`, state.formObj)
            .then(response => {
                if (response.error) {
                    commit(FORM_ERRORS, response.errors);
                } else {
                    commit(FORM_SUCCESS);
                }
            });
    },
    updateMethod({commit, state}, data) {
        commit(FORM_VALIDATION);

        return client.patch(`billing/payment/${data.merchant}/${data.id}/method`, state.formObj)
            .then(response => {
                if (response.error) {
                    if ('non_field_errors' in response.errors) {
                        commit(FORM_NON_FIELD_ERROR, response.errors['non_field_errors'][0]);
                    } else {
                        commit(FORM_ERRORS, response.errors);
                    }
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
    [FORM_CHOICES](state, data) {
        state.choices = data;
    },
    [FORM_CLEAN](state) {
        state.formArr = [];
        state.formErrors = {};
        state.formObj = {};
        state.formSuccess = false;
        state.nonFieldFormError = false;
        state.nonFieldFormMessage = '';
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
        state.nonFieldFormMessage = '';
    },
    [FORM_VALIDATION](state) {
        state.formErrors = {};
        state.formSuccess = false;
        state.nonFieldFormError = false;
        state.nonFieldFormMessage = '';
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
