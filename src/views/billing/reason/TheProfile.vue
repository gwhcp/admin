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
            reasonId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('billingReason', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile({
            id: this.reasonId
        });
    },
    methods: {
        ...mapActions('billingReason', [
            'getProfile'
        ])
    }
};
</script>
