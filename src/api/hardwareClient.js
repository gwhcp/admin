import client from "@/api/client";

import {
    FORM_ARRAY,
    FORM_CHOICES,
    FORM_CLEAN,
    FORM_DELETE,
    FORM_ERRORS,
    FORM_OBJECT,
    FORM_SUCCESS,
    FORM_VALIDATION,
    INSTALL_SUCCESS,
    INSTALL_VALIDATION,
    INSTALL_WARNING
} from "@/api/types";

const state = {
    choices: Object,
    formArr: Array,
    formErrors: Object,
    formObj: Object,
    formSuccess: Boolean,
    installSuccess: Boolean,
    installWarning: Boolean
};

const getters = {
    choices: state => state.choices,
    formArr: state => state.formArr,
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess,
    installSuccess: state => state.installSuccess,
    installWarning: state => state.installWarning
};

const actions = {
    async createHardware({commit, state}) {
        commit(FORM_VALIDATION);

        const response = await client.post(
            'hardware/client/create',
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
    },
    async deleteHardware({commit}, data) {
        commit(FORM_DELETE, data);

        await client.delete(
            `hardware/client/delete/${data.id}`
        );
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    async getChoices({commit}) {
        const response = await client.get(
            'hardware/client/choices'
        );

        commit(FORM_CHOICES, response);
    },
    async getProfile({commit}, data) {
        commit(FORM_CLEAN);

        const response = await client.get(
            `hardware/client/profile/${data.id}`
        );

        commit(FORM_OBJECT, response);
    },
    async getSearch({commit}) {
        commit(FORM_CLEAN);

        const response = await client.get(
            'hardware/client/search'
        );

        commit(FORM_ARRAY, response);
    },
    async installHardware({commit}, data) {
        commit(INSTALL_VALIDATION);

        const response = await client.patch(
            `hardware/client/install/${data.id}`,
            {
                'in_queue': true, // TODO move this to a model
                'is_installed': true
            }
        );

        if (response.error) {
            commit(INSTALL_WARNING);
        } else {
            commit(INSTALL_SUCCESS);
        }
    },
    async updateProfile({commit, state}, data) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            `hardware/client/profile/${data.id}`,
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
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
        state.installSuccess = false;
        state.installWarning = false;
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
    },
    [INSTALL_SUCCESS](state) {
        state.installSuccess = true;
        state.installWarning = false;
    },
    [INSTALL_VALIDATION](state) {
        state.installSuccess = false;
        state.installWarning = false;
    },
    [INSTALL_WARNING](state) {
        state.installSuccess = false;
        state.installWarning = true;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
