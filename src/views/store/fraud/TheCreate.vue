<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'store:fraud:search'}"
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

                        <input-select :options="choices"
                                      label="Type"
                                      name="fraud_type"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.fraud_type"/>
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
        ...mapGetters('storeFraud', [
            'choices',
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('storeFraud', [
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
        ...mapActions('storeFraud', [
            'createFraudString',
            'formClean',
            'getChoices'
        ]),
        submitCreate() {
            this.loadingState = true;

            this.create()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess ? this.$router.push({
                    name: 'store:fraud:search'
                }) : false);
        }
    }
}
</script>
