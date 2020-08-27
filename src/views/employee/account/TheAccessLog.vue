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
import {mapActions, mapGetters} from "vuex";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheAccessLog',
    components: {
        ConvertDate
    },
    mixins: [
        Loading
    ],
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
        ...mapGetters('employeeAccount', [
            'formArr'
        ])
    },
    async created() {
        await this.getAccessLog();
    },
    methods: {
        ...mapActions('employeeAccount', [
            'getAccessLog'
        ])
    }
};
</script>
