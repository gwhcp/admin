import client from "@/api/client";

import {
    COMPANY_COMPANY_DELETE,
    COMPANY_COMPANY_FORM_CLEAN,
    COMPANY_COMPANY_FORM_DATA,
    COMPANY_COMPANY_FORM_ERRORS,
    COMPANY_COMPANY_FORM_SUCCESS,
    COMPANY_COMPANY_FORM_VALIDATION,
    COMPANY_COMPANY_SEARCH
} from "@/api/types";

const state = {
    formData: {},
    formErrors: [],
    formSuccess: 0,
    search: []
};

const getters = {};

const actions = {
    createCompany({commit, state}) {
        commit(COMPANY_COMPANY_FORM_VALIDATION);

        return client.post('company/company/create', state.formData)
            .then(response => {
                if (response.error) {
                    commit(COMPANY_COMPANY_FORM_ERRORS, response.errors);
                } else {
                    commit(COMPANY_COMPANY_FORM_SUCCESS);
                }
            });
    },
    deleteCompany({commit}, data) {
        commit(COMPANY_COMPANY_DELETE, data);

        return client.delete(`company/company/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(COMPANY_COMPANY_FORM_CLEAN);
    },
    getProfile({commit}, data) {
        commit(COMPANY_COMPANY_FORM_CLEAN);

        client.get(`company/company/profile/${data.id}`)
            .then(data => commit(COMPANY_COMPANY_FORM_DATA, data));
    },
    getSearch({commit}) {
        client.get('company/company/search')
            .then(data => commit(COMPANY_COMPANY_SEARCH, data));
    },
    updateProfile({commit, state}, data) {
        commit(COMPANY_COMPANY_FORM_VALIDATION);

        return client.patch(`company/company/profile/${data.id}`, state.formData)
            .then(response => {
                if (response.error) {
                    commit(COMPANY_COMPANY_FORM_ERRORS, response.errors);
                } else {
                    commit(COMPANY_COMPANY_FORM_SUCCESS);
                }
            })
    }
};

const mutations = {
    [COMPANY_COMPANY_DELETE](state, data) {
        state.search = state.search.filter(item => item.id !== data.id);
    },
    [COMPANY_COMPANY_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [COMPANY_COMPANY_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [COMPANY_COMPANY_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [COMPANY_COMPANY_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [COMPANY_COMPANY_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [COMPANY_COMPANY_SEARCH](state, data) {
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
