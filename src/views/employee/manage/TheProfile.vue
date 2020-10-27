<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
            Account profile has been updated.
        </CAlert>

        <CTabs :active-tab="0"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab title="Profile">
                <CCard bodyWrapper>
                    <static-data :value="formObj.id"
                                 name="Account ID"/>

                    <static-data :datetime="formObj.date_from"
                                 name="Created Date"/>

                    <ValidationObserver ref="observer"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
                            <input-text label="First Name"
                                        name="first_name"
                                        required="true"
                                        rules="required"
                                        v-model="formObj.first_name"/>

                            <input-text label="Last Name"
                                        name="last_name"
                                        required="true"
                                        rules="required"
                                        v-model="formObj.last_name"/>

                            <input-text label="Address"
                                        name="address"
                                        required="true"
                                        rules="required"
                                        v-model="formObj.address"/>

                            <input-text label="City"
                                        name="city"
                                        required="true"
                                        rules="required"
                                        v-model="formObj.city"/>

                            <input-select-country label="Country"
                                                  name="country"
                                                  required="true"
                                                  rules="required"
                                                  v-model="formObj.country"/>

                            <input-select-state :country="formObj.country"
                                                label="State"
                                                name="state"
                                                required="true"
                                                rules="required"
                                                v-model="formObj.state"/>

                            <input-text label="Zipcode"
                                        name="zipcode"
                                        required="true"
                                        rules="required"
                                        v-model="formObj.zipcode"/>

                            <input-text label="Primary Phone"
                                        name="primary_phone"
                                        required="true"
                                        rules="required"
                                        v-model="formObj.primary_phone"/>

                            <input-text label="Secondary Phone"
                                        name="secondary_phone"
                                        v-model="formObj.secondary_phone"/>

                            <input-text label="Email Address"
                                        name="email"
                                        required="true"
                                        rules="required"
                                        v-model="formObj.email"/>

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

            <CTab :to="{ name: 'employee:manage:permission', params: { id: accountId } }"
                  title="Permissions"
                  v-if="this.hasPerm('auth.view_permission')"/>

            <CTab :to="{ name: 'employee:manage:accesslog', params: { id: accountId } }"
                  title="Access Logs"/>
        </CTabs>
    </div>
</template>

<script>
import {InputSelectCountry, InputSelectState, InputText} from "@/components/form";
import Loading from "@/mixins/Loading";
import Permission from "@/mixins/Permission";
import StaticData from "@/components/StaticData";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TheProfile',
    components: {
        InputSelectCountry,
        InputSelectState,
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
            accountId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('employeeManage', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('employeeManage', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile({
            id: this.accountId
        });
    },
    mounted() {
        this.hasPermForm('employee.manage.change_account');
    },
    methods: {
        ...mapActions('employeeManage', [
            'getProfile',
            'updateProfile'
        ]),
        async submitUpdate() {
            this.loadingState = true;

            await this.updateProfile({
                id: this.accountId
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