<template>
    <div>
        <modal-success msg="Hardware has been removed."/>

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
                        <template #is_active="{ item }">
                            <td>
                                <CBadge :color="getBadge(item.is_active)"
                                        v-if="!item.in_queue">
                                    {{ item.is_active ? 'Enabled' : 'Disabled' }}
                                </CBadge>

                                <CBadge color="info"
                                        v-else>
                                    Pending Queue
                                </CBadge>
                            </td>
                        </template>

                        <template #show_details="{ item }">
                            <td class="py-2">
                                <CLink :to="{ name: 'hardware:company:profile', params: { id: item.id }}">
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
                            <td class="py-2" v-if="!item.in_queue">
                                <modal-open-delete :delete="deleteHardware"
                                                   :params="{id: item.id}"
                                                   :search="search"
                                                   msg="Continuing will remove this hardware."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab :to="{name: 'hardware:company:create'}"
                  title="Create"
                  v-if="this.hasPerm('hardware.company.add_server')"/>
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
                {key: 'domain_name', _style: 'min-width:100px'},
                {key: 'ipaddress', _style: 'min-width:100px'},
                {key: 'is_active', label: 'Status', _style: 'min-width:100px'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ]
        };
    },
    computed: {
        ...mapState('hardwareCompany', [
            'search'
        ])
    },
    created() {
        this.getSearch();
    },
    mounted() {
        if (this.hasPerm('hardware.company.delete_server')) {
            this.fields.push({key: 'delete', label: '', _style: 'width:1%', sorter: false, filter: false});
        }
    },
    methods: {
        ...mapActions('hardwareCompany', [
            'deleteHardware',
            'getSearch'
        ]),
        getBadge(value) {
            switch (value) {
                case true:
                    return 'success';
                case false:
                    return 'danger';
            }
        }
    }
}
</script>