<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
            IP Address pool has been updated.
        </CAlert>

        <CCard bodyWrapper>
            <static-data :value="formObj.id"
                         name="IP Address Setup ID"/>

            <static-data :datetime="formObj.date_from"
                         name="Created Date"/>

            <static-data :value="formObj.ip_type"
                         name="IP Address Type"/>

            <static-data :value="formObj.network"
                         name="Network IP Address"/>

            <static-data :value="formObj.subnet"
                         name="Subnet"/>

            <static-data :value="formObj.netmask"
                         name="Netmask"
                         v-if="formObj.ip_type === 4"/>

            <static-data :value="formObj.broadcast"
                         name="Broadcast"
                         v-if="formObj.ip_type === 4"/>

            <static-data :value="formObj.ip_total"
                         name="Total IP Addresses"/>

            <static-data :value="formObj.ip_available"
                         name="Available"/>

            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <input-text label="Name"
                                name="name"
                                required="true"
                                rules="required"
                                v-model="formObj.name"/>

                    <input-select :options="choices"
                                  :selected="formObj.assigned"
                                  label="Assigned"
                                  name="assigned"
                                  required="true"
                                  rules="required"
                                  v-model="formObj.assigned"/>

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
import {InputSelect, InputSwitch, InputText} from "@/components/form";
import Loading from "@/mixins/Loading";
import Permission from "@/mixins/Permission";
import StaticData from "@/components/StaticData";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

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
        Loading,
        Permission
    ],
    data() {
        return {
            setupId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('networkPool', [
            'choices',
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('networkPool', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile({
            id: this.setupId
        });
    },
    mounted() {
        this.hasPermForm('network.pool.change_ipaddresssetup');
    },
    methods: {
        ...mapActions('networkPool', [
            'getProfile',
            'updateProfile'
        ]),
        async submitUpdate() {
            this.loadingState = true;

            await this.updateProfile({
                id: this.setupId
            });

            if (!this.formSuccess) {
                this.$refs.observer.setErrors(this.formErrors);
            }

            scroll(0, 0);

            this.loadingState = false;
        }
    }
};
</script>
