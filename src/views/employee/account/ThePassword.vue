<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
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
                                    v-model="formObj.old_password"/>

                    <input-password label="Password"
                                    name="password"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.password"/>

                    <input-password label="Confirm Password"
                                    name="confirmed_password"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.confirmed_password"/>

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
import Loading from "@/mixins/Loading";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'ThePassword',
    components: {
        InputPassword,
        ValidationObserver
    },
    mixins: [
        Loading
    ],
    computed: {
        ...mapGetters('employeeAccount', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('employeeAccount', [
            'formObj'
        ])
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('employeeAccount', [
            'formClean',
            'updatePassword'
        ]),
        async submitUpdate() {
            this.loadingState = true;

            await this.updatePassword();

            if (!this.formSuccess) {
                this.$refs.observer.setErrors(this.formErrors);
            }

            scroll(0, 0);

            this.loadingState = false;
        }
    }
};
</script>
