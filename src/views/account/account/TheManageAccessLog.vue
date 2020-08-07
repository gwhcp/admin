<template>
    <CTabs :active-tab="2"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'account:account:manage:profile', params: {id: accountId}}"
              title="Profile"/>

        <CTab :to="{name: 'account:login:permission', params: {id: accountId}}"
              title="Permissions"
              v-if="this.hasPerm('auth.view_permission')"/>

        <CTab title="Access Logs">
            <CCard bodyWrapper>
                <CDataTable :fields="fields"
                            :items="search"
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
import {mapActions, mapState} from "vuex";
import Permission from "@/mixins/Permission";

export default {
    name: 'TheManageAccessLog',
    components: {
        ConvertDate
    },
    mixins: [
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
        ...mapState('accountAccount', [
            'search'
        ])
    },
    created() {
        this.getManageAccessLog({
            id: this.accountId
        });
    },
    methods: {
        ...mapActions('accountAccount', [
            'getManageAccessLog'
        ])
    }
}
</script>