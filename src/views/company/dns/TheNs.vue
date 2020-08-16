<template>
    <div>
        <CAlert :show.sync="successMessage"
                closeButton
                color="success">
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
import {mapActions, mapState} from "vuex";
import vueSelectSides from "vue-select-sides";
import Vue from "vue";

Vue.use(vueSelectSides, {
    locale: "en_US"
});

export default {
    name: 'TheNs',
    components: {
        vueSelectSides
    },
    mixins: [
        Permission
    ],
    data() {
        return {
            domainId: this.$route.params.id,
            successMessage: 0
        };
    },
    computed: {
        ...mapState('companyDns', [
            'formData',
            'formErrors',
            'formSuccess',
            'nameserverBase',
            'nameserverDomain'
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
            this.updateNameserver({
                id: this.domainId,
                ns: this.selected
            })
                .then(() => this.successMessage = this.formSuccess);

            scroll(0, 0);
        }
    }
}
</script>

<style lang="scss">
@import "/node_modules/vue-select-sides/styles/themes/soft.scss";
</style>