<template>
    <div>
        <CAlert :show.sync="successMessage"
                closeButton
                color="success">
            DNS profile have been updated.
        </CAlert>

        <CTabs :active-tab="0"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab title="Profile">
                <CCard bodyWrapper>
                    <static-data :value="formData.id"
                                 name="Domain ID"/>

                    <static-data :ahref="{name: 'company:company:profile', params:{id: formData.company}}"
                                 :value="formData.company_name"
                                 name="Company"
                                 permission="company.company.view_company"/>

                    <static-data :value="formData.name"
                                 name="Domain"/>

                    <ValidationObserver ref="observer"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
                            <input-switch :checked="formData.manage_dns"
                                          label="Managed DNS"
                                          name="manage_dns"
                                          v-model="formData.manage_dns"/>

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
import {mapActions, mapState} from "vuex";

export default {
    name: 'TheProfile',
    components: {
        InputSwitch,
        StaticData,
        ValidationObserver
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
            'formSuccess'
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
            this.updateProfile({
                id: this.domainId
            })
                .then(() => this.successMessage = this.formSuccess);
        }
    }
}
</script>
