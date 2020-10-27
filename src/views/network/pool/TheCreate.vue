<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{ name: 'network:pool:search' }"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-text label="Name"
                                    name="name"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.name"/>

                        <input-text label="Network"
                                    name="network"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.network"/>

                        <input-text label="Subnet"
                                    name="subnet"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.subnet"/>

                        <input-select :options="choices"
                                      label="Assigned"
                                      name="assigned"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.assigned"/>
                        <CRow>
                            <CCol class="text-left"
                                  col="6">
                                <CButton :disabled="invalid"
                                         @click="handleSubmit(submitCreate)"
                                         class="px-4"
                                         color="primary">Create
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCard>
                </CForm>
            </ValidationObserver>
        </CTab>
    </CTabs>
</template>

<script>
import {InputSelect, InputText} from "@/components/form";
import Loading from "@/mixins/Loading";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TheCreate',
    components: {
        InputSelect,
        InputText,
        ValidationObserver
    },
    mixins: [
        Loading
    ],
    computed: {
        ...mapGetters('networkPool', [
            'choices',
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('networkPool', [
            'formObj'
        ])
    },
    async created() {
        await this.getChoices();
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('networkPool', [
            'getChoices',
            'createPool',
            'formClean'
        ]),
        async submitCreate() {
            this.loadingState = true;

            await this.createPool();

            if (this.formSuccess) {
                await this.$router.push({
                    name: 'network:pool:search'
                })
            } else {
                this.$refs.observer.setErrors(this.formErrors);

                scroll(0, 0);

                this.loadingState = false;
            }
        }
    }
};
</script>
