<template>
    <div>
        <modal-success msg="Product price has been removed."/>

        <CTabs :active-tab="2"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{name: getProductUrl(productType, 'profile'), params: {id: productId}}"
                  title="Profile"/>

            <CTab :to="{name: getProductUrl(productType, 'resource'), params: {id: productId}}"
                  title="Resource"/>

            <CTab title="Prices">
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
                                <CLink
                                    :to="{ name: 'store:product:price:profile', params: { id: item.id, productId: item.store_product }}">
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
                                <modal-open-delete :delete="deletePrice"
                                                   :formArr="formArr"
                                                   :params="{ id: item.id, productId: item.store_product }"
                                                   msg="Continuing will remove this product price."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab :to="{name: 'store:product:price:create', params: {productId: productId, type: productType}}"
                  title="Create"
                  v-if="this.hasPerm('store.product.price.add_storeproductprice')"/>
        </CTabs>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
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
                {key: 'billing_cycle', _style: 'min-width:100px'},
                {key: 'base_price', _style: 'min-width:100px;'},
                {key: 'setup_price', _style: 'min-width:100px;'},
                {key: 'is_active', label: 'Status', _style: 'min-width:100px'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ],
            productId: this.$route.params.productId,
            productType: this.$route.params.type
        };
    },
    computed: {
        ...mapGetters('storeProductPrice', [
            'formArr'
        ])
    },
    created() {
        this.getSearch({
            productId: this.productId
        });
    },
    mounted() {
        if (this.hasPerm('store.product.price.delete_storeproductprice')) {
            this.fields.push({key: 'delete', label: '', _style: 'width:1%', sorter: false, filter: false});
        }
    },
    methods: {
        ...mapActions('storeProductPrice', [
            'deletePrice',
            'getSearch'
        ]),
        getBadge(value) {
            switch (value) {
                case true:
                    return 'success';
                case false:
                    return 'danger';
            }
        },
        getProductUrl(value, route) {
            switch (value) {
                case 'domain':
                    return `store:product:${value}:${route}`;
            }
        }
    }
}
</script>
