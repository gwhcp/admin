import client from "@/api/client";

import {
    FORM_ARRAY,
    FORM_CHOICES,
    FORM_CLEAN,
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
    formSuccess: false
};

const getters = {
    choices: state => state.choices,
    formArr: state => state.formArr,
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess
};

const actions = {
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    getAccessLog({commit}) {
        client.get('employee/account/accesslog')
            .then(data => commit(FORM_ARRAY, data));
    },
    getChoices({commit}) {
        client.get('employee/account/choices')
            .then(data => commit(FORM_CHOICES, data));
    },
    getProfile({commit}) {
        commit(FORM_CLEAN);

        client.get('employee/account/profile')
            .then(data => commit(FORM_OBJECT, data));
    },
    updatePassword({commit, state}) {
        commit(FORM_VALIDATION);

        return client.patch('employee/account/password', state.formObj)
            .then(response => {
                if (response.error) {
                    commit(FORM_ERRORS, response.errors);
                } else {
                    commit(FORM_SUCCESS);
                }
            });
    },
    updateProfile({commit, state}) {
        commit(FORM_VALIDATION);

        return client.patch('employee/account/profile', state.formObj)
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
