<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'company:company:search'}"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
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
                                         @click="handleSubmit(submitCreate)"
                                         class="px-4"
                                         color="primary">Create
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCard>
                </CForm>
            </ValidationObserver>
        </CTab>
    </CTabs>
</template>

<script>
import {InputSelectCountry, InputSelectState, InputText} from "@/components/form";
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheCreate',
    components: {
        InputSelectState,
        InputSelectCountry,
        InputText,
        ValidationObserver
    },
    computed: {
        ...mapState('companyCompany', [
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('companyCompany', [
            'createCompany',
            'formClean'
        ]),
        submitCreate() {
            this.createCompany()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess > 0 ? this.$router.push({name: 'company:company:search'}) : false);
        }
    }
}
</script>
