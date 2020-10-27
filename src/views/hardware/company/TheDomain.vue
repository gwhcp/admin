<template>
    <div>
        <CAlert v-if="formSuccess"
                :show="5"
                closeButton
                color="success">
            Authorized domains has been updated.
        </CAlert>

        <CAlert v-if="nonFieldFormError"
                :show="5"
                closeButton
                color="warning">
            {{ nonFieldFormMessage }}
        </CAlert>

        <CTabs :active-tab="1"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{ name: 'hardware:company:profile', params: { id: serverId } }"
                  title="Profile"/>

            <CTab title="Domains">
                <CCard bodyWrapper>
                    <CForm>
                        <vue-select-sides
                            id="allowed"
                            v-model="selectedDomain"
                            :list="domainBase"
                            name="allowed"
                            type="mirror"/>

                        <CRow class="mt-3">
                            <CCol class="text-left"
                                  col="6">
                                <CButton class="px-4"
                                         color="primary"
                                         @click="submitUpdate">
                                    Update
                                </CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCard>
            </CTab>
        </CTabs>
    </div>
</template>

<script>
import Loading from "@/mixins/Loading";
import Permission from "@/mixins/Permission";
import Vue from "vue";
import vueSelectSides from "vue-select-sides";
import {mapActions, mapGetters, mapState} from "vuex";

Vue.use(vueSelectSides, {
    locale: "en_US"
});

export default {
    name: 'TheDomain',
    components: {
        vueSelectSides
    },
    mixins: [
        Loading,
        Permission
    ],
    data() {
        return {
            selected: [],
            serverId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('hardwareCompany', [
            'domainAllowed',
            'domainBase',
            'formErrors',
            'formSuccess',
            'nonFieldFormError',
            'nonFieldFormMessage'
        ]),
        ...mapState('hardwareCompany', [
            'formObj'
        ]),
        selectedDomain: {
            get: function () {
                return this.domainAllowed;
            },
            set: function (newValue) {
                this.selected = newValue;
            }
        }
    },
    async created() {
        await this.getDomain({
            id: this.serverId
        });
    },
    mounted() {
        this.hasPermForm('hardware.company.change_server');
    },
    methods: {
        ...mapActions('hardwareCompany', [
            'getDomain',
            'updateDomain'
        ]),
        async submitUpdate() {
            this.loadingState = true;

            await this.updateDomain({
                id: this.serverId,
                allowed: this.selected
            });

            scroll(0, 0);

            this.loadingState = false;
        }
    }
};
</script>

<style lang="scss">
@import "/node_modules/vue-select-sides/styles/themes/soft.scss";
</style>