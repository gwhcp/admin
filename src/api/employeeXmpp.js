import client from "@/api/client";

import {FORM_CLEAN, FORM_ERRORS, FORM_OBJECT, FORM_SUCCESS, FORM_VALIDATION} from "@/api/types";

const state = {
    formErrors: Object,
    formObj: Object,
    formSuccess: false
};

const getters = {
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess
};

const actions = {
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    async getProfile({commit}) {
        commit(FORM_CLEAN);

        const responseProfile = await client.get(
            'employee/xmpp/profile'
        );

        commit(FORM_OBJECT, responseProfile);
    },
    async updateProfile({commit, state}) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            'employee/xmpp/profile',
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
    [FORM_CLEAN](state) {
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
};
