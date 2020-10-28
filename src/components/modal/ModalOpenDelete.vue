<template>
    <div>
        <CButton @click="modalOpen()"
                 color="danger"
                 size="sm"
                 square
                 variant="outline">
            Delete
        </CButton>

        <CModal :show.sync="modalToggle"
                color="danger"
                title="Warning">
            {{ msg }}

            <template slot="footer">
                <CButton @click="modalToggle=false"
                         color="secondary"
                         square>
                    Cancel
                </CButton>

                <CButton @click="modalToggle=false; modalDelete();"
                         color="danger"
                         square>
                    Delete
                </CButton>
            </template>
        </CModal>
    </div>
</template>

<script>
import EventBus from "@/components/modal/eventBus";

export default {
    name: 'ModalOpenDelete',
    props: {
        msg: {
            type: String
        },
        delete: {
            type: Function
        },
        params: {
            type: Object
        },
        formArr: {
            type: Array
        }
    },
    data() {
        return {
            modalToggle: false
        };
    },
    methods: {
        modalDelete() {
            const can_delete = this.delete(this.params);

            can_delete.then(function (result) {
                if (result) {
                    EventBus.$emit('modal-warning');
                } else {
                    EventBus.$emit('modal-success');
                }
            });
        },
        modalOpen() {
            this.modalToggle = true;
        }
    }
};
</script>