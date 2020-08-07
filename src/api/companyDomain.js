import client from "@/api/client";

import {
    COMPANY_DOMAIN_CHOICE_COMPANY,
    COMPANY_DOMAIN_DELETE,
    COMPANY_DOMAIN_FORM_CLEAN,
    COMPANY_DOMAIN_FORM_DATA,
    COMPANY_DOMAIN_FORM_ERRORS,
    COMPANY_DOMAIN_FORM_SUCCESS,
    COMPANY_DOMAIN_FORM_VALIDATION,
    COMPANY_DOMAIN_SEARCH
} from "@/api/types";

const state = {
    choiceCompany: {},
    formData: {},
    formErrors: [],
    formSuccess: 0,
    search: []
};

const getters = {};

const actions = {
    createDomain({commit, state}) {
        commit(COMPANY_DOMAIN_FORM_VALIDATION);

        return client.post('company/domain/create', state.formData)
            .then(response => {
                if (response.error) {
                    commit(COMPANY_DOMAIN_FORM_ERRORS, response.errors);
                } else {
                    commit(COMPANY_DOMAIN_FORM_SUCCESS);
                }
            });
    },
    deleteDomain({commit}, data) {
        commit(COMPANY_DOMAIN_DELETE, data);

        return client.delete(`company/domain/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(COMPANY_DOMAIN_FORM_CLEAN);
    },
    getChoiceCompany({commit}) {
        client.get('company/domain/choice/company')
            .then(data => commit(COMPANY_DOMAIN_CHOICE_COMPANY, data));
    },
    getProfile({commit}, data) {
        client.get(`company/domain/profile/${data.id}`)
            .then(data => commit(COMPANY_DOMAIN_FORM_DATA, data));
    },
    getSearch({commit}) {
        client.get('company/domain/search')
            .then(data => commit(COMPANY_DOMAIN_SEARCH, data));
    }
};

const mutations = {
    [COMPANY_DOMAIN_CHOICE_COMPANY](state, data) {
        state.choiceCompany = data;
    },
    [COMPANY_DOMAIN_DELETE](state, data) {
        state.search = state.search.filter(item => item.id !== data.id);
    },
    [COMPANY_DOMAIN_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [COMPANY_DOMAIN_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [COMPANY_DOMAIN_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [COMPANY_DOMAIN_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [COMPANY_DOMAIN_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [COMPANY_DOMAIN_SEARCH](state, data) {
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
