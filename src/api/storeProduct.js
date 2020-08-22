import client from "@/api/client";

import {FORM_CHOICES} from "@/api/types";

const state = {
    choices: {}
};

const getters = {
    choices: state => state.choices
};

const actions = {
    getChoices({commit}) {
        client.get('store/product/choices')
            .then(data => commit(FORM_CHOICES, data));
    }
};

const mutations = {
    [FORM_CHOICES](state, data) {
        state.choices = data;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
