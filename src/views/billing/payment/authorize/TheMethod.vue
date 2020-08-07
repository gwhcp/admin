<template>
    <div>
        <CAlert :show.sync="successMessage"
                closeButton
                color="success">
            Payment methods have been updated.
        </CAlert>

        <CAlert :show.sync="nonFieldFormErrors"
                closeButton
                color="warning">
            {{ nonFieldFormMessage }}
        </CAlert>

        <CTabs :active-tab="2"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{name: 'billing:payment:profile', params: {id: paymentId}}"
                  title="Profile"/>

            <CTab :to="{name: 'billing:payment:authorize:authentication', params: {id: paymentId}}"
                  title="Authentication"/>

            <CTab title="Payment Methods">
                <ValidationObserver ref="observer"
                                    v-slot="{ handleSubmit, invalid }">
                    <CForm>
                        <CCard bodyWrapper>
                            <input-switch :checked="formData.has_amex"
                                          label="American Express"
                                          name="has_amex"
                                          v-model="formData.has_amex"/>

                            <input-switch :checked="formData.has_diner"
                                          label="Diner Club"
                                          name="has_diner"
                                          v-model="formData.has_diner"/>

                            <input-switch :checked="formData.has_discover"
                                          label="Discover"
                                          name="has_discover"
                                          v-model="formData.has_discover"/>

                            <input-switch :checked="formData.has_jcb"
                                          label="JCB"
                                          name="has_jcb"
                                          v-model="formData.has_jcb"/>

                            <input-switch :checked="formData.has_mastercard"
                                          label="Mastercard"
                                          name="has_mastercard"
                                          v-model="formData.has_mastercard"/>

                            <input-switch :checked="formData.has_visa"
                                          label="Visa"
                                          name="has_visa"
                                          v-model="formData.has_visa"/>

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
        </CTabs>
    </div>
</template>

<script>
import InputSwitch from "@/components/form/InputSwitch";
import Permission from "@/mixins/Permission";
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheMethod',
    components: {
        InputSwitch,
        ValidationObserver
    },
    mixins: [
        Permission
    ],
    data() {
        return {
            nonFieldFormErrors: 0,
            paymentId: this.$route.params.id,
            successMessage: 0
        };
    },
    computed: {
        ...mapState('billingPayment', [
            'formData',
            'formErrors',
            'formSuccess',
            'nonFieldFormError',
            'nonFieldFormMessage'
        ])
    },
    created() {
        this.getMethod({
            id: this.paymentId,
            merchant: 'authorize'
        });
    },
    mounted() {
        this.hasPermForm('billing.payment.change_paymentgateway');
    },
    methods: {
        ...mapActions('billingPayment', [
            'getMethod',
            'updateMethod'
        ]),
        submitUpdate() {
            this.updateMethod({
                id: this.paymentId,
                merchant: 'authorize'
            })
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.nonFieldFormErrors = this.nonFieldFormError)
                .then(() => this.successMessage = this.formSuccess);

            scroll(0, 0);
        }
    }
}
</script>
