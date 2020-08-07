import client from "@/api/client";

import {
    SETTING_EMAIL_CHOICE_TEMPLATE,
    SETTING_EMAIL_DELETE,
    SETTING_EMAIL_FORM_CLEAN,
    SETTING_EMAIL_FORM_DATA,
    SETTING_EMAIL_FORM_ERRORS,
    SETTING_EMAIL_FORM_SUCCESS,
    SETTING_EMAIL_FORM_VALIDATION,
    SETTING_EMAIL_SEARCH
} from "@/api/types";

const state = {
    choiceTemplate: {},
    formData: {},
    formErrors: [],
    formSuccess: 0,
    search: []
};

const getters = {};

const actions = {
    createEmailTemplate({commit, state}) {
        commit(SETTING_EMAIL_FORM_VALIDATION);

        return client.post('setting/email/create', state.formData)
            .then(response => {
                if (response.error) {
                    commit(SETTING_EMAIL_FORM_ERRORS, response.errors);
                } else {
                    commit(SETTING_EMAIL_FORM_SUCCESS);
                }
            });
    },
    deleteEmailTemplate({commit}, data) {
        commit(SETTING_EMAIL_DELETE, data);

        return client.delete(`setting/email/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(SETTING_EMAIL_FORM_CLEAN);
    },
    getChoiceTemplate({commit}) {
        client.get('setting/email/choice/template')
            .then(data => commit(SETTING_EMAIL_CHOICE_TEMPLATE, data));
    },
    getProfile({commit}, data) {
        client.get(`setting/email/profile/${data.id}`)
            .then(data => commit(SETTING_EMAIL_FORM_DATA, data));
    },
    getSearch({commit}) {
        client.get('setting/email/search')
            .then(data => commit(SETTING_EMAIL_SEARCH, data));
    },
    updateProfile({commit, state}, data) {
        commit(SETTING_EMAIL_FORM_VALIDATION);

        return client.patch(`setting/email/profile/${data.id}`, state.formData)
            .then(response => {
                if (response.error) {
                    commit(SETTING_EMAIL_FORM_ERRORS, response.errors);
                } else {
                    commit(SETTING_EMAIL_FORM_SUCCESS);
                }
            });
    }
};

const mutations = {
    [SETTING_EMAIL_CHOICE_TEMPLATE](state, data) {
        state.choiceTemplate = data;
    },
    [SETTING_EMAIL_DELETE](state, data) {
        state.search = state.search.filter(item => item.id !== data.id);
    },
    [SETTING_EMAIL_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [SETTING_EMAIL_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [SETTING_EMAIL_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [SETTING_EMAIL_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [SETTING_EMAIL_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [SETTING_EMAIL_SEARCH](state, data) {
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
