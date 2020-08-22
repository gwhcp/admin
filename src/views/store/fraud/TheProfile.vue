<template>
    <CCard bodyWrapper>
        <static-data :value="formObj.id"
                     name="Fraud String ID"/>

        <static-data :datetime="formObj.date_from"
                     name="Created Date"/>

        <static-data :value="formObj.name"
                     name="Name"/>

        <static-data :value="formObj.fraud_type_name"
                     name="Type"/>
    </CCard>
</template>

<script>
import StaticData from "@/components/StaticData";
import {mapActions, mapGetters} from "vuex";

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
        ...mapGetters('storeFraud', [
            'formObj'
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
