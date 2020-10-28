<template>
    <div>
        <modal-success msg="Hardware has been removed."/>

        <modal-warning :msg="formErrors[0]"/>

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
                                <CBadge v-if="!item.in_queue"
                                        :color="getBadge(item.is_active)">
                                    {{ item.is_active ? 'Enabled' : 'Disabled' }}
                                </CBadge>

                                <CBadge v-else
                                        color="info">
                                    Pending Queue
                                </CBadge>
                            </td>
                        </template>

                        <template #show_details="{ item }">
                            <td class="py-2">
                                <CLink :to="{ name: 'hardware:company:profile', params: { id: item.id } }">
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
                            <td v-if="!item.in_queue"
                                class="py-2">
                                <modal-open-delete :delete="deleteHardware"
                                                   :formArr="formArr"
                                                   :params="{ id: item.id }"
                                                   msg="Continuing will remove this hardware."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab v-if="this.hasPerm('hardware.company.add_server')"
                  :to="{ name: 'hardware:company:create' }"
                  title="Create"/>
        </CTabs>
    </div>
</template>

<script>
import Loading from "@/mixins/Loading";
import {ModalOpenDelete, ModalSuccess, ModalWarning} from "@/components/modal";
import Permission from "@/mixins/Permission";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'TheSearch',
    components: {
        ModalOpenDelete,
        ModalSuccess,
        ModalWarning
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
        ...mapGetters('hardwareCompany', [
            'formArr',
            'formErrors'
        ])
    },
    async created() {
        await this.getSearch();
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
};
</script>
