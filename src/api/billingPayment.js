import client from "@/api/client";

import {
    BILLING_PAYMENT_CHOICE_COMPANY,
    BILLING_PAYMENT_CHOICE_MERCHANT,
    BILLING_PAYMENT_CHOICE_METHOD,
    BILLING_PAYMENT_DELETE,
    BILLING_PAYMENT_FORM_CLEAN,
    BILLING_PAYMENT_FORM_DATA,
    BILLING_PAYMENT_FORM_ERRORS,
    BILLING_PAYMENT_FORM_NON_FIELD_ERROR,
    BILLING_PAYMENT_FORM_SUCCESS,
    BILLING_PAYMENT_FORM_VALIDATION,
    BILLING_PAYMENT_SEARCH
} from "@/api/types";

const state = {
    choiceCompany: {},
    choiceMerchant: {},
    choiceMethod: {},
    formData: {},
    formErrors: [],
    formSuccess: 0,
    nonFieldFormError: 0,
    nonFieldFormMessage: '',
    search: []
};

const getters = {};

const actions = {
    createPaymentGateway({commit, state}) {
        commit(BILLING_PAYMENT_FORM_VALIDATION);

        return client.post('billing/payment/create', state.formData)
            .then(response => {
                if (response.error) {
                    commit(BILLING_PAYMENT_FORM_ERRORS, response.errors);
                } else {
                    commit(BILLING_PAYMENT_FORM_SUCCESS);
                }
            });
    },
    deletePaymentGateway({commit}, data) {
        commit(BILLING_PAYMENT_DELETE, data);

        return client.delete(`billing/payment/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(BILLING_PAYMENT_FORM_CLEAN);
    },
    getAuthentication({commit}, data) {
        commit(BILLING_PAYMENT_FORM_CLEAN);

        client.get(`billing/payment/${data.merchant}/${data.id}/authentication`)
            .then(data => commit(BILLING_PAYMENT_FORM_DATA, data));
    },
    getChoiceCompany({commit}) {
        client.get('billing/payment/choice/company')
            .then(data => commit(BILLING_PAYMENT_CHOICE_COMPANY, data));
    },
    getChoiceMerchant({commit}) {
        client.get('billing/payment/choice/merchant')
            .then(data => commit(BILLING_PAYMENT_CHOICE_MERCHANT, data));
    },
    getChoiceMethod({commit}, data) {
        client.get(`billing/payment/choice/method/${data.merchant}`)
            .then(data => commit(BILLING_PAYMENT_CHOICE_METHOD, data));
    },
    getMethod({commit}, data) {
        commit(BILLING_PAYMENT_FORM_CLEAN);

        client.get(`billing/payment/${data.merchant}/${data.id}/method`)
            .then(data => commit(BILLING_PAYMENT_FORM_DATA, data));
    },
    getProfile({commit}, data) {
        commit(BILLING_PAYMENT_FORM_CLEAN);

        client.get(`billing/payment/profile/${data.id}`)
            .then(data => commit(BILLING_PAYMENT_FORM_DATA, data));
    },
    getSearch({commit}) {
        client.get('billing/payment/search')
            .then(data => commit(BILLING_PAYMENT_SEARCH, data));
    },
    updateAuthentication({commit, state}, data) {
        commit(BILLING_PAYMENT_FORM_VALIDATION);

        return client.patch(`billing/payment/${data.merchant}/${data.id}/authentication`, state.formData)
            .then(response => {
                if (response.error) {
                    commit(BILLING_PAYMENT_FORM_ERRORS, response.errors);
                } else {
                    commit(BILLING_PAYMENT_FORM_SUCCESS);
                }
            });
    },
    updateMethod({commit, state}, data) {
        commit(BILLING_PAYMENT_FORM_VALIDATION);

        return client.patch(`billing/payment/${data.merchant}/${data.id}/method`, state.formData)
            .then(response => {
                if (response.error) {
                    if ('non_field_errors' in response.errors) {
                        commit(BILLING_PAYMENT_FORM_NON_FIELD_ERROR, response.errors['non_field_errors'][0]);
                    } else {
                        commit(BILLING_PAYMENT_FORM_ERRORS, response.errors);
                    }
                } else {
                    commit(BILLING_PAYMENT_FORM_SUCCESS);
                }
            });
    }
};

const mutations = {
    [BILLING_PAYMENT_CHOICE_COMPANY](state, data) {
        state.choiceCompany = data;
    },
    [BILLING_PAYMENT_CHOICE_MERCHANT](state, data) {
        state.choiceMerchant = data;
    },
    [BILLING_PAYMENT_CHOICE_METHOD](state, data) {
        state.choiceMethod = data;
    },
    [BILLING_PAYMENT_DELETE](state, data) {
        state.search = state.search.filter(item => item.id !== data.id);
    },
    [BILLING_PAYMENT_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
        state.nonFieldFormError = 0;
    },
    [BILLING_PAYMENT_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [BILLING_PAYMENT_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [BILLING_PAYMENT_FORM_NON_FIELD_ERROR](state, data) {
        state.nonFieldFormError = 5;
        state.nonFieldFormMessage = data;
    },
    [BILLING_PAYMENT_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [BILLING_PAYMENT_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
        state.nonFieldFormError = 0;
    },
    [BILLING_PAYMENT_SEARCH](state, data) {
        state.search = data;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
