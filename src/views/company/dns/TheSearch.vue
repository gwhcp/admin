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
            <template #show_details="{ item }">
                <td class="py-2">
                    <CLink :to="{ name: 'company:dns:profile', params: { id: item.id } }">
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
import Loading from "@/mixins/Loading";
import Permission from "@/mixins/Permission";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'TheSearch',
    mixins: [
        Loading,
        Permission
    ],
    data() {
        return {
            fields: [
                {key: 'id', label: 'ID', _style: 'min-width:100px;'},
                {key: 'name', _style: 'min-width:100px'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ]
        };
    },
    computed: {
        ...mapGetters('companyDns', [
            'formArr'
        ])
    },
    async created() {
        await this.getSearch();
    },
    methods: {
        ...mapActions('companyDns', [
            'getSearch'
        ])
    }
};
</script>
