<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'setting:email:search'}"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-text label="Sender"
                                    name="sender"
                                    required="true"
                                    rules="required"
                                    v-model="formData.sender"/>

                        <input-select :options="choiceTemplate"
                                      label="Template"
                                      name="template"
                                      required="true"
                                      rules="required"
                                      v-model="formData.template"/>

                        <input-text label="Subject"
                                    name="subject"
                                    required="true"
                                    rules="required"
                                    v-model="formData.subject"/>

                        <input-wysiwyg label="Body"
                                       name="body"
                                       required="true"
                                       rules="required"
                                       v-model="formData.body"/>

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
import {InputSelect, InputText, InputWysiwyg} from "@/components/form";
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheCreate',
    components: {
        InputSelect,
        InputText,
        InputWysiwyg,
        ValidationObserver
    },
    computed: {
        ...mapState('settingEmail', [
            'choiceTemplate',
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    created() {
        this.getChoiceTemplate();
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('settingEmail', [
            'createEmailTemplate',
            'formClean',
            'getChoiceTemplate'
        ]),
        submitCreate() {
            this.createEmailTemplate()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess > 0 ? this.$router.push({name: 'setting:email:search'}) : false);
        }
    }
}
</script>
