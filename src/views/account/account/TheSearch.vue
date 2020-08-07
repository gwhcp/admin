<template>
    <div>
        <modal-success msg="Account has been removed."/>

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
                                <CBadge :color="getBadge(item.is_active)">
                                    {{ item.is_active ? 'Active' : 'Suspended' }}
                                </CBadge>
                            </td>
                        </template>

                        <template #show_details="{ item }">
                            <td class="py-2">
                                <CLink :to="{ name: 'account:account:manage:profile', params: { id: item.id }}">
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
                                            :params="{id: item.id}"
                                            :search="search"
                                            msg="Continuing will remove this employee account."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab :to="{name: 'account:login:create'}"
                  title="Create"
                  v-if="this.hasPerm('account.login.add_account')"/>
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
                {key: 'first_name', _style: 'min-width:100px'},
                {key: 'last_name', _style: 'min-width:100px'},
                {key: 'email', _style: 'min-width:100px;'},
                {key: 'is_active', label: 'Status', _style: 'min-width:100px;'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ]
        };
    },
    computed: {
        ...mapState('accountAccount', [
            'search'
        ])
    },
    created() {
        this.getAccounts();
    },
    mounted() {
        if (this.hasPerm('account.login.delete_account')) {
            this.fields.push({key: 'delete', label: '', _style: 'width:1%', sorter: false, filter: false});
        }
    },
    methods: {
        ...mapActions('accountAccount', [
            'getAccounts'
        ]),
        ...mapActions('accountLogin', [
            'deleteAccount'
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
