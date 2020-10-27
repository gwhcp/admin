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
            if (this.formArr.some(item => item.id === this.params.id)) {
                this.delete(this.params);

                EventBus.$emit('modal-success');
            } else {
                this.$router.push({
                    name: 'pages:error:404'
                });
            }
        },
        modalOpen() {
            this.modalToggle = true;
        }
    }
};
</script>