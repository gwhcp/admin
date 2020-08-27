import client from "@/api/client";

import {FORM_CHOICES} from "@/api/types";

const state = {
    choices: Object
};

const getters = {
    choices: state => state.choices
};

const actions = {
    async getChoices({commit}) {
        const response = await client.get(
            'store/product/choices'
        );

        commit(FORM_CHOICES, response);
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
};
