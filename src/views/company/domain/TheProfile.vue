<template>
    <CCard bodyWrapper>
        <static-data :value="formData.id"
                     name="Domain ID"/>

        <static-data :datetime="formData.date_from"
                     name="Created Date"/>

        <static-data :ahref="{name: 'company:company:profile', params:{id: formData.company}}"
                     :value="formData.company_name"
                     name="Company"
                     permission="company.company.view_company"/>

        <static-data :value="formData.name"
                     name="Domain"/>
    </CCard>
</template>

<script>
import StaticData from "@/components/StaticData";
import {mapActions, mapState} from "vuex";
import Permission from "@/mixins/Permission";

export default {
    name: 'TheProfile',
    components: {
        StaticData
    },
    mixins: [
        Permission
    ],
    data() {
        return {
            domainId: this.$route.params.id
        };
    },
    computed: {
        ...mapState('companyDomain', [
            'formData'
        ])
    },
    created() {
        this.getProfile({
            id: this.domainId
        });
    },
    methods: {
        ...mapActions('companyDomain', [
            'getProfile'
        ])
    }
}
</script>
