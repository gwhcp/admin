<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'account:account:search'}"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CRow>
                        <CCol sm="6">
                            <CCard bodyWrapper>
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
                            </CCard>
                        </CCol>

                        <CCol sm="6">
                            <CCard bodyWrapper>
                                <input-text label="Email Address"
                                            name="email"
                                            required="true"
                                            rules="required"
                                            v-model="formData.email"/>

                                <input-password label="Password"
                                                name="password"
                                                required="true"
                                                rules="required"
                                                v-model="formData.password"/>

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
                        </CCol>
                    </CRow>
                </CForm>
            </ValidationObserver>
        </CTab>
    </CTabs>
</template>

<script>
import {InputPassword, InputSelectCountry, InputSelectState, InputText} from "@/components/form";
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheCreate',
    components: {
        InputPassword,
        InputSelectCountry,
        InputSelectState,
        InputText,
        ValidationObserver
    },
    computed: {
        ...mapState('accountLogin', [
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('accountLogin', [
            'createAccount',
            'formClean'
        ]),
        submitCreate() {
            this.formData['is_staff'] = true;

            this.createAccount()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess > 0 ? this.$router.push({name: 'account:account:search'}) : false);
        }
    }
}
</script>
