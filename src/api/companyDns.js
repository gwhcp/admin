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
    choices: Object,
    formArr: Array,
    formErrors: Object,
    formObj: Object,
    formSuccess: false,
    nameserverBase: Array,
    nameserverDomain: Array
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
    async createRecord({commit, state}) {
        commit(FORM_VALIDATION);

        const response = await client.post(
            'company/dns/create',
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
    },
    async deleteRecord({commit}, data) {
        commit(FORM_DELETE, data);

        await client.delete(
            `company/dns/delete/${data.domain}/${data.id}`
        );
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    async getChoices({commit}) {
        const response = await client.get(
            'company/dns/choices'
        );

        commit(FORM_CHOICES, response);
    },
    async getNameserver({commit}, data) {
        commit(FORM_CLEAN);

        const responseBase = await client.get(
            'company/dns/choices'
        );

        commit(COMPANY_DNS_NAMESERVER_BASE, responseBase);

        const responseDomain = await client.get(
            `company/dns/ns/${data.id}`
        );

        commit(COMPANY_DNS_NAMESERVER_DOMAIN, responseDomain);
    },
    async getProfile({commit}, data) {
        commit(FORM_CLEAN);

        const response = await client.get(
            `company/dns/profile/${data.id}`
        );

        commit(FORM_OBJECT, response);
    },
    async getSearchRecord({commit}, data) {
        commit(FORM_CLEAN);

        const response = await client.get(
            `company/dns/search/${data.id}`
        );

        commit(FORM_ARRAY, response);
    },
    async getSearch({commit}) {
        commit(FORM_CLEAN);

        const response = await client.get(
            'company/dns/search'
        );

        commit(FORM_ARRAY, response);
    },
    async updateNameserver({commit}, data) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            `company/dns/ns/${data.id}`,
            {
                'ns': data.ns
            }
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
    },
    async updateProfile({commit, state}, data) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            `company/dns/profile/${data.id}`,
            state.formObj
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
                value: parseInt(key, 10),
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
};
