<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{ name: 'hardware:company:search' }"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-select :options="choices.domain"
                                      label="Domain"
                                      name="domain"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.domain"/>

                        <input-text label="IP Address"
                                    name="ip"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.ip"/>

                        <input-select :options="choices.hardware_target"
                                      label="Target"
                                      name="target_type"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.target_type"/>
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
        ...mapGetters('hardwareCompany', [
            'choices',
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('hardwareCompany', [
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
        ...mapActions('hardwareCompany', [
            'createHardware',
            'formClean',
            'getChoices'
        ]),
        async submitCreate() {
            this.loadingState = true;

            await this.createHardware();

            if (this.formSuccess) {
                await this.$router.push({
                    name: 'hardware:company:search'
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
