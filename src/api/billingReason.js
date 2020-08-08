import client from "@/api/client";

import {
    BILLING_REASON_CHOICE_TYPE,
    BILLING_REASON_DELETE,
    BILLING_REASON_FORM_CLEAN,
    BILLING_REASON_FORM_DATA,
    BILLING_REASON_FORM_ERRORS,
    BILLING_REASON_FORM_SUCCESS,
    BILLING_REASON_FORM_VALIDATION,
    BILLING_REASON_SEARCH
} from "@/api/types";

const state = {
    choiceType: {},
    formData: {},
    formErrors: [],
    formSuccess: 0,
    search: []
};

const getters = {};

const actions = {
    createReason({commit, state}) {
        commit(BILLING_REASON_FORM_VALIDATION);

        return client.post('billing/reason/create', state.formData)
            .then(response => {
                if (response.error) {
                    commit(BILLING_REASON_FORM_ERRORS, response.errors);
                } else {
                    commit(BILLING_REASON_FORM_SUCCESS);
                }
            });
    },
    deleteReason({commit}, data) {
        commit(BILLING_REASON_DELETE, data);

        return client.delete(`billing/reason/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(BILLING_REASON_FORM_CLEAN);
    },
    getChoiceType({commit}) {
        client.get('billing/reason/choice/type')
            .then(data => commit(BILLING_REASON_CHOICE_TYPE, data));
    },
    getProfile({commit}, data) {
        commit(BILLING_REASON_FORM_CLEAN);

        client.get(`billing/reason/profile/${data.id}`)
            .then(data => commit(BILLING_REASON_FORM_DATA, data));
    },
    getSearch({commit}) {
        client.get('billing/reason/search')
            .then(data => commit(BILLING_REASON_SEARCH, data));
    }
};

const mutations = {
    [BILLING_REASON_CHOICE_TYPE](state, data) {
        state.choiceType = data;
    },
    [BILLING_REASON_DELETE](state, data) {
        state.search = state.search.filter(item => item.id !== data.id);
    },
    [BILLING_REASON_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [BILLING_REASON_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [BILLING_REASON_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [BILLING_REASON_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [BILLING_REASON_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [BILLING_REASON_SEARCH](state, data) {
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
