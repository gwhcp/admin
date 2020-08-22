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
                                    v-model="formObj.name"/>

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
import {mapActions, mapGetters, mapState} from "vuex";
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
        ...mapGetters('companyCompany', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('companyCompany', [
            'formObj'
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
                .then(() => this.formSuccess ? this.$router.push({
                    name: 'company:company:search'
                }) : false);
        }
    }
}
</script>
