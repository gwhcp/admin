import "core-js/stable";
import App from "@/App";
import CoreuiVue from "@coreui/vue";
import {dom, library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {iconsSet as icons} from "./assets/icons/icons.js";
import router from "@/router";
import store from "@/store";
import Vue from "vue";

// Font Awesome
Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(far, fas);
dom.watch();

Vue.config.performance = true;
Vue.config.productionTip = false;
Vue.use(CoreuiVue);

new Vue({
    el: '#app',
    router,
    store,
    icons,
    template: '<App/>',
    components: {
        App
    }
})
