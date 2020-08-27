<template>
    <CAlert :show.sync="modalSuccess"
            closeButton
            color="success">
        {{ msg }}
    </CAlert>
</template>

<script>
import EventBus from "@/components/modal/eventBus";

export default {
    name: 'ModalSuccess',
    props: {
        msg: {
            type: String
        }
    },
    data() {
        return {
            modalSuccess: 0
        }
    },
    mounted() {
        EventBus.$on('modalSuccess', () => {
            this.modalSuccess = 5;
        })
    }
};
</script>