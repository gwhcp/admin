<template>
    <CCard bodyWrapper>
        <static-data :value="formData.id"
                     name="Fraud String ID"/>

        <static-data :datetime="formData.date_from"
                     name="Created Date"/>

        <static-data :value="formData.name"
                     name="Name"/>

        <static-data :value="formData.fraud_type_name"
                     name="Type"/>
    </CCard>
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
            fraudId: this.$route.params.id
        };
    },
    computed: {
        ...mapState('storeFraud', [
            'formData'
        ])
    },
    created() {
        this.getProfile({
            id: this.fraudId
        });
    },
    methods: {
        ...mapActions('storeFraud', [
            'getProfile'
        ])
    }
}
</script>
