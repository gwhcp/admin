<template>
    <div>
        <CAlert :show.sync="messageSuccess"
                closeButton
                color="success">
            Account profile has been updated.
        </CAlert>

        <ValidationObserver
            ref="observer"
            v-slot="{ handleSubmit, invalid }">
            <CForm>
                <CRow>
                    <CCol sm="6">
                        <CCard bodyWrapper>
                            <static-data :value="formData.id"
                                         name="Account ID"/>

                            <static-data :datetime="formData.date_from"
                                         name="Created Date"/>

                            <input-text label="First Name"
                                        name="first_name"
                                        required="true"
                                        rules="required"
                                        v-model="formData.first_name"/>

                            <input-text label="Last Name"
                                        name="last_name"
                                        required="true"
                                        rules="required"
                                        v-model="formData.last_name"/>

                            <input-text label="Address"
                                        name="address"
                                        required="true"
                                        rules="required"
                                        v-model="formData.address"/>

                            <input-text label="City"
                                        name="city"
                                        required="true"
                                        rules="required"
                                        v-model="formData.city"/>

                            <input-select-country label="Country"
                                                  name="country"
                                                  required="true"
                                                  rules="required"
                                                  v-model="formData.country"/>

                            <input-select-state :country="formData.country"
                                                label="State"
                                                name="state"
                                                required="true"
                                                rules="required"
                                                v-model="formData.state"/>

                            <input-text label="Zipcode"
                                        name="zipcode"
                                        required="true"
                                        rules="required"
                                        v-model="formData.zipcode"/>

                            <input-text label="Primary Phone"
                                        name="primary_phone"
                                        required="true"
                                        rules="required"
                                        v-model="formData.primary_phone"/>

                            <input-text label="Secondary Phone"
                                        name="secondary_phone"
                                        v-model="formData.secondary_phone"/>

                            <input-text label="Email Address"
                                        name="email"
                                        required="true"
                                        rules="required"
                                        v-model="formData.email"/>
                        </CCard>
                    </CCol>

                    <CCol sm="6">
                        <CCard bodyWrapper>
                            <input-select :options="choiceCommentOrder"
                                          :selected="formData.comment_order"
                                          label="Comment Order"
                                          name="comment_order"
                                          v-model="formData.comment_order"/>

                            <input-select :options="choiceTimeFormat"
                                          :selected="formData.time_format"
                                          label="Time Format"
                                          name="time_format"
                                          v-model="formData.time_format"/>

                            <input-select :options="choiceTimeZone"
                                          :selected="formData.time_zone"
                                          label="Time Zone"
                                          name="time_zone"
                                          v-model="formData.time_zone"/>

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
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

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
        Permission
    ],
    data() {
        return {
            messageSuccess: 0
        };
    },
    computed: {
        ...mapState('accountAccount', [
            'choiceCommentOrder',
            'choiceTimeFormat',
            'choiceTimeZone',
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    created() {
        this.getChoiceCommentOrder();

        this.getChoiceTimeFormat();

        this.getChoiceTimeZone();

        this.getProfile();
    },
    mounted() {
        this.hasPermForm('account.account.change_account');
    },
    methods: {
        ...mapActions('accountAccount', [
            'getChoiceCommentOrder',
            'getChoiceTimeFormat',
            'getChoiceTimeZone',
            'getProfile',
            'updateProfile'
        ]),
        submitUpdate() {
            this.updateProfile()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.messageSuccess = this.formSuccess);

            scroll(0, 0);
        }
    }
}
</script>
