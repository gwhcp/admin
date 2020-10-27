<template>
    <div>
        <CAlert v-if="formSuccess"
                :show="5"
                closeButton
                color="success">
            Password has been updated.
        </CAlert>

        <CTabs :active-tab="1"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{ name: 'company:mail:profile', params: { id: mailId } }"
                  title="Profile"/>

            <CTab title="Password">
                <CCard bodyWrapper>
                    <ValidationObserver ref="observer"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
                            <input-password v-model="formObj.password"
                                            label="Password"
                                            name="password"
                                            required="true"
                                            rules="required"/>

                            <input-password v-model="formObj.confirmed_password"
                                            label="Confirm Password"
                                            name="confirmed_password"
                                            required="true"
                                            rules="required"/>

                            <CRow>
                                <CCol class="text-left"
                                      col="6">
                                    <CButton :disabled="invalid"
                                             class="px-4"
                                             color="primary"
                                             @click="handleSubmit(submitUpdate)">Update
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CForm>
                    </ValidationObserver>
                </CCard>
            </CTab>
        </CTabs>
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
    data() {
        return {
            mailId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('companyMail', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('companyMail', [
            'formObj'
        ])
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('companyMail', [
            'formClean',
            'updatePassword'
        ]),
        async submitUpdate() {
            this.loadingState = true;

            await this.updatePassword({
                id: this.mailId
            });

            if (!this.formSuccess) {
                this.$refs.observer.setErrors(this.formErrors);
            }

            scroll(0, 0);

            this.loadingState = false;
        }
    }
};
</script>
