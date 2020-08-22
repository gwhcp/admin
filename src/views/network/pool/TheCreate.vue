<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'network:pool:search'}"
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
import {mapActions, mapGetters, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";
import Loading from "@/mixins/Loading";

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
    created() {
        this.getChoices();
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
        submitCreate() {
            this.loadingState = true;

            this.createPool()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess ? this.$router.push({
                    name: 'network:pool:search'
                }) : false);
        }
    }
}
</script>
