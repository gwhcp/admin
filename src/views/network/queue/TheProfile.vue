<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
            Queue has been updated.
        </CAlert>

        <CAlert :show="5"
                closeButton
                color="warning"
                v-if="formError">
            {{ formErrors.queue_status }}
        </CAlert>

        <CCard bodyWrapper>
            <static-data :value="formObj.id"
                         name="Queue Status ID"/>

            <static-data :datetime="formObj.date_from"
                         name="Created Date"/>

            <static-data :value="formObj.account"
                         ahref="#"
                         name="Account ID"
                         permission="client.account.view_account"
                         v-if="formObj.account"/>

            <static-data :value="formObj.order"
                         ahref="#"
                         name="Order ID"
                         permission="client.order.view_order"
                         v-if="formObj.order"/>

            <static-data :value="formObj.product_profile"
                         ahref="#"
                         name="Product Profile ID"
                         permission="client.product_profile.view_product_profile"
                         v-if="formObj.product_profile"/>
        </CCard>

        <CContainer>
            <CRow alignHorizontal="center">
                <CCol sm="4">
                    <CCard>
                        <CButton @click="refresh"
                                 class="m-2"
                                 color="primary">
                            Refresh Page
                        </CButton>
                    </CCard>
                </CCol>

                <CCol sm="4">
                    <CCard>
                        <CButton @click="retry"
                                 class="m-2"
                                 color="danger">
                            Retry Failed Queue
                        </CButton>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>

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
                <template #status_name="{ item }">
                    <td>
                        <CBadge :color="getBadge(item.status)">
                            {{ item.status_name }}
                        </CBadge>
                    </td>
                </template>

                <template #show_details="{ item }">
                    <td class="py-2">
                        <modal-open-queue :params="item"/>
                    </td>
                </template>
            </CDataTable>
        </CCard>
    </div>
</template>

<script>
import Loading from "@/mixins/Loading";
import {ModalOpenQueue} from "@/components/modal";
import Permission from "@/mixins/Permission";
import StaticData from "@/components/StaticData";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'TheProfile',
    components: {
        ModalOpenQueue,
        StaticData
    },
    mixins: [
        Loading,
        Permission
    ],
    data() {
        return {
            fields: [
                {key: 'order_id', label: 'Order ID', _style: 'min-width:100px;'},
                {key: 'name', _style: 'min-width:100px'},
                {key: 'ipaddress', label: 'IP Address', _style: 'min-width:100px'},
                {key: 'status_name', label: 'Status', _style: 'min-width:100px;'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ],
            queueId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('networkQueue', [
            'formArr',
            'formError',
            'formErrors',
            'formObj',
            'formSuccess'
        ])
    },
    async created() {
        await this.getProfile({
            id: this.queueId
        });
    },
    mounted() {
        this.hasPermForm('network.queue.change_queuestatus');
    },
    methods: {
        ...mapActions('networkQueue', [
            'getProfile',
            'retryQueue'
        ]),
        getBadge(value) {
            switch (value) {
                case 'active':
                    return 'success';
                case 'failed':
                    return 'danger';
                case 'pending':
                    return 'info';
                case 'pending_failed':
                    return 'warning';
                case 'working':
                    return 'secondary';
            }
        },
        async refresh() {
            this.loadingState = true;

            await this.getProfile({
                id: this.queueId
            });

            scroll(0, 0);

            this.loadingState = false;
        },
        async retry() {
            this.loadingState = true;

            await this.retryQueue({
                queue_status: this.queueId
            });

            scroll(0, 0);

            this.loadingState = false;
        }
    }
};
</script>
