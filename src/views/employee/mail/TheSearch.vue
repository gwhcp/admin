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
            <template #name="{ item }">
                <td class="py-2">
                    {{ item.name }}@{{ item.domain_name }}
                </td>
            </template>

            <template #show_details="{ item }">
                <td class="py-2">
                    <CLink :to="{ name: 'employee:mail:profile', params: { id: item.id } }">
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
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'TheSearch',
    mixins: [
        Loading
    ],
    data() {
        return {
            fields: [
                {key: 'name', _style: 'min-width:100px'},
                {key: 'mail_type_name', label: 'Type', _style: 'min-width:100px'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ]
        };
    },
    computed: {
        ...mapGetters('employeeMail', [
            'formArr'
        ])
    },
    async created() {
        await this.getSearch();
    },
    methods: {
        ...mapActions('employeeMail', [
            'getSearch'
        ])
    }
};
</script>
