<template>
    <div>
        <CTabs :active-tab="0"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab title="Profile">
                <CCard bodyWrapper>
                    <static-data :value="formObj.id"
                                 name="Mail ID"/>

                    <static-data :datetime="formObj.date_from"
                                 name="Created Date"/>

                    <static-data :ahref="{name: 'company:company:profile', params:{'id': formObj.company}}"
                                 :value="formObj.company_name"
                                 name="Company"
                                 permission="company.company.view_company"/>

                    <static-data :value="formObj.domain_name"
                                 name="Domain"/>

                    <static-data :value="formObj.mail_type_name"
                                 name="Type"/>

                    <static-data :value="formObj.name"
                                 name="Name"/>
                </CCard>
            </CTab>

            <CTab v-if="formObj.mail_type === 'mailbox'"
                  :to="{name: 'employee:mail:password', params: {'id': mailId}}"
                  title="Password"/>
        </CTabs>
    </div>
</template>

<script>
import StaticData from "@/components/StaticData";
import Permission from "@/mixins/Permission";
import {mapActions, mapGetters} from "vuex";
import Loading from "@/mixins/Loading";

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
            mailId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('employeeMail', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile({
            id: this.mailId
        });
    },
    methods: {
        ...mapActions('employeeMail', [
            'getProfile'
        ])
    }
};
</script>
