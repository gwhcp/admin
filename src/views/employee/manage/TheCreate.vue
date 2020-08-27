<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'employee:manage:search'}"
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
                            </CCard>
                        </CCol>

                        <CCol sm="6">
                            <CCard bodyWrapper>
                                <input-text label="Email Address"
                                            name="email"
                                            required="true"
                                            rules="required"
                                            v-model="formObj.email"/>

                                <input-password label="Password"
                                                name="password"
                                                required="true"
                                                rules="required"
                                                v-model="formObj.password"/>

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
import {mapActions, mapGetters, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheCreate',
    components: {
        InputPassword,
        InputSelectCountry,
        InputSelectState,
        InputText,
        ValidationObserver
    },
    mixins: [
        Loading
    ],
    computed: {
        ...mapGetters('employeeManage', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('employeeManage', [
            'formObj'
        ])
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('employeeManage', [
            'createAccount',
            'formClean'
        ]),
        async submitCreate() {
            this.loadingState = true;

            await this.createAccount();

            if (this.formSuccess) {
                await this.$router.push({
                    name: 'employee:manage:search'
                })
            } else {
                this.$refs.observer.setErrors(this.formErrors);

                scroll(0, 0);

                this.loadingState = false;
            }
        }
    }
};
</script>
