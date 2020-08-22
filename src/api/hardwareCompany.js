import client from "@/api/client";

import {
    FORM_ARRAY,
    FORM_CHOICES,
    FORM_CLEAN,
    FORM_DELETE,
    FORM_ERRORS,
    FORM_OBJECT,
    FORM_SUCCESS,
    FORM_VALIDATION,
    INSTALL_SUCCESS,
    INSTALL_VALIDATION,
    INSTALL_WARNING
} from "@/api/types";

const state = {
    choices: {},
    formArr: [],
    formErrors: {},
    formObj: {},
    formSuccess: false,
    installSuccess: false,
    installWarning: false
};

const getters = {
    choices: state => state.choices,
    formArr: state => state.formArr,
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess,
    installSuccess: state => state.installSuccess,
    installWarning: state => state.installWarning
};

const actions = {
    createHardware({commit, state}) {
        commit(FORM_VALIDATION);

        return client.post('hardware/company/create', state.formObj)
            .then(response => {
                if (response.error) {
                    commit(FORM_ERRORS, response.errors);
                } else {
                    commit(FORM_SUCCESS);
                }
            });
    },
    deleteHardware({commit}, data) {
        commit(FORM_DELETE, data);

        return client.delete(`hardware/company/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    getChoices({commit}) {
        client.get('hardware/company/choices')
            .then(data => commit(FORM_CHOICES, data));
    },
    getProfile({commit}, data) {
        commit(FORM_CLEAN);

        client.get(`hardware/company/profile/${data.id}`)
            .then(data => commit(FORM_OBJECT, data));
    },
    getSearch({commit}) {
        client.get('hardware/company/search')
            .then(data => commit(FORM_ARRAY, data));
    },
    installHardware({commit}, data) {
        commit(INSTALL_VALIDATION);

        return client.patch(`hardware/company/install/${data.id}`, {
            'in_queue': true,
            'is_installed': true
        })
            .then(response => {
                if (response.error) {
                    commit(INSTALL_WARNING);
                } else {
                    commit(INSTALL_SUCCESS);
                }
            });
    },
    updateProfile({commit, state}, data) {
        commit(FORM_VALIDATION);

        return client.patch(`hardware/company/profile/${data.id}`, state.formObj)
            .then(response => {
                if (response.error) {
                    commit(FORM_ERRORS, response.errors);
                } else {
                    commit(FORM_SUCCESS);
                }
            });
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
        state.installSuccess = false;
        state.installWarning = false;
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
}
