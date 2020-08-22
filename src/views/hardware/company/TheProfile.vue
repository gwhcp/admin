<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
            Hardware profile has been updated.
        </CAlert>

        <modal-success msg="Hardware has been scheduled for installation."/>

        <modal-warning msg="Hardware installation failed."/>

        <CWidgetSimple v-if="!formObj.is_installed && !formObj.in_queue && installSuccess === 0">
            <div class="mb-3">Hardware is not installed.</div>

            <modal-open-install :install="installHardware"
                                :params="{id: formObj.id}"
                                msg="Continuing will install this hardware."/>
        </CWidgetSimple>

        <CCard bodyWrapper>
            <static-data :value="formObj.id"
                         name="Server ID"/>

            <static-data :datetime="formObj.date_from"
                         name="Created Date"/>

            <static-data :ahref="{name: 'company:company:profile', params:{id: formObj.company}}"
                         :value="formObj.company_name"
                         name="Company"
                         permission="company.company.view_company"/>

            <static-data :value="formObj.hardware_type_name"
                         name="Hardware"/>

            <static-data :value="formObj.domain_name"
                         name="Domain"/>

            <static-data :value="formObj.ipaddress"
                         name="IP Address"/>

            <ValidationObserver ref="observer"
                                v-if="formObj.is_installed && !formObj.in_queue"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <input-switch :checked="formObj.is_active"
                                  label="Status"
                                  name="is_active"
                                  v-model="formObj.is_active"/>

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
    </div>
</template>

<script>
import StaticData from "@/components/StaticData";
import InputSwitch from "@/components/form/InputSwitch";
import {ModalOpenInstall, ModalSuccess, ModalWarning} from "@/components/modal";
import Permission from "@/mixins/Permission";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";
import Loading from "@/mixins/Loading";

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
        ...mapGetters('hardwareCompany', [
            'formSuccess',
            'installSuccess'
        ]),
        ...mapState('hardwareCompany', [
            'formObj'
        ])
    },
    created() {
        this.getProfile({
            id: this.serverId
        });
    },
    mounted() {
        this.hasPermForm('hardware.company.change_server');
    },
    methods: {
        ...mapActions('hardwareCompany', [
            'getProfile',
            'installHardware',
            'updateProfile'
        ]),
        submitUpdate() {
            this.loadingState = true;

            this.updateProfile({
                id: this.serverId
            });

            scroll(0, 0);
        }
    }
}
</script>
