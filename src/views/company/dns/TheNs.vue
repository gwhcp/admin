<template>
    <div>
        <CAlert v-if="formSuccess"
                :show="5"
                closeButton
                color="success">
            Nameservers have been updated.
        </CAlert>

        <CTabs :active-tab="2"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{ name: 'company:dns:profile', params: { id: domainId } }"
                  title="Profile"/>

            <CTab :to="{ name: 'company:dns:records', params: { id: domainId } }"
                  title="Records"/>

            <CTab title="Nameservers">
                <CCard bodyWrapper>
                    <CForm>
                        <vue-select-sides
                            id="ns"
                            v-model="selectedNameserver"
                            :list="nameserverBase"
                            name="ns"
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
    name: 'TheNs',
    components: {
        vueSelectSides
    },
    mixins: [
        Loading,
        Permission
    ],
    data() {
        return {
            domainId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('companyDns', [
            'formErrors',
            'formSuccess',
            'nameserverBase',
            'nameserverDomain'
        ]),
        ...mapState('companyDns', [
            'formObj'
        ]),
        selectedNameserver: {
            get: function () {
                return this.nameserverDomain;
            },
            set: function (newValue) {
                this.selected = newValue;
            }
        }
    },
    async created() {
        await this.getNameserver({
            id: this.domainId
        });
    },
    mounted() {
        this.hasPermForm('company.dns.change_dnszone');
    },
    methods: {
        ...mapActions('companyDns', [
            'getNameserver',
            'updateNameserver'
        ]),
        async submitUpdate() {
            this.loadingState = true;

            await this.updateNameserver({
                id: this.domainId,
                ns: this.selected
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