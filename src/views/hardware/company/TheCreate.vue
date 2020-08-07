<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'hardware:company:search'}"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-select :options="choiceDomain"
                                      label="Domain"
                                      name="domain"
                                      required="true"
                                      rules="required"
                                      v-model="formData.domain"/>

                        <input-text label="IP Address"
                                    name="ip"
                                    required="true"
                                    rules="required"
                                    v-model="formData.ip"/>

                        <input-select :options="choiceTarget"
                                      label="Target"
                                      name="target_type"
                                      required="true"
                                      rules="required"
                                      v-model="formData.target_type"/>
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
    computed: {
        ...mapState('hardwareCompany', [
            'choiceDomain',
            'choiceTarget',
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    created() {
        this.getChoiceDomain();

        this.getChoiceTarget();
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('hardwareCompany', [
            'createHardware',
            'formClean',
            'getChoiceDomain',
            'getChoiceTarget'
        ]),
        submitCreate() {
            this.createHardware()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess > 0 ? this.$router.push({name: 'hardware:company:search'}) : false);
        }
    }
}
</script>
