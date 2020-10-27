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

        <CTab :to="{ name: `billing:payment:${formObj.merchant}:authentication`, params: { id: paymentId } }"
              title="Authentication"/>

        <CTab :to="{ name: `billing:payment:${formObj.merchant}:method`, params: {  id: paymentId } }"
              title="Payment Method"/>
    </CTabs>
</template>

<script>
import Loading from "@/mixins/Loading";
import StaticData from "@/components/StaticData";
import {mapActions, mapGetters} from "vuex";

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
        ...mapGetters('billingPayment', [
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
        ])
    }
};
</script>
