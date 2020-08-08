import client from "@/api/client";

import {
    HARDWARE_COMPANY_CHOICE_DOMAIN,
    HARDWARE_COMPANY_CHOICE_TARGET,
    HARDWARE_COMPANY_DELETE,
    HARDWARE_COMPANY_FORM_CLEAN,
    HARDWARE_COMPANY_FORM_DATA,
    HARDWARE_COMPANY_FORM_ERRORS,
    HARDWARE_COMPANY_FORM_SUCCESS,
    HARDWARE_COMPANY_FORM_VALIDATION,
    HARDWARE_COMPANY_INSTALL_SUCCESS,
    HARDWARE_COMPANY_INSTALL_VALIDATION,
    HARDWARE_COMPANY_INSTALL_WARNING,
    HARDWARE_COMPANY_SEARCH
} from "@/api/types";

const state = {
    choiceDomain: {},
    choiceTarget: {},
    formData: {},
    formErrors: [],
    formSuccess: 0,
    installSuccess: 0,
    installWarning: 0,
    search: []
};

const getters = {};

const actions = {
    createHardware({commit, state}) {
        commit(HARDWARE_COMPANY_FORM_VALIDATION);

        return client.post('hardware/company/create', state.formData)
            .then(response => {
                if (response.error) {
                    commit(HARDWARE_COMPANY_FORM_ERRORS, response.errors);
                } else {
                    commit(HARDWARE_COMPANY_FORM_SUCCESS);
                }
            });
    },
    deleteHardware({commit}, data) {
        commit(HARDWARE_COMPANY_DELETE, data);

        return client.delete(`hardware/company/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(HARDWARE_COMPANY_FORM_CLEAN);
    },
    getChoiceDomain({commit}) {
        client.get('hardware/company/choice/domain')
            .then(data => commit(HARDWARE_COMPANY_CHOICE_DOMAIN, data));
    },
    getChoiceTarget({commit}) {
        client.get('hardware/company/choice/target')
            .then(data => commit(HARDWARE_COMPANY_CHOICE_TARGET, data));
    },
    getProfile({commit}, data) {
        commit(HARDWARE_COMPANY_FORM_CLEAN);

        client.get(`hardware/company/profile/${data.id}`)
            .then(data => commit(HARDWARE_COMPANY_FORM_DATA, data));
    },
    getSearch({commit}) {
        client.get('hardware/company/search')
            .then(data => commit(HARDWARE_COMPANY_SEARCH, data));
    },
    installHardware({commit}, data) {
        commit(HARDWARE_COMPANY_INSTALL_VALIDATION);

        return client.patch(`hardware/company/install/${data.id}`, {
            'in_queue': true,
            'is_installed': true
        })
            .then(response => {
                if (response.error) {
                    commit(HARDWARE_COMPANY_INSTALL_WARNING);
                } else {
                    commit(HARDWARE_COMPANY_INSTALL_SUCCESS);
                }
            });
    },
    updateProfile({commit, state}, data) {
        commit(HARDWARE_COMPANY_FORM_VALIDATION);

        return client.patch(`hardware/company/profile/${data.id}`, state.formData)
            .then(response => {
                if (response.error) {
                    commit(HARDWARE_COMPANY_FORM_ERRORS, response.errors);
                } else {
                    commit(HARDWARE_COMPANY_FORM_SUCCESS);
                }
            });
    }
};

const mutations = {
    [HARDWARE_COMPANY_CHOICE_DOMAIN](state, data) {
        state.choiceDomain = data;
    },
    [HARDWARE_COMPANY_CHOICE_TARGET](state, data) {
        state.choiceTarget = data;
    },
    [HARDWARE_COMPANY_DELETE](state, data) {
        state.search = state.search.filter(item => item.id !== data.id);
    },
    [HARDWARE_COMPANY_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [HARDWARE_COMPANY_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [HARDWARE_COMPANY_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [HARDWARE_COMPANY_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [HARDWARE_COMPANY_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [HARDWARE_COMPANY_INSTALL_SUCCESS](state) {
        state.installSuccess = 5;
        state.installWarning = 0;
    },
    [HARDWARE_COMPANY_INSTALL_VALIDATION](state) {
        state.installSuccess = 0;
        state.installWarning = 0;
    },
    [HARDWARE_COMPANY_INSTALL_WARNING](state) {
        state.installSuccess = 0;
        state.installWarning = 5;
    },
    [HARDWARE_COMPANY_SEARCH](state, data) {
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
