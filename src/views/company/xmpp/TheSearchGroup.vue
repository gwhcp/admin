<template>
    <div>
        <CAlert v-if="nonFieldFormError"
                :show="5"
                closeButton
                color="warning">
            {{ nonFieldFormMessage }}
        </CAlert>

        <modal-success v-else
                       msg="XMPP group has been removed."/>

        <CTabs :active-tab="1"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{name: 'company:xmpp:search'}"
                  title="Search Accounts"/>

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
                        <template #delete="{ item }">
                            <td class="py-2">
                                <modal-open-delete :delete="deleteGroup"
                                                   :formArr="formArr"
                                                   :params="{id: item.id}"
                                                   msg="Continuing will remove this xmpp group."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab v-if="this.hasPerm('company.xmpp.add_prosodyaccount')"
                  :to="{name: 'company:xmpp:create:group'}"
                  title="Create"/>
        </CTabs>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ModalOpenDelete, ModalSuccess} from "@/components/modal";
import Permission from "@/mixins/Permission";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheSearchGroup',
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
                {key: 'name', _style: 'min-width:100px'}
            ]
        };
    },
    computed: {
        ...mapGetters('companyXmpp', [
            'formArr',
            'nonFieldFormError',
            'nonFieldFormMessage'
        ])
    },
    async created() {
        await this.getSearchGroup();
    },
    mounted() {
        if (this.hasPerm('company.xmpp.delete_prosodyaccount')) {
            this.fields.push({key: 'delete', label: '', _style: 'width:1%', sorter: false, filter: false});
        }
    },
    methods: {
        ...mapActions('companyXmpp', [
            'deleteGroup',
            'getSearchGroup'
        ])
    }
};
</script>
