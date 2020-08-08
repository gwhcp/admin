import client from "@/api/client";

import {
    COMPANY_DNS_CHOICE_RECORD_TYPE,
    COMPANY_DNS_DELETE,
    COMPANY_DNS_FORM_CLEAN,
    COMPANY_DNS_FORM_DATA,
    COMPANY_DNS_FORM_ERRORS,
    COMPANY_DNS_FORM_SUCCESS,
    COMPANY_DNS_FORM_VALIDATION,
    COMPANY_DNS_SEARCH
} from "@/api/types";

const state = {
    choiceRecordType: {},
    formData: {},
    formErrors: [],
    formSuccess: 0,
    search: []
};

const getters = {};

const actions = {
    createRecord({commit, state}) {
        commit(COMPANY_DNS_FORM_VALIDATION);

        return client.post('company/dns/create', state.formData)
            .then(response => {
                if (response.error) {
                    commit(COMPANY_DNS_FORM_ERRORS, response.errors);
                } else {
                    commit(COMPANY_DNS_FORM_SUCCESS);
                }
            });
    },
    deleteRecord({commit}, data) {
        commit(COMPANY_DNS_DELETE, data);

        return client.delete(`company/dns/delete/${data.domain}/${data.id}`);
    },
    formClean({commit}) {
        commit(COMPANY_DNS_FORM_CLEAN);
    },
    getChoiceRecordType({commit}) {
        client.get('company/dns/choice/recordtype')
            .then(data => commit(COMPANY_DNS_CHOICE_RECORD_TYPE, data));
    },
    getProfile({commit}, data) {
        commit(COMPANY_DNS_FORM_CLEAN);

        client.get(`company/dns/profile/${data.id}`)
            .then(data => commit(COMPANY_DNS_FORM_DATA, data));
    },
    getSearchRecord({commit}, data) {
        client.get(`company/dns/search/${data.id}`)
            .then(data => commit(COMPANY_DNS_SEARCH, data));
    },
    getSearch({commit}) {
        client.get('company/dns/search')
            .then(data => commit(COMPANY_DNS_SEARCH, data));
    },
    updateProfile({commit, state}, data) {
        commit(COMPANY_DNS_FORM_VALIDATION);

        return client.patch(`company/dns/profile/${data.id}`, state.formData)
            .then(response => {
                if (response.error) {
                    commit(COMPANY_DNS_FORM_ERRORS, response.errors);
                } else {
                    commit(COMPANY_DNS_FORM_SUCCESS);
                }
            })
    }
};

const mutations = {
    [COMPANY_DNS_CHOICE_RECORD_TYPE](state, data) {
        state.choiceRecordType = data;
    },
    [COMPANY_DNS_DELETE](state, data) {
        state.search = state.search.filter(item => item.id !== data.id);
    },
    [COMPANY_DNS_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [COMPANY_DNS_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [COMPANY_DNS_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [COMPANY_DNS_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [COMPANY_DNS_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [COMPANY_DNS_SEARCH](state, data) {
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
