<template>
    <div>
        <CAlert :show.sync="successMessage"
                closeButton
                color="success">
            Account password has been updated.
        </CAlert>

        <CCard bodyWrapper>
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <input-password label="Old Password"
                                    name="old_password"
                                    required="true"
                                    rules="required"
                                    v-model="formData.old_password"/>

                    <input-password label="Password"
                                    name="password"
                                    required="true"
                                    rules="required"
                                    v-model="formData.password"/>

                    <input-password label="Confirm Password"
                                    name="confirmed_password"
                                    required="true"
                                    rules="required"
                                    v-model="formData.confirmed_password"/>

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
import InputPassword from "@/components/form/InputPassword";
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'ThePassword',
    components: {
        InputPassword,
        ValidationObserver
    },
    data() {
        return {
            successMessage: 0
        };
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
            'formClean',
            'updatePassword'
        ]),
        submitUpdate() {
            this.updatePassword()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.successMessage = this.formSuccess);

            scroll(0, 0);
        }
    }
}
</script>
