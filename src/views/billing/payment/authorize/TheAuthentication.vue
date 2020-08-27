<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
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
                                        v-model="formObj.login_id"/>

                            <input-text label="Transaction Key"
                                        name="transaction_key"
                                        required="true"
                                        rules="required"
                                        v-model="formObj.transaction_key"/>

                            <input-switch :checked="formObj.in_test_mode"
                                          label="Test Mode"
                                          name="in_test_mode"
                                          v-model="formObj.in_test_mode"/>

                            <input-switch :checked="formObj.is_active"
                                          label="Status"
                                          name="is_active"
                                          v-model="formObj.is_active"/>
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
import {mapActions, mapGetters, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheAuthentication',
    components: {
        InputText,
        InputSwitch,
        ValidationObserver
    },
    mixins: [
        Loading,
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
            'formSuccess'
        ]),
        ...mapState('billingPayment', [
            'formObj'
        ])
    },
    async created() {
        await this.getAuthentication({
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
        async submitUpdate() {
            this.loadingState = true;

            await this.updateAuthentication({
                id: this.paymentId,
                merchant: 'authorize'
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
