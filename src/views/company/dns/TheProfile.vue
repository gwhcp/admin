<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
            DNS profile have been updated.
        </CAlert>

        <CTabs :active-tab="0"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab title="Profile">
                <CCard bodyWrapper>
                    <static-data :value="formObj.id"
                                 name="Domain ID"/>

                    <static-data :ahref="{name: 'company:company:profile', params:{id: formObj.company}}"
                                 :value="formObj.company_name"
                                 name="Company"
                                 permission="company.company.view_company"/>

                    <static-data :value="formObj.name"
                                 name="Domain"/>

                    <ValidationObserver ref="observer"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
                            <input-switch :checked="formObj.manage_dns"
                                          label="Managed DNS"
                                          name="manage_dns"
                                          v-model="formObj.manage_dns"/>

                            <CRow>
                                <CCol class="text-left"
                                      col="6">
                                    <CButton :disabled="invalid"
                                             @click="handleSubmit(submitUpdate)"
                                             class="px-4"
                                             color="primary">Update
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CForm>
                    </ValidationObserver>
                </CCard>
            </CTab>

            <CTab :to="{name: 'company:dns:records', params:{id: domainId}}"
                  title="Records"/>

            <CTab :to="{name: 'company:dns:ns', params:{id: domainId}}"
                  title="Nameserver"/>
        </CTabs>
    </div>
</template>

<script>
import StaticData from "@/components/StaticData";
import InputSwitch from "@/components/form/InputSwitch";
import Permission from "@/mixins/Permission";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheProfile',
    components: {
        InputSwitch,
        StaticData,
        ValidationObserver
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
            'formSuccess'
        ]),
        ...mapState('companyDns', [
            'formObj'
        ])
    },
    created() {
        this.getProfile({
            id: this.domainId
        });
    },
    mounted() {
        this.hasPermForm('company.dns.change_dnszone');
    },
    methods: {
        ...mapActions('companyDns', [
            'getProfile',
            'updateProfile'
        ]),
        submitUpdate() {
            this.loadingState = true;

            this.updateProfile({
                id: this.domainId
            });
        }
    }
}
</script>
