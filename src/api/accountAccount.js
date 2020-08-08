import client from "@/api/client";

import {
    ACCOUNT_ACCOUNT_CHOICE_COMMENT_ORDER,
    ACCOUNT_ACCOUNT_CHOICE_TIME_FORMAT,
    ACCOUNT_ACCOUNT_CHOICE_TIME_ZONE,
    ACCOUNT_ACCOUNT_FORM_CLEAN,
    ACCOUNT_ACCOUNT_FORM_DATA,
    ACCOUNT_ACCOUNT_FORM_ERRORS,
    ACCOUNT_ACCOUNT_FORM_SUCCESS,
    ACCOUNT_ACCOUNT_FORM_VALIDATION,
    ACCOUNT_ACCOUNT_SEARCH
} from "@/api/types";

const state = {
    choiceCommentOrder: {},
    choiceTimeFormat: {},
    choiceTimeZone: {},
    formData: {},
    formErrors: [],
    formSuccess: 0,
    search: []
};

const getters = {};

const actions = {
    getAccessLog({commit}) {
        client.get('account/account/accesslog')
            .then(data => commit(ACCOUNT_ACCOUNT_SEARCH, data));
    },
    getAccounts({commit}) {
        client.get('account/account/search')
            .then(data => commit(ACCOUNT_ACCOUNT_SEARCH, data));
    },
    getChoiceCommentOrder({commit}) {
        client.get('account/account/choice/commentorder')
            .then(data => commit(ACCOUNT_ACCOUNT_CHOICE_COMMENT_ORDER, data));
    },
    getChoiceTimeFormat({commit}) {
        client.get('account/account/choice/timeformat')
            .then(data => commit(ACCOUNT_ACCOUNT_CHOICE_TIME_FORMAT, data));
    },
    getChoiceTimeZone({commit}) {
        client.get('account/account/choice/timezone')
            .then(data => commit(ACCOUNT_ACCOUNT_CHOICE_TIME_ZONE, data));
    },
    getManageAccessLog({commit}, data) {
        client.get(`account/account/accesslog/${data.id}`)
            .then(data => commit(ACCOUNT_ACCOUNT_SEARCH, data));
    },
    getManageProfile({commit}, data) {
        commit(ACCOUNT_ACCOUNT_FORM_CLEAN);

        client.get(`account/account/profile/${data.id}`)
            .then(data => commit(ACCOUNT_ACCOUNT_FORM_DATA, data));
    },
    getProfile({commit}) {
        commit(ACCOUNT_ACCOUNT_FORM_CLEAN);

        client.get('account/account/profile')
            .then(data => commit(ACCOUNT_ACCOUNT_FORM_DATA, data));
    },
    updateManageProfile({commit, state}, data) {
        commit(ACCOUNT_ACCOUNT_FORM_VALIDATION);

        return client.patch(`account/account/profile/${data.id}`, state.formData)
            .then(response => {
                if (response.error) {
                    commit(ACCOUNT_ACCOUNT_FORM_ERRORS, response.errors);
                } else {
                    commit(ACCOUNT_ACCOUNT_FORM_SUCCESS);
                }
            });
    },
    updateProfile({commit, state}) {
        commit(ACCOUNT_ACCOUNT_FORM_VALIDATION);

        return client.patch('account/account/profile', state.formData)
            .then(response => {
                if (response.error) {
                    commit(ACCOUNT_ACCOUNT_FORM_ERRORS, response.errors);
                } else {
                    commit(ACCOUNT_ACCOUNT_FORM_SUCCESS);
                }
            });
    }
};

const mutations = {
    [ACCOUNT_ACCOUNT_CHOICE_COMMENT_ORDER](state, data) {
        state.choiceCommentOrder = data;
    },
    [ACCOUNT_ACCOUNT_CHOICE_TIME_FORMAT](state, data) {
        state.choiceTimeFormat = data;
    },
    [ACCOUNT_ACCOUNT_CHOICE_TIME_ZONE](state, data) {
        state.choiceTimeZone = data;
    },
    [ACCOUNT_ACCOUNT_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [ACCOUNT_ACCOUNT_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [ACCOUNT_ACCOUNT_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [ACCOUNT_ACCOUNT_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [ACCOUNT_ACCOUNT_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [ACCOUNT_ACCOUNT_SEARCH](state, data) {
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
