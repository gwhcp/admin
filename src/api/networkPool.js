import client from "@/api/client";

import {
    NETWORK_POOL_CHOICE_ASSIGNED,
    NETWORK_POOL_DELETE,
    NETWORK_POOL_FORM_CLEAN,
    NETWORK_POOL_FORM_DATA,
    NETWORK_POOL_FORM_ERRORS,
    NETWORK_POOL_FORM_SUCCESS,
    NETWORK_POOL_FORM_VALIDATION,
    NETWORK_POOL_SEARCH,
    NETWORK_POOL_TYPES
} from "@/api/types";

const state = {
    choiceAssigned: {},
    formData: {},
    formErrors: [],
    formSuccess: 0,
    search: [],
    types: []
};

const getters = {};

const actions = {
    createPool({commit, state}) {
        commit(NETWORK_POOL_FORM_VALIDATION);

        return client.post('network/pool/create', state.formData)
            .then(response => {
                if (response.error) {
                    commit(NETWORK_POOL_FORM_ERRORS, response.errors);
                } else {
                    commit(NETWORK_POOL_FORM_SUCCESS);
                }
            });
    },
    deletePool({commit}, data) {
        commit(NETWORK_POOL_DELETE, data);

        return client.delete(`network/pool/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(NETWORK_POOL_FORM_CLEAN);
    },
    getChoiceAssigned({commit}) {
        client.get('network/pool/choice/assigned')
            .then(data => commit(NETWORK_POOL_CHOICE_ASSIGNED, data));
    },
    getProfile({commit}, data) {
        client.get(`network/pool/profile/${data.id}`)
            .then(data => commit(NETWORK_POOL_FORM_DATA, data));
    },
    getSearch({commit}) {
        client.get('network/pool/search')
            .then(data => commit(NETWORK_POOL_SEARCH, data));
    },
    updateProfile({commit, state}, data) {
        commit(NETWORK_POOL_FORM_VALIDATION);

        return client.patch(`network/pool/profile/${data.id}`, state.formData)
            .then(response => {
                if (response.error) {
                    commit(NETWORK_POOL_FORM_ERRORS, response.errors);
                } else {
                    commit(NETWORK_POOL_FORM_SUCCESS);
                }
            });
    }
};

const mutations = {
    [NETWORK_POOL_CHOICE_ASSIGNED](state, data) {
        state.choiceAssigned = data;
    },
    [NETWORK_POOL_DELETE](state, data) {
        state.search = state.search.filter(item => item.id !== data.id);
    },
    [NETWORK_POOL_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [NETWORK_POOL_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [NETWORK_POOL_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [NETWORK_POOL_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [NETWORK_POOL_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [NETWORK_POOL_SEARCH](state, data) {
        state.search = data;
    },
    [NETWORK_POOL_TYPES](state, data) {
        state.types = data;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
