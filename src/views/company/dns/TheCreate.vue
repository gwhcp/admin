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
                                    v-model="formData.host"/>

                        <input-select :options="choiceRecordType"
                                      label="Type"
                                      name="record_type"
                                      required="true"
                                      rules="required"
                                      v-model="formData.record_type"/>

                        <input-text label="MX Priority"
                                    name="mx_priority"
                                    required="true"
                                    rules="required"
                                    v-if="formData.record_type === 'MX'"
                                    v-model="formData.mx_priority"/>

                        <input-text label="Data"
                                    name="data"
                                    required="true"
                                    rules="required"
                                    v-model="formData.data"/>
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
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheCreate',
    components: {
        InputSelect,
        InputText,
        ValidationObserver
    },
    data() {
        return {
            domainId: this.$route.params.id
        };
    },
    computed: {
        ...mapState('companyDns', [
            'choiceRecordType',
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    created() {
        this.getChoiceRecordType();
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('companyDns', [
            'createRecord',
            'formClean',
            'getChoiceRecordType'
        ]),
        submitCreate() {
            this.formData['domain'] = this.domainId;

            this.createRecord()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess > 0 ? this.$router.push({
                    name: 'company:dns:records',
                    params: {id: this.domainId}
                }) : false);
        }
    }
}
</script>
