<template>
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
            <template #id="{ item }">
                <td>
                    {{ item.id }} - {{ item.order_id }}
                </td>
            </template>

            <template #status_name="{ item }">
                <td>
                    <CBadge :color="getBadge(item.status)">
                        {{ item.status_name }}
                    </CBadge>
                </td>
            </template>

            <template #show_details="{ item }">
                <td class="py-2">
                    <CLink :to="{ name: 'network:queue:profile', params: { id: item.queue_status.id }}">
                        <CButton color="info"
                                 size="sm"
                                 square
                                 variant="outline">
                            View
                        </CButton>
                    </CLink>
                </td>
            </template>
        </CDataTable>
    </CCard>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheSearch',
    mixins: [
        Loading
    ],
    data() {
        return {
            fields: [
                {key: 'id', label: 'ID', _style: 'min-width:100px;'},
                {key: 'name', _style: 'min-width:100px'},
                {key: 'ipaddress', label: 'IP Address', _style: 'min-width:100px'},
                {key: 'status_name', label: 'Status', _style: 'min-width:100px;'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ]
        };
    },
    computed: {
        ...mapGetters('networkQueue', [
            'formArr'
        ])
    },
    async created() {
        await this.getSearch();
    },
    methods: {
        ...mapActions('networkQueue', [
            'getSearch'
        ]),
        getBadge(value) {
            switch (value) {
                case 'active':
                    return 'success';
                case 'failed':
                    return 'danger';
                case 'pending':
                    return 'info';
                case 'pending_failed':
                    return 'warning';
                case 'working':
                    return 'secondary';
            }
        }
    }
};
</script>
