import client from "@/api/client";

import {
    STORE_PRODUCT_PRICE_DELETE,
    STORE_PRODUCT_PRICE_FORM_CLEAN,
    STORE_PRODUCT_PRICE_FORM_DATA,
    STORE_PRODUCT_PRICE_FORM_ERRORS,
    STORE_PRODUCT_PRICE_FORM_SUCCESS,
    STORE_PRODUCT_PRICE_FORM_VALIDATION,
    STORE_PRODUCT_PRICE_SEARCH
} from "@/api/types";

const state = {
    formData: {},
    formErrors: [],
    formSuccess: 0,
    search: []
};

const getters = {};

const actions = {
    createPrice({commit, state}) {
        commit(STORE_PRODUCT_PRICE_FORM_VALIDATION);

        return client.post('store/product/price/create', state.formData)
            .then(response => {
                if (response.error) {
                    commit(STORE_PRODUCT_PRICE_FORM_ERRORS, response.errors);
                } else {
                    commit(STORE_PRODUCT_PRICE_FORM_SUCCESS);
                }
            });
    },
    deletePrice({commit}, data) {
        commit(STORE_PRODUCT_PRICE_DELETE, data);

        return client.delete(`store/product/price/delete/${data.productId}/${data.id}`);
    },
    formClean({commit}) {
        commit(STORE_PRODUCT_PRICE_FORM_CLEAN);
    },
    getProfile({commit}, data) {
        commit(STORE_PRODUCT_PRICE_FORM_CLEAN);

        client.get(`store/product/price/profile/${data.productId}/${data.id}`)
            .then(data => commit(STORE_PRODUCT_PRICE_FORM_DATA, data));
    },
    getSearch({commit}, data) {
        client.get(`store/product/price/search/${data.productId}`)
            .then(data => commit(STORE_PRODUCT_PRICE_SEARCH, data));
    },
    updateProfile({commit, state}, data) {
        commit(STORE_PRODUCT_PRICE_FORM_VALIDATION);

        return client.patch(`store/product/price/profile/${data.productId}/${data.id}`, state.formData)
            .then(response => {
                if (response.error) {
                    commit(STORE_PRODUCT_PRICE_FORM_ERRORS, response.errors);
                } else {
                    commit(STORE_PRODUCT_PRICE_FORM_SUCCESS);
                }
            });
    }
};

const mutations = {
    [STORE_PRODUCT_PRICE_DELETE](state, data) {
        state.search = state.search.filter(item => item.id !== data.id);
    },
    [STORE_PRODUCT_PRICE_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [STORE_PRODUCT_PRICE_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [STORE_PRODUCT_PRICE_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [STORE_PRODUCT_PRICE_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [STORE_PRODUCT_PRICE_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [STORE_PRODUCT_PRICE_SEARCH](state, data) {
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
