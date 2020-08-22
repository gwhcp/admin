import client from "@/api/client";

import {
    COMPANY_DNS_NAMESERVER_BASE,
    COMPANY_DNS_NAMESERVER_DOMAIN,
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
    choices: {},
    formArr: [],
    formErrors: {},
    formObj: {},
    formSuccess: false,
    nameserverBase: [],
    nameserverDomain: []
};

const getters = {
    choices: state => state.choices,
    formArr: state => state.formArr,
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess,
    nameserverBase: state => state.nameserverBase,
    nameserverDomain: state => state.nameserverDomain
};

const actions = {
    createRecord({commit, state}) {
        commit(FORM_VALIDATION);

        return client.post('company/dns/create', state.formObj)
            .then(response => {
                if (response.error) {
                    commit(FORM_ERRORS, response.errors);
                } else {
                    commit(FORM_SUCCESS);
                }
            });
    },
    deleteRecord({commit}, data) {
        commit(FORM_DELETE, data);

        return client.delete(`company/dns/delete/${data.domain}/${data.id}`);
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    getChoices({commit}) {
        client.get('company/dns/choices')
            .then(data => commit(FORM_CHOICES, data));
    },
    getNameserver({commit}, data) {
        commit(FORM_CLEAN);

        client.get('company/dns/choices')
            .then(data => commit(COMPANY_DNS_NAMESERVER_BASE, data));

        client.get(`company/dns/ns/${data.id}`)
            .then(data => commit(COMPANY_DNS_NAMESERVER_DOMAIN, data));
    },
    getProfile({commit}, data) {
        commit(FORM_CLEAN);

        client.get(`company/dns/profile/${data.id}`)
            .then(data => commit(FORM_OBJECT, data));
    },
    getSearchRecord({commit}, data) {
        client.get(`company/dns/search/${data.id}`)
            .then(data => commit(FORM_ARRAY, data));
    },
    getSearch({commit}) {
        client.get('company/dns/search')
            .then(data => commit(FORM_ARRAY, data));
    },
    updateNameserver({commit}, data) {
        commit(FORM_VALIDATION);

        return client.patch(`company/dns/ns/${data.id}`, {'ns': data.ns})
            .then(response => {
                if (response.error) {
                    commit(FORM_ERRORS, response.errors);
                } else {
                    commit(FORM_SUCCESS);
                }
            })
    },
    updateProfile({commit, state}, data) {
        commit(FORM_VALIDATION);

        return client.patch(`company/dns/profile/${data.id}`, state.formObj)
            .then(response => {
                if (response.error) {
                    commit(FORM_ERRORS, response.errors);
                } else {
                    commit(FORM_SUCCESS);
                }
            })
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
        state.nameserverBase = [];
        state.nameserverDomain = [];
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
    },
    [COMPANY_DNS_NAMESERVER_BASE](state, data) {
        const ns = [];

        for (const [key, value] of Object.entries(data.ns)) {
            ns.push({
                value: key,
                label: value
            })
        }

        state.nameserverBase = ns;
    },
    [COMPANY_DNS_NAMESERVER_DOMAIN](state, data) {
        state.nameserverDomain = data.ns;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
