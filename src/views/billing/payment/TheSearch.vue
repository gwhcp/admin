<template>
    <div>
        <modal-success msg="Payment gateway has been removed."/>

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
                        <template #show_details="{ item }">
                            <td class="py-2">
                                <CLink :to="{ name: 'billing:payment:profile', params: { id: item.id }}">
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
                                <modal-open-delete :delete="deletePaymentGateway"
                                            :params="{id: item.id}"
                                            :search="search"
                                            msg="Continuing will remove this payment gateway."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab :to="{name: 'billing:payment:create'}"
                  title="Create"
                  v-if="this.hasPerm('billing.payment.add_paymentgateway')"/>
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
                {key: 'company', _style: 'min-width:100px'},
                {key: 'merchant_name', label: 'Merchant', _style: 'min-width:100px'},
                {key: 'payment_method_name', label: 'Method', _style: 'min-width:100px'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ]
        };
    },
    computed: {
        ...mapState('billingPayment', [
            'search'
        ])
    },
    created() {
        this.getSearch();
    },
    mounted() {
        if (this.hasPerm('billing.payment.delete_paymentgateway')) {
            this.fields.push({key: 'delete', label: '', _style: 'width:1%', sorter: false, filter: false});
        }
    },
    methods: {
        ...mapActions('billingPayment', [
            'deletePaymentGateway',
            'getSearch'
        ])
    }
}
</script>
