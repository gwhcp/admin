<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
            Nameservers have been updated.
        </CAlert>

        <CTabs :active-tab="2"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{name: 'company:dns:profile', params:{id: domainId}}"
                  title="Profile"/>

            <CTab :to="{name: 'company:dns:records', params:{id: domainId}}"
                  title="Records"/>

            <CTab title="Nameservers">
                <CCard bodyWrapper>
                    <CForm>
                        <vue-select-sides
                            :list="nameserverBase"
                            id="ns"
                            name="ns"
                            type="mirror"
                            v-model="selectedNameserver"/>

                        <CRow class="mt-3">
                            <CCol class="text-left"
                                  col="6">
                                <CButton @click="submitUpdate"
                                         class="px-4"
                                         color="primary">
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
import Permission from "@/mixins/Permission";
import {mapActions, mapGetters, mapState} from "vuex";
import vueSelectSides from "vue-select-sides";
import Vue from "vue";
import Loading from "@/mixins/Loading";

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
    created() {
        this.getNameserver({
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
        submitUpdate() {
            this.loadingState = true;

            this.updateNameserver({
                id: this.domainId,
                ns: this.selected
            });

            scroll(0, 0);
        }
    }
}
</script>

<style lang="scss">
@import "/node_modules/vue-select-sides/styles/themes/soft.scss";
</style>