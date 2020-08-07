<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'billing:payment:search'}"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-select :options="choiceMerchant"
                                      @input="setMethod(formData.merchant)"
                                      label="Merchant"
                                      name="merchant"
                                      required="true"
                                      rules="required"
                                      v-model="formData.merchant"/>

                        <input-select :options="choiceMethod"
                                      label="Method"
                                      name="payment_method"
                                      required="true"
                                      rules="required"
                                      v-model="formData.payment_method"/>

                        <input-select :options="choiceCompany"
                                      label="Company"
                                      name="company"
                                      required="true"
                                      rules="required"
                                      v-model="formData.company"/>
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
                </CForm>
            </ValidationObserver>
        </CTab>
    </CTabs>
</template>

<script>
import InputSelect from "@/components/form/InputSelect";
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheCreate',
    components: {
        InputSelect,
        ValidationObserver
    },
    computed: {
        ...mapState('billingPayment', [
            'choiceCompany',
            'choiceMerchant',
            'choiceMethod',
            'formData',
            'formErrors',
            'formSuccess'
        ]),
    },
    created() {
        this.getChoiceCompany();

        this.getChoiceMerchant();
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('billingPayment', [
            'createPaymentGateway',
            'formClean',
            'getChoiceCompany',
            'getChoiceMerchant',
            'getChoiceMethod'
        ]),
        setMethod(value) {
            this.getChoiceMethod({
                merchant: value
            });
        },
        submitCreate() {
            this.createPaymentGateway()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess > 0 ? this.$router.push({name: 'billing:payment:search'}) : false);
        }
    }
}
</script>
