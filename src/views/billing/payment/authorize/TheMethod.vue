<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
            Payment methods have been updated.
        </CAlert>

        <CAlert :show="5"
                closeButton
                color="warning"
                v-if="nonFieldFormError">
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
                            <input-switch :checked="formObj.has_amex"
                                          label="American Express"
                                          name="has_amex"
                                          v-model="formObj.has_amex"/>

                            <input-switch :checked="formObj.has_diner"
                                          label="Diner Club"
                                          name="has_diner"
                                          v-model="formObj.has_diner"/>

                            <input-switch :checked="formObj.has_discover"
                                          label="Discover"
                                          name="has_discover"
                                          v-model="formObj.has_discover"/>

                            <input-switch :checked="formObj.has_jcb"
                                          label="JCB"
                                          name="has_jcb"
                                          v-model="formObj.has_jcb"/>

                            <input-switch :checked="formObj.has_mastercard"
                                          label="Mastercard"
                                          name="has_mastercard"
                                          v-model="formObj.has_mastercard"/>

                            <input-switch :checked="formObj.has_visa"
                                          label="Visa"
                                          name="has_visa"
                                          v-model="formObj.has_visa"/>

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
import {mapActions, mapGetters, mapState} from "vuex";
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
            paymentId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('billingPayment', [
            'formErrors',
            'formSuccess',
            'nonFieldFormError',
            'nonFieldFormMessage'
        ]),
        ...mapState('billingPayment', [
            'formObj'
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
                .then(() => this.$refs.observer.setErrors(this.formErrors));

            scroll(0, 0);
        }
    }
}
</script>
