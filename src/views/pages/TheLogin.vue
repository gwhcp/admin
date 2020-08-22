<template>
    <div class="c-app flex-row align-items-center">
        <CContainer>
            <CRow class="justify-content-center">
                <CCol md="6">
                    <CCard class="p-4">
                        <CCardBody>
                            <ValidationObserver ref="observer"
                                                v-slot="{ handleSubmit, invalid }">
                                <CForm>
                                    <h1>Login</h1>

                                    <p class="text-muted">Sign In to your account</p>

                                    <CAlert :show="5"
                                            closeButton
                                            color="warning"
                                            v-if="nonFieldFormError">
                                        {{ nonFieldFormMessage }}
                                    </CAlert>

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
                                                     @click="handleSubmit(submitLogin)"
                                                     class="px-4"
                                                     color="primary">Login
                                            </CButton>
                                        </CCol>

                                        <CCol class="text-right"
                                              col="6">
                                            <CButton class="px-0"
                                                     color="link">Forgot password?
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </ValidationObserver>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<script>
import {InputPassword, InputText} from "@/components/form";
import {mapActions, mapGetters, mapState} from "vuex";
import {ValidationObserver} from "vee-validate/dist/vee-validate.full.esm";

export default {
    name: 'TheLogin',
    components: {
        InputPassword,
        InputText,
        ValidationObserver
    },
    computed: {
        ...mapGetters('auth', [
            'formErrors',
            'nonFieldFormError',
            'nonFieldFormMessage'
        ]),
        ...mapState('auth', [
            'formObj'
        ])
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('auth', [
            'formClean',
            'login'
        ]),
        submitLogin() {
            this.login()
                .then(() => this.$router.push({
                    name: 'dashboard'
                }))
                .catch(() => this.$refs.observer.setErrors(this.formErrors));

            scroll(0, 0);
        }
    }
}
</script>
