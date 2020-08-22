<template>
    <CTabs :active-tab="2"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'company:dns:profile', params:{id: domainId}}"
              title="Profile"/>

        <CTab :to="{name: 'company:dns:records', params:{id: domainId}}"
              title="Records"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-text label="Host"
                                    name="host"
                                    v-model="formObj.host"/>

                        <input-select :options="choices.zone"
                                      label="Type"
                                      name="record_type"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.record_type"/>

                        <input-text label="MX Priority"
                                    name="mx_priority"
                                    required="true"
                                    rules="required"
                                    v-if="formObj.record_type === 'MX'"
                                    v-model="formObj.mx_priority"/>

                        <input-text label="Data"
                                    name="data"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.data"/>
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
    data() {
        return {
            domainId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('companyDns', [
            'choices',
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('companyDns', [
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
        ...mapActions('companyDns', [
            'createRecord',
            'formClean',
            'getChoices'
        ]),
        submitCreate() {
            this.loadingState = true;

            this.formObj['domain'] = this.domainId;

            this.createRecord()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess ? this.$router.push({
                    name: 'company:dns:records',
                    params: {id: this.domainId}
                }) : false);
        }
    }
}
</script>
