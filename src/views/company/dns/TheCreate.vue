<template>
    <CTabs :active-tab="2"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{ name: 'company:dns:profile', params: { id: domainId } }"
              title="Profile"/>

        <CTab :to="{ name: 'company:dns:records', params: { id: domainId } }"
              title="Records"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-text v-model="formObj.host"
                                    label="Host"
                                    name="host"/>

                        <input-select v-model="formObj.record_type"
                                      :options="choices.zone"
                                      label="Type"
                                      name="record_type"
                                      required="true"
                                      rules="required"/>

                        <input-text v-if="formObj.record_type === 'MX'"
                                    v-model="formObj.mx_priority"
                                    label="MX Priority"
                                    name="mx_priority"
                                    required="true"
                                    rules="required"/>

                        <input-text v-model="formObj.data"
                                    label="Data"
                                    name="data"
                                    required="true"
                                    rules="required"/>
                        <CRow>
                            <CCol class="text-left"
                                  col="6">
                                <CButton :disabled="invalid"
                                         class="px-4"
                                         color="primary"
                                         @click="handleSubmit(submitCreate)">Create
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
    async created() {
        await this.getChoices();
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
        async submitCreate() {
            this.loadingState = true;

            this.formObj['domain'] = this.domainId;

            await this.createRecord();

            if (this.formSuccess) {
                await this.$router.push({
                    name: 'company:dns:records',
                    params: {
                        id: this.domainId
                    }
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
