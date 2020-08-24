import {
    auth,
    billingPayment,
    billingReason,
    companyCompany,
    companyDns,
    companyDomain,
    companyMail,
    employeeAccount,
    employeeManage,
    hardwareClient,
    hardwareCompany,
    networkPool,
    networkQueue,
    settingBanned,
    settingEmail,
    storeFraud,
    storeProduct,
    storeProductDomain,
    storeProductPrice
} from "@/api";

import createLogger from "vuex/dist/logger";
import createPersistedState from "vuex-persistedstate";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
    sidebarShow: 'responsive',
    sidebarMinimize: false
};

const mutations = {
    toggleSidebarDesktop(state) {
        const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow);
        state.sidebarShow = sidebarOpened ? false : 'responsive';
    },
    toggleSidebarMobile(state) {
        const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow);
        state.sidebarShow = sidebarClosed ? true : 'responsive';
    },
    set(state, [variable, value]) {
        state[variable] = value;
    }
};

const persist = createPersistedState({
    paths: ['auth']
});

export default new Vuex.Store({
    state,
    mutations,
    plugins: debug ? [createLogger(), persist] : [persist],
    modules: {
        auth,
        billingPayment,
        billingReason,
        companyCompany,
        companyDns,
        companyDomain,
        companyMail,
        employeeAccount,
        employeeManage,
        hardwareClient,
        hardwareCompany,
        networkPool,
        networkQueue,
        settingBanned,
        settingEmail,
        storeFraud,
        storeProduct,
        storeProductDomain,
        storeProductPrice
    }
})