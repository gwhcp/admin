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
                        <input-select :options="choices.merchant"
                                      @input="setMethod(formObj.merchant)"
                                      label="Merchant"
                                      name="merchant"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.merchant"/>

                        <input-select :options="choices.method"
                                      label="Method"
                                      name="payment_method"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.payment_method"
                                      v-show="method"/>

                        <input-select :options="choices.company"
                                      label="Company"
                                      name="company"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.company"/>
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
import {mapActions, mapGetters, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheCreate',
    components: {
        InputSelect,
        ValidationObserver
    },
    data() {
        return {
            method: false
        };
    },
    computed: {
        ...mapGetters('billingPayment', [
            'choices',
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('billingPayment', [
            'formObj'
        ])
    },
    created() {
        this.getChoices();
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('billingPayment', [
            'createPaymentGateway',
            'formClean',
            'getChoices'
        ]),
        setMethod(value) {
            switch (value) {
                case 'authorize':
                    this.choices.method = this.choices.method.authorize;

                    this.method = true;
            }
        },
        submitCreate() {
            this.createPaymentGateway()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess ? this.$router.push({
                    name: 'billing:payment:search'
                }) : false);
        }
    }
}
</script>
