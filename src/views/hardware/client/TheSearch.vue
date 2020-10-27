<template>
    <div>
        <modal-success msg="Hardware has been removed."/>

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
                                <CLink :to="{ name: 'hardware:client:profile', params: { id: item.id } }">
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
                            <td class="py-2"
                                v-if="!item.in_queue">
                                <modal-open-delete :delete="deleteHardware"
                                                   :formArr="formArr"
                                                   :params="{ id: item.id }"
                                                   msg="Continuing will remove this hardware."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab :to="{ name: 'hardware:client:create' }"
                  title="Create"
                  v-if="this.hasPerm('hardware.client.add_server')"/>
        </CTabs>
    </div>
</template>

<script>
import Loading from "@/mixins/Loading";
import {ModalOpenDelete, ModalSuccess} from "@/components/modal";
import Permission from "@/mixins/Permission";
import {mapActions, mapGetters} from "vuex";

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
                {key: 'domain_name', _style: 'min-width:100px'},
                {key: 'ipaddress', label: 'IP Address', _style: 'min-width:100px'},
                {key: 'is_active', label: 'Status', _style: 'min-width:100px'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ]
        };
    },
    computed: {
        ...mapGetters('hardwareClient', [
            'formArr'
        ])
    },
    async created() {
        await this.getSearch();
    },
    mounted() {
        if (this.hasPerm('hardware.client.delete_server')) {
            this.fields.push({key: 'delete', label: '', _style: 'width:1%', sorter: false, filter: false});
        }
    },
    methods: {
        ...mapActions('hardwareClient', [
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
};
</script>
