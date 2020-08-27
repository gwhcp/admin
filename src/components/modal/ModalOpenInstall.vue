<template>
    <div>
        <CButton @click="modalOpen()"
                 color="info"
                 size="sm"
                 square
                 variant="outline">
            Install
        </CButton>

        <CModal :show.sync="modalToggle"
                color="info"
                title="Warning">
            {{ msg }}

            <template slot="footer">
                <CButton @click="modalToggle=false"
                         color="secondary"
                         square>
                    Cancel
                </CButton>

                <CButton @click="modalToggle=false; modalInstall();"
                         color="info"
                         square>
                    Install
                </CButton>
            </template>
        </CModal>
    </div>
</template>

<script>
import EventBus from "@/components/modal/eventBus";
import {mapState} from "vuex";

export default {
    name: 'ModalOpenInstall',
    props: {
        msg: {
            type: String
        },
        install: {
            type: Function
        },
        params: {
            type: Object
        }
    },
    data() {
        return {
            modalToggle: false
        };
    },
    computed: {
        ...mapState('hardwareCompany', [
            'installSuccess',
            'installWarning'
        ])
    },
    methods: {
        modalInstall() {
            this.install(this.params)
                .then(() => {
                    if (this.installSuccess > 0) {
                        EventBus.$emit('modalSuccess');
                    }
                },)
                .then(() => {
                    if (this.installWarning > 0) {
                        EventBus.$emit('modalWarning');
                    }
                });
        },
        modalOpen() {
            this.modalToggle = true;
        }
    }
};
</script>