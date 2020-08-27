<template>
    <CTabs :active-tab="0"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab title="Profile">
            <CCard bodyWrapper>
                <static-data :value="formObj.id"
                             name="Payment Gateway ID"/>

                <static-data :datetime="formObj.date_from"
                             name="Created Date"/>

                <static-data :value="formObj.company"
                             name="Company"/>

                <static-data :value="formObj.merchant_name"
                             name="Merchant"/>

                <static-data :value="formObj.payment_method_name"
                             name="Payment Method"/>
            </CCard>
        </CTab>

        <CTab :to="{name: getAuthenticationUrl(formObj.merchant), params: {id: paymentId}}"
              title="Authentication"/>

        <CTab :to="{name: getPaymentMethodUrl(formObj.merchant), params: {id: paymentId}}"
              title="Payment Method"/>
    </CTabs>
</template>

<script>
import StaticData from "@/components/StaticData";
import {mapActions, mapState} from "vuex";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheProfile',
    components: {
        StaticData
    },
    mixins: [
        Loading
    ],
    data() {
        return {
            paymentId: this.$route.params.id
        };
    },
    computed: {
        ...mapState('billingPayment', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile({
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
};
</script>
