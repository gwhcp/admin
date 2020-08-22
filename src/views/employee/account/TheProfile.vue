<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
            Account profile has been updated.
        </CAlert>

        <ValidationObserver
            ref="observer"
            v-slot="{ handleSubmit, invalid }">
            <CForm>
                <CRow>
                    <CCol sm="6">
                        <CCard bodyWrapper>
                            <static-data :value="formObj.id"
                                         name="Account ID"/>

                            <static-data :datetime="formObj.date_from"
                                         name="Created Date"/>

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
                        </CCard>
                    </CCol>

                    <CCol sm="6">
                        <CCard bodyWrapper>
                            <input-select :options="choices.comment"
                                          :selected="formObj.comment_order"
                                          label="Comment Order"
                                          name="comment_order"
                                          v-model="formObj.comment_order"/>

                            <input-select :options="choices.timeformat"
                                          :selected="formObj.time_format"
                                          label="Time Format"
                                          name="time_format"
                                          v-model="formObj.time_format"/>

                            <input-select :options="choices.timezone"
                                          :selected="formObj.time_zone"
                                          label="Time Zone"
                                          name="time_zone"
                                          v-model="formObj.time_zone"/>

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
                        </CCard>
                    </CCol>
                </CRow>
            </CForm>
        </ValidationObserver>
    </div>
</template>

<script>
import {InputSelect, InputSelectCountry, InputSelectState, InputText} from "@/components/form";
import Permission from "@/mixins/Permission";
import StaticData from "@/components/StaticData";
import {mapActions, mapGetters, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheProfile',
    components: {
        InputText,
        InputSelect,
        InputSelectCountry,
        InputSelectState,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Loading,
        Permission
    ],
    computed: {
        ...mapGetters('employeeAccount', [
            'choices',
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('employeeAccount', [
            'formObj'
        ])
    },
    created() {
        this.getChoices();

        this.getProfile();
    },
    mounted() {
        this.hasPermForm('employee.account.change_account');
    },
    methods: {
        ...mapActions('employeeAccount', [
            'getChoices',
            'getProfile',
            'updateProfile'
        ]),
        submitUpdate() {
            this.loadingState = true;

            this.updateProfile()
                .then(() => this.$refs.observer.setErrors(this.formErrors));

            scroll(0, 0);
        }
    }
}
</script>
