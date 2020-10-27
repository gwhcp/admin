<template>
    <CTabs :active-tab="2"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{ name: 'employee:manage:profile', params: { id: accountId } }"
              title="Profile"/>

        <CTab v-if="this.hasPerm('auth.view_permission')"
              :to="{ name: 'employee:manage:permission', params: { id: accountId } }"
              title="Permissions"/>

        <CTab title="Access Logs">
            <CCard bodyWrapper>
                <CDataTable :fields="fields"
                            :items="formArr"
                            :items-per-page="10"
                            column-filter
                            hover
                            items-per-page-select
                            pagination
                            sorter
                            table-filter>
                    <template #date_from="{ item }">
                        <td>
                            <convert-date :datetime="item.date_from"/>
                        </td>
                    </template>
                </CDataTable>
            </CCard>
        </CTab>
    </CTabs>
</template>

<script>
import ConvertDate from "@/components/ConvertDate";
import Loading from "@/mixins/Loading";
import Permission from "@/mixins/Permission";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'TheAccessLog',
    components: {
        ConvertDate
    },
    mixins: [
        Loading,
        Permission
    ],
    data() {
        return {
            accountId: this.$route.params.id,
            fields: [
                {key: 'date_from', _style: 'min-width:100px;'},
                {key: 'ipaddress', label: 'IP Address', _style: 'min-width:100px'},
                {key: 'reverse_ipaddress', label: 'Reverse IP Address', _style: 'min-width:100px;'}
            ]
        };
    },
    computed: {
        ...mapGetters('employeeManage', [
            'formArr'
        ])
    },
    async created() {
        await this.getAccessLog({
            id: this.accountId
        });
    },
    methods: {
        ...mapActions('employeeManage', [
            'getAccessLog'
        ])
    }
};
</script>