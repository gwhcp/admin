import client from "@/api/client";

import {
    FORM_ARRAY,
    FORM_CHOICES,
    FORM_CLEAN,
    FORM_DELETE,
    FORM_ERRORS, FORM_NON_FIELD_ERROR,
    FORM_OBJECT,
    FORM_SUCCESS,
    FORM_VALIDATION,
    HARDWARE_COMPANY_DOMAIN_ALLOWED,
    HARDWARE_COMPANY_DOMAIN_BASE,
    INSTALL_SUCCESS,
    INSTALL_VALIDATION,
    INSTALL_WARNING
} from "@/api/types";

const state = {
    choices: Object,
    domainAllowed: Array,
    domainBase: Array,
    formArr: Array,
    formErrors: Object,
    formObj: Object,
    formSuccess: false,
    installSuccess: false,
    installWarning: false,
    nonFieldFormError: false,
    nonFieldFormMessage: null
};

const getters = {
    choices: state => state.choices,
    domainAllowed: state => state.domainAllowed,
    domainBase: state => state.domainBase,
    formArr: state => state.formArr,
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess,
    installSuccess: state => state.installSuccess,
    installWarning: state => state.installWarning,
    nonFieldFormError: state => state.nonFieldFormError,
    nonFieldFormMessage: state => state.nonFieldFormMessage
};

const actions = {
    async createHardware({commit, state}) {
        commit(FORM_VALIDATION);

        const response = await client.post(
            'hardware/company/create',
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
    },
    async deleteHardware({commit}, data) {
        commit(FORM_DELETE, data);

        await client.delete(
            `hardware/company/delete/${data.id}`
        );
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    async getChoices({commit}) {
        const response = await client.get(
            'hardware/company/choices'
        );

        commit(FORM_CHOICES, response);
    },
    async getDomain({commit}, data) {
        commit(FORM_CLEAN);

        const responseBase = await client.get(
            'hardware/company/choices'
        );

        commit(HARDWARE_COMPANY_DOMAIN_BASE, responseBase);

        const responseDomain = await client.get(
            `hardware/company/domain/${data.id}`
        );

        commit(HARDWARE_COMPANY_DOMAIN_ALLOWED, responseDomain);
    },
    async getProfile({commit}, data) {
        commit(FORM_CLEAN);

        const response = await client.get(
            `hardware/company/profile/${data.id}`
        );

        commit(FORM_OBJECT, response);
    },
    async getSearch({commit}) {
        commit(FORM_CLEAN);

        const response = await client.get(
            'hardware/company/search'
        );

        commit(FORM_ARRAY, response);
    },
    async installHardware({commit}, data) {
        commit(INSTALL_VALIDATION);

        const response = await client.patch(
            `hardware/company/install/${data.id}`,
            {
                'in_queue': true, // TODO move this to a model
                'is_installed': true
            }
        );

        if (response.error) {
            commit(INSTALL_WARNING);
        } else {
            commit(INSTALL_SUCCESS);
        }
    },
    async updateDomain({commit}, data) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            `hardware/company/domain/${data.id}`,
            {
                'allowed': data.allowed
            }
        );

        if (response.error) {
            if ('allowed' in response.errors) {
                commit(FORM_NON_FIELD_ERROR, response.errors['allowed'][0]);
            } else {
                commit(FORM_NON_FIELD_ERROR, response.errors);
            }
        } else {
            commit(FORM_SUCCESS);
        }
    },
    async updateProfile({commit, state}, data) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            `hardware/company/profile/${data.id}`,
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
        state.domainAllowed = [];
        state.domainBase = [];
        state.formArr = [];
        state.formErrors = {};
        state.formObj = {};
        state.formSuccess = false;
        state.installSuccess = false;
        state.installWarning = false;
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
    },
    [HARDWARE_COMPANY_DOMAIN_ALLOWED](state, data) {
        state.domainAllowed = data.allowed;
    },
    [HARDWARE_COMPANY_DOMAIN_BASE](state, data) {
        const domains = [];

        for (const [key, value] of Object.entries(data.domain)) {
            domains.push({
                value: parseInt(key, 10),
                label: value
            })
        }

        state.domainBase = domains;
    },
    [INSTALL_SUCCESS](state) {
        state.installSuccess = true;
        state.installWarning = false;
    },
    [INSTALL_VALIDATION](state) {
        state.installSuccess = false;
        state.installWarning = false;
    },
    [INSTALL_WARNING](state) {
        state.installSuccess = false;
        state.installWarning = true;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
