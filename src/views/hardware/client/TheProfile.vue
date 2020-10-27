<template>
    <div>
        <CAlert v-if="formSuccess"
                :show="5"
                closeButton
                color="success">
            Hardware profile has been updated.
        </CAlert>

        <modal-success msg="Hardware has been scheduled for installation."/>

        <modal-warning msg="Hardware installation failed."/>

        <CWidgetSimple v-if="!formObj.is_installed && !formObj.in_queue && installSuccess === false">
            <div class="mb-3">Hardware is not installed.</div>

            <modal-open-install :install="installHardware"
                                :params="{ id: formObj.id }"
                                msg="Continuing will install this hardware."/>
        </CWidgetSimple>

        <CRow>
            <CCol sm="6">
                <CCard bodyWrapper>
                    <static-data :value="formObj.id"
                                 name="Server ID"/>

                    <static-data :datetime="formObj.date_from"
                                 name="Created Date"/>

                    <static-data :ahref="{ name: 'company:company:profile', params: { id: formObj.company } }"
                                 :value="formObj.company_name"
                                 name="Company"
                                 permission="company.company.view_company"/>

                    <static-data :value="formObj.hardware_type_name"
                                 name="Hardware"/>

                    <static-data :value="formObj.domain_name"
                                 name="Domain"/>

                    <static-data :value="formObj.ipaddress"
                                 name="IP Address"/>

                    <ValidationObserver v-if="formObj.is_installed && !formObj.in_queue"
                                        ref="observer"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
                            <input-switch v-model="formObj.is_active"
                                          :checked="formObj.is_active"
                                          label="Status"
                                          name="is_active"/>

                            <CRow>
                                <CCol class="text-left"
                                      col="6">
                                    <CButton :disabled="invalid"
                                             class="px-4"
                                             color="primary"
                                             @click="handleSubmit(submitUpdate)">Update
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

                        <span :class="getColor(formObj.is_domain)">
                            {{ formObj.is_domain ? 'Yes' : 'No' }}
                        </span>

                        <span v-if="formObj.is_domain">( {{ formObj.web_type_name }} )</span>
                    </div>

                    <div class="mb-2">
                        <h6 class="font-weight-bold">Mail</h6>

                        <span :class="getColor(formObj.is_mail)">
                            {{ formObj.is_mail ? 'Yes' : 'No' }}
                        </span>
                    </div>

                    <div class="mb-2">
                        <h6 class="font-weight-bold">MySQL</h6>

                        <span :class="getColor(formObj.is_mysql)">
                            {{ formObj.is_mysql ? 'Yes' : 'No' }}
                        </span>
                    </div>

                    <div class="mb-2">
                        <h6 class="font-weight-bold">PostgreSQL</h6>

                        <span :class="getColor(formObj.is_postgresql)">
                            {{ formObj.is_postgresql ? 'Yes' : 'No' }}
                        </span>
                    </div>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>

<script>
import InputSwitch from "@/components/form/InputSwitch";
import Loading from "@/mixins/Loading";
import {ModalOpenInstall, ModalSuccess, ModalWarning} from "@/components/modal";
import Permission from "@/mixins/Permission";
import StaticData from "@/components/StaticData";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

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
        Loading,
        Permission
    ],
    data() {
        return {
            serverId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('hardwareClient', [
            'formSuccess',
            'installSuccess'
        ]),
        ...mapState('hardwareClient', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile({
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
        async submitUpdate() {
            this.loadingState = true;

            await this.updateProfile({
                id: this.serverId
            });

            scroll(0, 0);

            this.loadingState = false;
        }
    }
};
</script>
