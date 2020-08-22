import client from "@/api/client";

import {
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
    formObj: state => state.formObj,
    formSuccess: state => state.formSuccess
};

const actions = {
    createReason({commit, state}) {
        commit(FORM_VALIDATION);

        return client.post('billing/reason/create', state.formObj)
            .then(response => {
                if (response.error) {
                    commit(FORM_ERRORS, response.errors);
                } else {
                    commit(FORM_SUCCESS);
                }
            });
    },
    deleteReason({commit}, data) {
        commit(FORM_DELETE, data);

        return client.delete(`billing/reason/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    getChoices({commit}) {
        client.get('billing/reason/choices')
            .then(data => commit(FORM_CHOICES, data));
    },
    getProfile({commit}, data) {
        commit(FORM_CLEAN);

        client.get(`billing/reason/profile/${data.id}`)
            .then(data => commit(FORM_OBJECT, data));
    },
    getSearch({commit}) {
        client.get('billing/reason/search')
            .then(data => commit(FORM_ARRAY, data));
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
