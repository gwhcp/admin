<template>
    <div>
        <CAlert :show.sync="successMessage"
                closeButton
                color="success">
            Authentication has been updated.
        </CAlert>

        <CTabs :active-tab="1"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{name: 'billing:payment:profile', params: {id: paymentId}}"
                  title="Profile"/>

            <CTab title="Authentication">
                <ValidationObserver ref="observer"
                                    v-slot="{ handleSubmit, invalid }">
                    <CForm>
                        <CCard bodyWrapper>
                            <input-text label="Login ID"
                                        name="login_id"
                                        required="true"
                                        rules="required"
                                        v-model="formData.login_id"/>

                            <input-text label="Transaction Key"
                                        name="transaction_key"
                                        required="true"
                                        rules="required"
                                        v-model="formData.transaction_key"/>

                            <input-switch :checked="formData.in_test_mode"
                                          label="Test Mode"
                                          name="in_test_mode"
                                          v-model="formData.in_test_mode"/>

                            <input-switch :checked="formData.is_active"
                                          label="Status"
                                          name="is_active"
                                          v-model="formData.is_active"/>
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
                    </CForm>
                </ValidationObserver>
            </CTab>

            <CTab :to="{name: 'billing:payment:authorize:method', params: {id: paymentId}}"
                  title="Payment Methods"/>
        </CTabs>
    </div>
</template>

<script>
import {InputSwitch, InputText} from "@/components/form";
import Permission from "@/mixins/Permission";
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheAuthentication',
    components: {
        InputText,
        InputSwitch,
        ValidationObserver
    },
    mixins: [
        Permission
    ],
    data() {
        return {
            paymentId: this.$route.params.id,
            successMessage: 0
        };
    },
    computed: {
        ...mapState('billingPayment', [
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    created() {
        this.getAuthentication({
            id: this.paymentId,
            merchant: 'authorize'
        });
    },
    mounted() {
        this.hasPermForm('billing.payment.change_paymentgateway');
    },
    methods: {
        ...mapActions('billingPayment', [
            'getAuthentication',
            'updateAuthentication'
        ]),
        submitUpdate() {
            this.updateAuthentication({
                id: this.paymentId,
                merchant: 'authorize'
            })
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.successMessage = this.formSuccess);

            scroll(0, 0);
        }
    }
}
</script>
