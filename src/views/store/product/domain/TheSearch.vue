<template>
    <div>
        <modal-success msg="Domain product has been removed."/>

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
                                <CBadge :color="getBadge(item.is_active)">
                                    {{ item.is_active ? 'Enabled' : 'Disabled' }}
                                </CBadge>
                            </td>
                        </template>

                        <template #show_details="{ item }">
                            <td class="py-2">
                                <CLink :to="{ name: 'store:product:domain:profile', params: { id: item.id } }">
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
                                <modal-open-delete :delete="deleteProduct"
                                                   :formArr="formArr"
                                                   :params="{ id: item.id }"
                                                   msg="Continuing will remove this domain product."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab :to="{ name: 'store:product:domain:create' }"
                  title="Create"
                  v-if="this.hasPerm('store.product.add_storeproduct')"/>
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
                {key: 'name', _style: 'min-width:100px'},
                {key: 'web_type_name', label: 'Web Type', _style: 'min-width:100px;'},
                {key: 'company_name', label: 'Company', _style: 'min-width:100px;'},
                {key: 'is_active', label: 'Status', _style: 'min-width:100px'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ]
        };
    },
    computed: {
        ...mapGetters('storeProductDomain', [
            'formArr'
        ])
    },
    async created() {
        await this.getSearch();
    },
    mounted() {
        if (this.hasPerm('store.product.delete_storeproduct')) {
            this.fields.push({key: 'delete', label: '', _style: 'width:1%', sorter: false, filter: false});
        }
    },
    methods: {
        ...mapActions('storeProductDomain', [
            'deleteProduct',
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
