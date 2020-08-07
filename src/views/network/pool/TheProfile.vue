<template>
    <div>
        <CAlert :show.sync="successMessage"
                closeButton
                color="success">
            IP Address pool has been updated.
        </CAlert>

        <CCard bodyWrapper>
            <static-data :value="formData.id"
                         name="IP Address Setup ID"/>

            <static-data :datetime="formData.date_from"
                         name="Created Date"/>

            <static-data :value="formData.ip_type"
                         name="IP Address Type"/>

            <static-data :value="formData.network"
                         name="Network IP Address"/>

            <static-data :value="formData.subnet"
                         name="Subnet"/>

            <static-data :value="formData.netmask"
                         name="Netmask"
                         v-if="formData.ip_type === 4"/>

            <static-data :value="formData.broadcast"
                         name="Broadcast"
                         v-if="formData.ip_type === 4"/>

            <static-data :value="formData.ip_total"
                         name="Total IP Addresses"/>

            <static-data :value="formData.ip_available"
                         name="Available"/>

            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <input-text label="Name"
                                name="name"
                                required="true"
                                rules="required"
                                v-model="formData.name"/>

                    <input-select :options="choiceAssigned"
                                  :selected="formData.assigned"
                                  label="Assigned"
                                  name="assigned"
                                  required="true"
                                  rules="required"
                                  v-model="formData.assigned"/>

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
    </div>
</template>

<script>
import StaticData from "@/components/StaticData";
import {InputSelect, InputSwitch, InputText} from "@/components/form";
import Permission from "@/mixins/Permission";
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheProfile',
    components: {
        InputSelect,
        InputSwitch,
        InputText,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Permission
    ],
    data() {
        return {
            setupId: this.$route.params.id,
            successMessage: 0
        };
    },
    computed: {
        ...mapState('networkPool', [
            'choiceAssigned',
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    created() {
        this.getChoiceAssigned();

        this.getProfile({
            id: this.setupId
        });
    },
    mounted() {
        this.hasPermForm('network.pool.change_ipaddresssetup');
    },
    methods: {
        ...mapActions('networkPool', [
            'getChoiceAssigned',
            'getProfile',
            'updateProfile'
        ]),
        submitUpdate() {
            this.updateProfile({
                id: this.setupId
            })
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.successMessage = this.formSuccess);

            scroll(0, 0);
        }
    }
}
</script>
