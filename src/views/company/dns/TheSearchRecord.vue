<template>
    <div>
        <modal-success msg="DNS record has been removed."/>

        <CTabs :active-tab="1"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{ name: 'company:dns:profile', params: { id: domainId } }"
                  title="Profile"/>

            <CTab title="Records">
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
                        <template #record_type="{ item }">
                            <td class="py-2"
                                v-if="item.record_type === 'MX'">
                                {{ item.record_type }} ({{ item.mx_priority }})
                            </td>

                            <td class="py-2"
                                v-else>
                                {{ item.record_type }}
                            </td>
                        </template>

                        <template #delete="{ item }">
                            <td class="py-2" v-if="item.is_custom">
                                <modal-open-delete :delete="deleteRecord"
                                                   :formArr="formArr"
                                                   :params="{ id: item.id, domain: domainId }"
                                                   msg="Continuing will remove this record."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab :to="{ name: 'company:dns:create', params: { id: domainId } }"
                  title="Create"/>

            <CTab :to="{ name: 'company:dns:ns', params: { id: domainId } }"
                  title="Nameserver"/>
        </CTabs>
    </div>
</template>

<script>
import Loading from "@/mixins/Loading";
import {ModalOpenDelete, ModalSuccess} from "@/components/modal";
import Permission from "@/mixins/Permission";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'TheSearchRecord',
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
            domainId: this.$route.params.id,
            fields: [
                {key: 'host', _style: 'min-width:100px'},
                {key: 'record_type', _style: 'min-width:100px'},
                {key: 'data', _style: 'min-width:100px'}
            ]
        };
    },
    computed: {
        ...mapGetters('companyDns', [
            'formArr'
        ])
    },
    async created() {
        await this.getSearchRecord({
            id: this.domainId
        });
    },
    mounted() {
        if (this.hasPerm('company.dns.delete_dnszone')) {
            this.fields.push({key: 'delete', label: '', _style: 'width:1%', sorter: false, filter: false});
        }
    },
    methods: {
        ...mapActions('companyDns', [
            'deleteRecord',
            'getSearchRecord'
        ])
    }
};
</script>
