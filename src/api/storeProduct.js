import client from "@/api/client";

import {STORE_PRODUCT_CHOICE_COMPANY, STORE_PRODUCT_CHOICE_IP, STORE_PRODUCT_CHOICE_WEB} from "@/api/types";

const state = {
    choiceCompany: {},
    choiceIp: {},
    choiceWeb: {}
};

const getters = {};

const actions = {
    getChoiceCompany({commit}) {
        client.get('store/product/choice/company')
            .then(data => commit(STORE_PRODUCT_CHOICE_COMPANY, data));
    },
    getChoiceIp({commit}) {
        client.get('store/product/choice/ip')
            .then(data => commit(STORE_PRODUCT_CHOICE_IP, data));
    },
    getChoiceWeb({commit}) {
        client.get('store/product/choice/web')
            .then(data => commit(STORE_PRODUCT_CHOICE_WEB, data));
    },
};

const mutations = {
    [STORE_PRODUCT_CHOICE_COMPANY](state, data) {
        state.choiceCompany = data;
    },
    [STORE_PRODUCT_CHOICE_IP](state, data) {
        state.choiceIp = data;
    },
    [STORE_PRODUCT_CHOICE_WEB](state, data) {
        state.choiceWeb = data;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
