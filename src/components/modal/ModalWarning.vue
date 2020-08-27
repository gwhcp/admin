<template>
    <CAlert :show.sync="modalWarning"
            closeButton
            color="warning">
        {{ msg }}
    </CAlert>
</template>

<script>
import EventBus from "@/components/modal/eventBus";

export default {
    name: 'ModalWarning',
    props: {
        msg: {
            type: String
        }
    },
    data() {
        return {
            modalWarning: 0
        }
    },
    mounted() {
        EventBus.$on('modalWarning', () => {
            this.modalWarning = 5;
        })
    }
};
</script>