import client from "@/api/client";

import {
    STORE_FRAUD_CHOICE_TYPE,
    STORE_FRAUD_DELETE,
    STORE_FRAUD_FORM_CLEAN,
    STORE_FRAUD_FORM_DATA,
    STORE_FRAUD_FORM_ERRORS,
    STORE_FRAUD_FORM_SUCCESS,
    STORE_FRAUD_FORM_VALIDATION,
    STORE_FRAUD_SEARCH
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
    createFraudString({commit, state}) {
        commit(STORE_FRAUD_FORM_VALIDATION);

        return client.post('store/fraud/create', state.formData)
            .then(response => {
                if (response.error) {
                    commit(STORE_FRAUD_FORM_ERRORS, response.errors);
                } else {
                    commit(STORE_FRAUD_FORM_SUCCESS);
                }
            });
    },
    deleteFraudString({commit}, data) {
        commit(STORE_FRAUD_DELETE, data);

        return client.delete(`store/fraud/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(STORE_FRAUD_FORM_CLEAN);
    },
    getChoiceType({commit}) {
        client.get('store/fraud/choice/type')
            .then(data => commit(STORE_FRAUD_CHOICE_TYPE, data));
    },
    getProfile({commit}, data) {
        commit(STORE_FRAUD_FORM_CLEAN);

        client.get(`store/fraud/profile/${data.id}`)
            .then(data => commit(STORE_FRAUD_FORM_DATA, data));
    },
    getSearch({commit}) {
        client.get('store/fraud/search')
            .then(data => commit(STORE_FRAUD_SEARCH, data));
    }
};

const mutations = {
    [STORE_FRAUD_CHOICE_TYPE](state, data) {
        state.choiceType = data;
    },
    [STORE_FRAUD_DELETE](state, data) {
        state.search = state.search.filter(item => item.id !== data.id);
    },
    [STORE_FRAUD_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [STORE_FRAUD_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [STORE_FRAUD_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [STORE_FRAUD_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [STORE_FRAUD_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [STORE_FRAUD_SEARCH](state, data) {
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
