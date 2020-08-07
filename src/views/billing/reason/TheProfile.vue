<template>
    <CCard bodyWrapper>
        <static-data :value="formData.id"
                     name="Reason ID"/>

        <static-data :datetime="formData.date_from"
                     name="Created Date"/>

        <static-data :value="formData.name"
                     name="Name"/>

        <static-data :value="formData.reason_type_name"
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
            reasonId: this.$route.params.id
        };
    },
    computed: {
        ...mapState('billingReason', [
            'formData'
        ])
    },
    created() {
        this.getProfile({
            id: this.reasonId
        });
    },
    methods: {
        ...mapActions('billingReason', [
            'getProfile'
        ])
    }
}
</script>
