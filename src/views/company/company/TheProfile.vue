<template>
    <div>
        <CAlert :show.sync="successMessage"
                closeButton
                color="success">
            Company profile has been updated.
        </CAlert>

        <CCard bodyWrapper>
            <static-data :value="formData.id"
                         name="Company ID"/>

            <static-data :datetime="formData.date_from"
                         name="Created Date"/>

            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <input-text label="Name"
                                name="name"
                                required="true"
                                rules="required"
                                v-model="formData.name"/>

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
import {InputSelectCountry, InputSelectState, InputText} from "@/components/form";
import Permission from "@/mixins/Permission";
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

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
        Permission
    ],
    data() {
        return {
            companyId: this.$route.params.id,
            successMessage: 0
        };
    },
    computed: {
        ...mapState('companyCompany', [
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    created() {
        this.getProfile({
            id: this.companyId
        });
    },
    mounted() {
        this.hasPermForm('company.company.change_company');
    },
    methods: {
        ...mapActions('companyCompany', [
            'getProfile',
            'updateProfile'
        ]),
        submitUpdate() {
            this.updateProfile({
                id: this.companyId
            })
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.successMessage = this.formSuccess);

            scroll(0, 0);
        }
    }
}
</script>
