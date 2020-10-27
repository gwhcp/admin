import client from "@/api/client";

import {
    COMPANY_XMPP_REBUILD,
    FORM_ARRAY,
    FORM_CHOICES,
    FORM_CLEAN,
    FORM_DELETE,
    FORM_ERRORS,
    FORM_NON_FIELD_ERROR,
    FORM_OBJECT,
    FORM_SUCCESS,
    FORM_VALIDATION
} from "@/api/types";

const state = {
    choices: Object,
    formArr: Array,
    formErrors: Object,
    formObj: Object,
    formSuccess: Boolean,
    nonFieldFormError: Boolean,
    nonFieldFormMessage: null
};

const getters = {
    choices: state => state.choices,
    formArr: state => state.formArr,
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess,
    nonFieldFormError: state => state.nonFieldFormError,
    nonFieldFormMessage: state => state.nonFieldFormMessage
};

const actions = {
    async createAccount({commit, state}) {
        commit(FORM_VALIDATION);

        const response = await client.post(
            'company/xmpp/create',
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }

        await client.get(
            'company/xmpp/rebuild'
        );

        commit(COMPANY_XMPP_REBUILD);
    },
    async createGroup({commit, state}) {
        commit(FORM_VALIDATION);

        const response = await client.post(
            'company/xmpp/create/group',
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
    },
    async deleteAccount({commit}, data) {
        commit(FORM_DELETE, data);

        await client.delete(
            `company/xmpp/delete/${data.id}`
        );

        await client.get(
            'company/xmpp/rebuild'
        );

        commit(COMPANY_XMPP_REBUILD);
    },
    async deleteGroup({commit}, data) {
        commit(FORM_VALIDATION);

        const response = await client.delete(
            `company/xmpp/delete/group/${data.id}`
        );

        if (response.error) {
            commit(FORM_NON_FIELD_ERROR, response.errors['non_form_field_error']);
        } else {
            commit(FORM_DELETE, data);
        }
    },
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    async getChoices({commit}) {
        const response = await client.get(
            'company/xmpp/choices'
        );

        commit(FORM_CHOICES, response);
    },
    async getProfile({commit}, data) {
        commit(FORM_CLEAN);

        const responseChoices = await client.get(
            'company/xmpp/choices'
        );

        commit(FORM_CHOICES, responseChoices);

        const responseProfile = await client.get(
            `company/xmpp/profile/${data.id}`
        );

        commit(FORM_OBJECT, responseProfile);
    },
    async getSearchAccount({commit}) {
        commit(FORM_CLEAN);

        const response = await client.get(
            'company/xmpp/search'
        );

        commit(FORM_ARRAY, response);
    },
    async getSearchGroup({commit}) {
        commit(FORM_CLEAN);

        const response = await client.get(
            'company/xmpp/search/group'
        );

        commit(FORM_ARRAY, response);
    },
    async updateProfile({commit, state}, data) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            `company/xmpp/profile/${data.id}`,
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }

        await client.get(
            'company/xmpp/rebuild'
        );

        commit(COMPANY_XMPP_REBUILD);
    }
};

const mutations = {
    [COMPANY_XMPP_REBUILD]() {

    },
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
        state.nonFieldFormError = false;
        state.nonFieldFormMessage = null;
    },
    [FORM_DELETE](state, data) {
        state.formArr = state.formArr.filter(item => item.id !== data.id);
    },
    [FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [FORM_NON_FIELD_ERROR](state, data) {
        state.nonFieldFormError = true;
        state.nonFieldFormMessage = data;
    },
    [FORM_OBJECT](state, data) {
        state.formObj = Object.assign({}, state.formObj, data);
    },
    [FORM_SUCCESS](state) {
        state.formErrors = {};
        state.formSuccess = true;
        state.nonFieldFormError = false;
        state.nonFieldFormMessage = null;
    },
    [FORM_VALIDATION](state) {
        state.formErrors = {};
        state.formSuccess = false;
        state.nonFieldFormError = false;
        state.nonFieldFormMessage = null;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
