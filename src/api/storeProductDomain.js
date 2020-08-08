import client from "@/api/client";

import {
    STORE_PRODUCT_DOMAIN_DELETE,
    STORE_PRODUCT_DOMAIN_FORM_CLEAN,
    STORE_PRODUCT_DOMAIN_FORM_DATA,
    STORE_PRODUCT_DOMAIN_FORM_ERRORS,
    STORE_PRODUCT_DOMAIN_FORM_SUCCESS,
    STORE_PRODUCT_DOMAIN_FORM_VALIDATION,
    STORE_PRODUCT_DOMAIN_SEARCH
} from "@/api/types";

const state = {
    formData: {},
    formErrors: [],
    formSuccess: 0,
    search: []
};

const getters = {};

const actions = {
    createProduct({commit, state}) {
        commit(STORE_PRODUCT_DOMAIN_FORM_VALIDATION);

        return client.post('store/product/domain/create', state.formData)
            .then(response => {
                if (response.error) {
                    commit(STORE_PRODUCT_DOMAIN_FORM_ERRORS, response.errors);
                } else {
                    commit(STORE_PRODUCT_DOMAIN_FORM_SUCCESS);
                }
            });
    },
    deleteProduct({commit}, data) {
        commit(STORE_PRODUCT_DOMAIN_DELETE, data);

        return client.delete(`store/product/domain/delete/${data.id}`);
    },
    formClean({commit}) {
        commit(STORE_PRODUCT_DOMAIN_FORM_CLEAN);
    },
    getProfile({commit}, data) {
        commit(STORE_PRODUCT_DOMAIN_FORM_CLEAN);

        client.get(`store/product/domain/profile/${data.id}`)
            .then(data => commit(STORE_PRODUCT_DOMAIN_FORM_DATA, data));
    },
    getResource({commit}, data) {
        commit(STORE_PRODUCT_DOMAIN_FORM_CLEAN);

        client.get(`store/product/domain/resource/${data.id}`)
            .then(data => commit(STORE_PRODUCT_DOMAIN_FORM_DATA, data));
    },
    getSearch({commit}) {
        client.get('store/product/domain/search')
            .then(data => commit(STORE_PRODUCT_DOMAIN_SEARCH, data));
    },
    updateProfile({commit, state}, data) {
        commit(STORE_PRODUCT_DOMAIN_FORM_VALIDATION);

        return client.patch(`store/product/domain/profile/${data.id}`, state.formData)
            .then(response => {
                if (response.error) {
                    commit(STORE_PRODUCT_DOMAIN_FORM_ERRORS, response.errors);
                } else {
                    commit(STORE_PRODUCT_DOMAIN_FORM_SUCCESS);
                }
            });
    },
    updateResource({commit, state}, data) {
        commit(STORE_PRODUCT_DOMAIN_FORM_VALIDATION);

        return client.patch(`store/product/domain/resource/${data.id}`, state.formData)
            .then(response => {
                if (response.error) {
                    commit(STORE_PRODUCT_DOMAIN_FORM_ERRORS, response.errors);
                } else {
                    commit(STORE_PRODUCT_DOMAIN_FORM_SUCCESS);
                }
            });
    }
};

const mutations = {
    [STORE_PRODUCT_DOMAIN_DELETE](state, data) {
        state.search = state.search.filter(item => item.id !== data.id);
    },
    [STORE_PRODUCT_DOMAIN_FORM_CLEAN](state) {
        state.formData = {};
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [STORE_PRODUCT_DOMAIN_FORM_DATA](state, data) {
        state.formData = Object.assign({}, state.formData, data);
    },
    [STORE_PRODUCT_DOMAIN_FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [STORE_PRODUCT_DOMAIN_FORM_SUCCESS](state) {
        state.formErrors = [];
        state.formSuccess = 5;
    },
    [STORE_PRODUCT_DOMAIN_FORM_VALIDATION](state) {
        state.formErrors = [];
        state.formSuccess = 0;
    },
    [STORE_PRODUCT_DOMAIN_SEARCH](state, data) {
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
