<template>
    <div>
        <CAlert :show.sync="successMessage"
                closeButton
                color="success">
            Hardware profile has been updated.
        </CAlert>

        <modal-success msg="Hardware has been scheduled for installation."/>

        <modal-warning msg="Hardware installation failed."/>

        <CWidgetSimple v-if="!formData.is_installed && !formData.in_queue && installSuccess === 0">
            <div class="mb-3">Hardware is not installed.</div>

            <modal-open-install :install="installHardware"
                                :params="{id: formData.id}"
                                msg="Continuing will install this hardware."/>
        </CWidgetSimple>

        <CRow>
            <CCol sm="6">
                <CCard bodyWrapper>
                    <static-data :value="formData.id"
                                 name="Server ID"/>

                    <static-data :datetime="formData.date_from"
                                 name="Created Date"/>

                    <static-data :ahref="{name: 'company:company:profile', params:{id: formData.company}}"
                                 :value="formData.company_name"
                                 name="Company"
                                 permission="company.company.view_company"/>

                    <static-data :value="formData.hardware_type_name"
                                 name="Hardware"/>

                    <static-data :value="formData.domain_name"
                                 name="Domain"/>

                    <static-data :value="formData.ipaddress"
                                 name="IP Address"/>

                    <ValidationObserver ref="observer"
                                        v-if="formData.is_installed && !formData.in_queue"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
                            <input-switch :checked="formData.is_active"
                                          label="Status"
                                          name="is_active"
                                          v-model="formData.is_active"/>

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
            </CCol>

            <CCol sm="6">
                <CCard bodyWrapper>
                    <div class="mb-2">
                        <h6 class="font-weight-bold">Domain</h6>

                        <span :class="getColor(formData.is_domain)">
                            {{ formData.is_domain ? 'Yes' : 'No' }}
                        </span>

                        <span v-if="formData.is_domain">( {{ formData.web_type_name }} )</span>
                    </div>

                    <div class="mb-2">
                        <h6 class="font-weight-bold">Mail</h6>

                        <span :class="getColor(formData.is_mail)">
                            {{ formData.is_mail ? 'Yes' : 'No' }}
                        </span>
                    </div>

                    <div class="mb-2">
                        <h6 class="font-weight-bold">MySQL</h6>

                        <span :class="getColor(formData.is_mysql)">
                            {{ formData.is_mysql ? 'Yes' : 'No' }}
                        </span>
                    </div>

                    <div class="mb-2">
                        <h6 class="font-weight-bold">PostgreSQL</h6>

                        <span :class="getColor(formData.is_postgresql)">
                            {{ formData.is_postgresql ? 'Yes' : 'No' }}
                        </span>
                    </div>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>

<script>
import StaticData from "@/components/StaticData";
import InputSwitch from "@/components/form/InputSwitch";
import {ModalOpenInstall, ModalSuccess, ModalWarning} from "@/components/modal";
import Permission from "@/mixins/Permission";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapState} from "vuex";

export default {
    name: 'TheProfile',
    components: {
        InputSwitch,
        ModalOpenInstall,
        ModalSuccess,
        ModalWarning,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Permission
    ],
    data() {
        return {
            serverId: this.$route.params.id,
            successMessage: 0
        };
    },
    computed: {
        ...mapState('hardwareClient', [
            'formData',
            'formSuccess',
            'installSuccess'
        ])
    },
    created() {
        this.getProfile({
            id: this.serverId
        });
    },
    mounted() {
        this.hasPermForm('hardware.client.change_server');
    },
    methods: {
        ...mapActions('hardwareClient', [
            'getProfile',
            'installHardware',
            'updateProfile'
        ]),
        getColor(value) {
            switch (value) {
                case true:
                    return 'text-success';
                case false:
                    return 'text-danger';
            }
        },
        submitUpdate() {
            this.updateProfile({
                id: this.serverId
            })
                .then(() => this.successMessage = this.formSuccess);
        }
    }
}
</script>
