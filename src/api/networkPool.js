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
    formSuccess: state => state.formSuccess
};

const actions = {
    createPool({commit, state}) {
        commit(FORM_VALIDATION);

        return client.post('network/pool/create', state.formObj)
            .then(response => {
                if (response.error) {
                    commit(FORM_ERRORS, response.errors);
                } else {
                    commit(FORM_SUCCESS);
                }
            });
    },
    deletePool({commit}, data) {
        commit(FORM_DELETE, data);

        return client.delete(`network/pool/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    getChoices({commit}) {
        client.get('network/pool/choices')
            .then(data => commit(FORM_CHOICES, data));
    },
    getProfile({commit}, data) {
        commit(FORM_CLEAN);

        client.get(`network/pool/profile/${data.id}`)
            .then(data => commit(FORM_OBJECT, data));
    },
    getSearch({commit}) {
        client.get('network/pool/search')
            .then(data => commit(FORM_ARRAY, data));
    },
    updateProfile({commit, state}, data) {
        commit(FORM_VALIDATION);

        return client.patch(`network/pool/profile/${data.id}`, state.formObj)
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
