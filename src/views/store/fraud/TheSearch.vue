<template>
    <div>
        <modal-success msg="Fraud string has been removed."/>

        <CTabs :active-tab="0"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab title="Search">
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
                                <CLink :to="{ name: 'store:fraud:profile', params: { id: item.id }}">
                                    <CButton color="info"
                                             size="sm"
                                             square
                                             variant="outline">
                                        View
                                    </CButton>
                                </CLink>
                            </td>
                        </template>

                        <template #delete="{ item }">
                            <td class="py-2">
                                <modal-open-delete :delete="deleteFraudString"
                                                   :formArr="formArr"
                                                   :params="{id: item.id}"
                                                   msg="Continuing will remove this fraud string."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab :to="{name: 'store:fraud:create'}"
                  title="Create"
                  v-if="this.hasPerm('store.fraud.add_fraudstring')"/>
        </CTabs>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ModalOpenDelete, ModalSuccess} from "@/components/modal";
import Permission from "@/mixins/Permission";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheSearch',
    components: {
        ModalOpenDelete,
        ModalSuccess
    },
    mixins: [
        Loading,
        Permission
    ],
    data() {
        return {
            fields: [
                {key: 'id', label: 'ID', _style: 'min-width:100px;'},
                {key: 'name', _style: 'min-width:100px'},
                {key: 'fraud_type_name', label: 'Type', _style: 'min-width:100px;'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ]
        };
    },
    computed: {
        ...mapGetters('storeFraud', [
            'formArr'
        ])
    },
    created() {
        this.getSearch();
    },
    mounted() {
        if (this.hasPerm('store.fraud.delete_fraudstring')) {
            this.fields.push({key: 'delete', label: '', _style: 'width:1%', sorter: false, filter: false});
        }
    },
    methods: {
        ...mapActions('storeFraud', [
            'deleteFraudString',
            'getSearch'
        ])
    }
}
</script>
