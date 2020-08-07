<template>
    <CTabs :active-tab="0"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab title="Profile">
            <CCard bodyWrapper>
                <static-data :value="formData.id"
                             name="Payment Gateway ID"/>

                <static-data :datetime="formData.date_from"
                             name="Created Date"/>

                <static-data :value="formData.company"
                             name="Company"/>

                <static-data :value="formData.merchant_name"
                             name="Merchant"/>

                <static-data :value="formData.payment_method_name"
                             name="Payment Method"/>
            </CCard>
        </CTab>

        <CTab :to="{name: getAuthenticationUrl(formData.merchant), params: {id: paymentId}}"
              title="Authentication"/>

        <CTab :to="{name: getPaymentMethodUrl(formData.merchant), params: {id: paymentId}}"
              title="Payment Method"/>
    </CTabs>
</template>

<script>
import StaticData from "@/components/StaticData";
import {mapActions, mapState} from "vuex";

export default {
    name: 'TheProfile',
    components: {
        StaticData
    },
    data() {
        return {
            paymentId: this.$route.params.id
        };
    },
    computed: {
        ...mapState('billingPayment', [
            'formData'
        ])
    },
    created() {
        this.getProfile({
            id: this.paymentId
        });
    },
    methods: {
        ...mapActions('billingPayment', [
            'getProfile'
        ]),
        getAuthenticationUrl(value) {
            switch (value) {
                case 'authorize':
                    return 'billing:payment:authorize:authentication';
            }
        },
        getPaymentMethodUrl(value) {
            switch (value) {
                case 'authorize':
                    return 'billing:payment:authorize:method';
            }
        }
    }
}
</script>
