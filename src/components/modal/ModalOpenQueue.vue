<template>
    <div>
        <CButton @click="modalOpen()"
                 color="info"
                 size="sm"
                 square
                 variant="outline">
            View
        </CButton>

        <CModal :show.sync="modalToggle"
                color="info"
                title="Queue Information">
            <static-data :value="params.name"
                         name="Name"/>

            <static-data :value="params.status_name"
                         name="Status"/>

            <static-data :value="params.ipaddress"
                         name="IP Address"/>

            <static-data :value="params.order_id"
                         name="Order"/>

            <div v-if="params.args">
                <h6 class="font-weight-bold">Arguments</h6>

                <CListGroup flush
                            v-bind:key="item.id"
                            v-for="(item, index) in params.args">
                    <CListGroupItem>
                        <static-data :name="index"
                                     :value="item"/>
                    </CListGroupItem>
                </CListGroup>
            </div>

            <div v-if="params.comments">
                <h6 class="font-weight-bold">Comments</h6>

                {{ params.comments }}
            </div>

            <template slot="footer">
                <CButton @click="modalToggle=false"
                         color="secondary"
                         square>
                    Close
                </CButton>
            </template>
        </CModal>
    </div>
</template>

<script>
import StaticData from "@/components/StaticData";

export default {
    name: 'ModalOpenQueue',
    components: {
        StaticData
    },
    props: {
        params: {
            type: Object
        }
    },
    data() {
        return {
            modalToggle: false
        };
    },
    methods: {
        modalOpen() {
            this.modalToggle = true;
        }
    }
}
</script>