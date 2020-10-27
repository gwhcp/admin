<template>
    <CCard bodyWrapper>
        <static-data :value="formObj.id"
                     name="Domain ID"/>

        <static-data :datetime="formObj.date_from"
                     name="Created Date"/>

        <static-data :ahref="{ name: 'company:company:profile', params: { id: formObj.company } }"
                     :value="formObj.company_name"
                     name="Company"
                     permission="company.company.view_company"/>

        <static-data :value="formObj.name"
                     name="Domain"/>
    </CCard>
</template>

<script>
import Loading from "@/mixins/Loading";
import Permission from "@/mixins/Permission";
import StaticData from "@/components/StaticData";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'TheProfile',
    components: {
        StaticData
    },
    mixins: [
        Loading,
        Permission
    ],
    data() {
        return {
            domainId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('companyDomain', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile({
            id: this.domainId
        });
    },
    methods: {
        ...mapActions('companyDomain', [
            'getProfile'
        ])
    }
};
</script>
