<template>
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
</template>

<script>
import ConvertDate from "@/components/ConvertDate";
import {mapActions, mapState} from "vuex";

export default {
    name: 'TheAccessLog',
    components: {
        ConvertDate
    },
    data() {
        return {
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
        this.getAccessLog();
    },
    methods: {
        ...mapActions('accountAccount', [
            'getAccessLog'
        ])
    }
}
</script>
