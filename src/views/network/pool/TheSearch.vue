<template>
    <div>
        <modal-success msg="IP Address pool has been removed."/>

        <CTabs :active-tab="0"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab title="Search">
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
                        <template #network="{ item }">
                            <td>
                                {{ item.network }} /{{ item.subnet }}
                            </td>
                        </template>

                        <template #show_details="{ item }">
                            <td class="py-2">
                                <CLink :to="{ name: 'network:pool:profile', params: { id: item.id }}">
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
                                <modal-open-delete :delete="deletePool"
                                            :params="{id: item.id}"
                                            :search="search"
                                            msg="Continuing will remove this IP Address pool."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab :to="{name: 'network:pool:create'}"
                  title="Create"
                  v-if="this.hasPerm('network.pool.add_ipaddresssetup')"/>
        </CTabs>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {ModalOpenDelete, ModalSuccess} from "@/components/modal";
import Permission from "@/mixins/Permission";

export default {
    name: 'TheSearch',
    components: {
        ModalOpenDelete,
        ModalSuccess
    },
    mixins: [
        Permission
    ],
    data() {
        return {
            fields: [
                {key: 'id', label: 'ID', _style: 'min-width:100px;'},
                {key: 'name', _style: 'min-width:100px'},
                {key: 'network', _style: 'min-width:100px'},
                {key: 'assigned_name', label: 'Assigned', _style: 'min-width:100px;'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ]
        };
    },
    computed: {
        ...mapState('networkPool', [
            'search'
        ])
    },
    created() {
        this.getSearch();
    },
    mounted() {
        if (this.hasPerm('network.pool.delete_ipaddresssetup')) {
            this.fields.push({key: 'delete', label: '', _style: 'width:1%', sorter: false, filter: false});
        }
    },
    methods: {
        ...mapActions('networkPool', [
            'deletePool',
            'getSearch'
        ])
    }
}
</script>
