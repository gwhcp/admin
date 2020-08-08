import client from "@/api/client";

import {
    HARDWARE_CLIENT_CHOICE_DOMAIN, HARDWARE_CLIENT_CHOICE_HARDWARE,
    HARDWARE_CLIENT_CHOICE_TARGET, HARDWARE_CLIENT_CHOICE_WEB,
    HARDWARE_CLIENT_DELETE,
    HARDWARE_CLIENT_FORM_CLEAN,
    HARDWARE_CLIENT_FORM_DATA,
    HARDWARE_CLIENT_FORM_ERRORS,
    HARDWARE_CLIENT_FORM_SUCCESS,
    HARDWARE_CLIENT_FORM_VALIDATION,
    HARDWARE_CLIENT_INSTALL_SUCCESS,
    HARDWARE_CLIENT_INSTALL_VALIDATION,
    HARDWARE_CLIENT_INSTALL_WARNING,
    HARDWARE_CLIENT_SEARCH
} from "@/api/types";

const state = {
    choiceDomain: {},
    choiceHardware: {},
    choiceTarget: {},
    choiceWeb: {},
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
        commit(HARDWARE_CLIENT_FORM_VALIDATION);

        return client.post('hardware/client/create', state.formData)
            .then(response => {
                if (response.error) {
                    commit(HARDWARE_CLIENT_FORM_ERRORS, response.errors);
                } else {
                    commit(HARDWARE_CLIENT_FORM_SUCCESS);
                }
            });
    },
    deleteHardware({commit}, data) {
        commit(HARDWARE_CLIENT_DELETE, data);

        return client.delete(`hardware/client/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(HARDWARE_CLIENT_FORM_CLEAN);
    },
    getChoiceDomain({commit}) {
        client.get('hardware/client/choice/domain')
            .then(data => commit(HARDWARE_CLIENT_CHOICE_DOMAIN, data));
    },
    getChoiceHardware({commit}) {
        client.get('hardware/client/choice/hardware')
            .then(data => commit(HARDWARE_CLIENT_CHOICE_HARDWARE, data));
    },
    getChoiceTarget({commit}) {
        client.get('hardware/client/choice/target')
            .then(data => commit(HARDWARE_CLIENT_CHOICE_TARGET, data));
    },
    getChoiceWeb({commit}) {
        client.get('hardware/client/choice/web')
            .then(data => commit(HARDWARE_CLIENT_CHOICE_WEB, data));
    },
    getProfile({commit}, data) {
        commit(HARDWARE_CLIENT_FORM_CLEAN);

        client.get(`hardware/client/profile/${data.id}`)
            .then(data => commit(HARDWARE_CLIENT_FORM_DATA, data));
    },
    getSearch({commit}) {
        client.get('hardware/client/search')
            .then(data => commit(HARDWARE_CLIENT_SEARCH, data));
    },
    installHardware({commit}, data) {
        commit(HARDWARE_CLIENT_INSTALL_VALIDATION);

        return client.patch(`hardware/client/install/${data.id}`, {
            'in_queue': true,
            'is_installed': true
        })
            .then(response => {
                if (response.error) {
                    commit(HARDWARE_CLIENT_INSTALL_WARNING);
                } else {
                    commit(HARDWARE_CLIENT_INSTALL_SUCCESS);
                }
            });
    },
    updateProfile({commit, state}, data) {
        commit(HARDWARE_CLIENT_FORM_VALIDATION);

        return client.patch(`hardware/client/profile/${data.id}`, state.formData)
            .then(response => {
                if (response.error) {
                    commit(HARDWARE_CLIENT_FORM_ERRORS, response.errors);
                } else {
                    commit(HARDWARE_CLIENT_FORM_SUCCESS);
                }
            });
    }
};

const mutations = {
    [HARDWARE_CLIENT_CHOICE_DOMAIN](state, data) {
        state.choiceDomain = data;
    },
    [HARDWARE_CLIENT_CHOICE_HARDWARE](state, data) {
        state.choiceHardware = data;
    },
    [HARDWARE_CLIENT_CHOICE_TARGET](state, data) {
        state.choiceTarget = data;
    },
    [HARDWARE_CLIENT_CHOICE_WEB](state, data) {
        state.choiceWeb = data;
    },
    [HARDWARE_CLIENT_DELETE](state, data) {
        state.search = state.search.filter(item => item.id !== data.id);
    },
    [HARDWARE_CLIENT_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [HARDWARE_CLIENT_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [HARDWARE_CLIENT_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [HARDWARE_CLIENT_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [HARDWARE_CLIENT_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [HARDWARE_CLIENT_INSTALL_SUCCESS](state) {
        state.installSuccess = 5;
        state.installWarning = 0;
    },
    [HARDWARE_CLIENT_INSTALL_VALIDATION](state) {
        state.installSuccess = 0;
        state.installWarning = 0;
    },
    [HARDWARE_CLIENT_INSTALL_WARNING](state) {
        state.installSuccess = 0;
        state.installWarning = 5;
    },
    [HARDWARE_CLIENT_SEARCH](state, data) {
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
