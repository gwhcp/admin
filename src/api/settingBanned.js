import client from "@/api/client";

import {
    SETTING_BANNED_CHOICE_TYPE,
    SETTING_BANNED_DELETE,
    SETTING_BANNED_FORM_CLEAN,
    SETTING_BANNED_FORM_DATA,
    SETTING_BANNED_FORM_ERRORS,
    SETTING_BANNED_FORM_SUCCESS,
    SETTING_BANNED_FORM_VALIDATION,
    SETTING_BANNED_SEARCH
} from "@/api/types";

const state = {
    choiceType: {},
    formData: {},
    formErrors: [],
    formSuccess: 0,
    search: []
};

const getters = {};

const actions = {
    createBanned({commit, state}) {
        commit(SETTING_BANNED_FORM_VALIDATION);

        return client.post('setting/banned/create', state.formData)
            .then(response => {
                if (response.error) {
                    commit(SETTING_BANNED_FORM_ERRORS, response.errors);
                } else {
                    commit(SETTING_BANNED_FORM_SUCCESS);
                }
            });
    },
    deleteBanned({commit}, data) {
        commit(SETTING_BANNED_DELETE, data);

        return client.delete(`setting/banned/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(SETTING_BANNED_FORM_CLEAN);
    },
    getChoiceType({commit}) {
        client.get('setting/banned/choice/type')
            .then(data => commit(SETTING_BANNED_CHOICE_TYPE, data));
    },
    getProfile({commit}, data) {
        client.get(`setting/banned/profile/${data.id}`)
            .then(data => commit(SETTING_BANNED_FORM_DATA, data));
    },
    getSearch({commit}) {
        client.get('setting/banned/search')
            .then(data => commit(SETTING_BANNED_SEARCH, data));
    }
};

const mutations = {
    [SETTING_BANNED_CHOICE_TYPE](state, data) {
        state.choiceType = data;
    },
    [SETTING_BANNED_DELETE](state, data) {
        state.search = state.search.filter(item => item.id !== data.id);
    },
    [SETTING_BANNED_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [SETTING_BANNED_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [SETTING_BANNED_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [SETTING_BANNED_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [SETTING_BANNED_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [SETTING_BANNED_SEARCH](state, data) {
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
