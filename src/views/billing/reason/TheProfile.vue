<template>
    <CCard bodyWrapper>
        <static-data :value="formObj.id"
                     name="Reason ID"/>

        <static-data :datetime="formObj.date_from"
                     name="Created Date"/>

        <static-data :value="formObj.name"
                     name="Name"/>

        <static-data :value="formObj.reason_type_name"
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
            reasonId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('billingReason', [
            'formObj'
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
