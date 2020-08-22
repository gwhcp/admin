import client from "@/api/client";

import {
    FORM_ARRAY,
    FORM_CLEAN,
    FORM_DELETE,
    FORM_ERRORS,
    FORM_OBJECT,
    FORM_SUCCESS,
    FORM_VALIDATION
} from "@/api/types";

const state = {
    formArr: [],
    formErrors: {},
    formObj: {},
    formSuccess: false
};

const getters = {
    formArr: state => state.formArr,
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess
};

const actions = {
    createPrice({commit, state}) {
        commit(FORM_VALIDATION);

        return client.post('store/product/price/create', state.formObj)
            .then(response => {
                if (response.error) {
                    commit(FORM_ERRORS, response.errors);
                } else {
                    commit(FORM_SUCCESS);
                }
            });
    },
    deletePrice({commit}, data) {
        commit(FORM_DELETE, data);

        return client.delete(`store/product/price/delete/${data.productId}/${data.id}`);
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    getProfile({commit}, data) {
        commit(FORM_CLEAN);

        client.get(`store/product/price/profile/${data.productId}/${data.id}`)
            .then(data => commit(FORM_OBJECT, data));
    },
    getSearch({commit}, data) {
        client.get(`store/product/price/search/${data.productId}`)
            .then(data => commit(FORM_ARRAY, data));
    },
    updateProfile({commit, state}, data) {
        commit(FORM_VALIDATION);

        return client.patch(`store/product/price/profile/${data.productId}/${data.id}`, state.formObj)
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
