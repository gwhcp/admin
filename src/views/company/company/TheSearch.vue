<template>
    <div>
        <modal-success msg="Company has been removed."/>

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
                        <template #show_details="{ item }">
                            <td class="py-2">
                                <CLink :to="{ name: 'company:company:profile', params: { id: item.id } }">
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
                                <modal-open-delete :delete="deleteCompany"
                                                   :formArr="formArr"
                                                   :params="{ id: item.id }"
                                                   msg="Continuing will remove this company."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab :to="{ name: 'company:company:create' }"
                  title="Create"
                  v-if="this.hasPerm('company.company.add_company')"/>
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
                {key: 'name', _style: 'min-width:100px'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ]
        };
    },
    computed: {
        ...mapGetters('companyCompany', [
            'formArr',
            'formErrors'
        ])
    },
    async created() {
        await this.getSearch();
    },
    mounted() {
        if (this.hasPerm('company.company.delete_company')) {
            this.fields.push({key: 'delete', label: '', _style: 'width:1%', sorter: false, filter: false});
        }
    },
    methods: {
        ...mapActions('companyCompany', [
            'deleteCompany',
            'getSearch'
        ])
    }
};
</script>
