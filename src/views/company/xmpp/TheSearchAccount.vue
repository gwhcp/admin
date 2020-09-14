<template>
    <div>
        <modal-success msg="XMPP account has been removed."/>

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
                        <template #name="{ item }">
                            <td class="py-2">
                                {{ item.account_id }}@localhost
                            </td>
                        </template>

                        <template #show_details="{ item }">
                            <td class="py-2">
                                <CLink :to="{ name: 'company:xmpp:profile', params: { id: item.id }}">
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
                                <modal-open-delete :delete="deleteAccount"
                                                   :formArr="formArr"
                                                   :params="{id: item.id}"
                                                   msg="Continuing will remove this xmpp account."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab v-if="this.hasPerm('company.xmpp.add_prosodyaccount')"
                  :to="{name: 'company:xmpp:create'}"
                  title="Create"/>

            <CTab :to="{name: 'company:xmpp:search:group'}"
                  title="Search Groups"/>
        </CTabs>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ModalOpenDelete, ModalSuccess} from "@/components/modal";
import Permission from "@/mixins/Permission";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheSearchAccount',
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
                {key: 'group_name', label: 'Group', _style: 'min-width:100px'},
                {key: 'server_name', label: 'Group', _style: 'min-width:100px'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ]
        };
    },
    computed: {
        ...mapGetters('companyXmpp', [
            'formArr'
        ])
    },
    async created() {
        await this.getSearchAccount();
    },
    mounted() {
        if (this.hasPerm('company.xmpp.delete_prosodyaccount')) {
            this.fields.push({key: 'delete', label: '', _style: 'width:1%', sorter: false, filter: false});
        }
    },
    methods: {
        ...mapActions('companyXmpp', [
            'deleteAccount',
            'getSearchAccount'
        ])
    }
};
</script>
